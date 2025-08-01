import React, { useState, useRef, useEffect } from "react";
import { ArrowDown } from "../../../public/icons";
import styles from "@/app/styles/reusable-dropdown.module.scss";

interface DropdownProps {
  label?: string;
  options?: { label: string; value: string }[];
  placeHolder?: string;
  value?: { label: string; value: string };
  required?: boolean;
  searchable?: boolean;
  error?: string;
  onChange?: (option: { label: string; value: string }) => void;
  position?: "down" | "up"
}

const ReusableDropDown = ({
  label,
  options = [],
  placeHolder,
  value,
  required = false,
  onChange,
  error,
  searchable = false,
  position = "down",
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<{
    label: string;
    value: string;
  } | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const popupRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (option: { label: string; value: string }) => {
    setSelectedOption(option);
    setIsOpen(false);
    setSearchTerm("");
    onChange?.(option);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSearchTerm("");
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={popupRef} className={styles.dropdownContainer}>
      {label && (
        <p className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </p>
      )}
      <div className={styles.dropdownWrapper}>
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`${styles.dropdownTrigger} ${error && styles.error}`}
        >
          {!value
            ? placeHolder || "Select an option"
            : value
            ? value.label
            : selectedOption && selectedOption.label}
          <ArrowDown
            className={`${styles.arrowIcon} ${isOpen && styles.rotated}`}
          />
        </div>

        {isOpen && (
          <div className={`${styles.dropdownMenu} ${position === "up" ? styles.up : styles.down}`}>
            {searchable && (
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
                placeholder="Search..."
              />
            )}
            {filteredOptions.length > 0 ? (
              <ul className={styles.optionsList}>
                {filteredOptions.map((option, index) => (
                  <li
                    key={option.label}
                    onClick={() => handleOptionClick(option)}
                    className={`${styles.option} ${
                      index !== 0 && styles.hasBorder
                    }`}
                  >
                    {option.label}
                  </li>
                ))}
              </ul>
            ) : (
              <div className={styles.noOptions}>No Options</div>
            )}
          </div>
        )}
      </div>
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
};

export default ReusableDropDown;
