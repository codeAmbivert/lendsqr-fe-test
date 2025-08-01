import React, { useState, useRef, useEffect } from "react";
import styles from "@/app/styles/custom-select.module.scss";
import { ArrowDown } from "../../../public/icons";

interface SelectOption {
  value: string | number;
  label: string;
}

interface CustomSelectProps {
  value: string | number;
  onChange: (value: string | number) => void;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  showCount?: boolean;
  totalCount?: number;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  onChange,
  options,
  placeholder = "Select an option",
  disabled = false,
  className = "",
  showCount = false,
  totalCount = 0,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleOptionClick = (optionValue: string | number) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className={styles.selectContainer}>
      {showCount && <span className={styles.showingText}>Showing</span>}

      <div
        ref={selectRef}
        className={`${styles.customSelect} ${className} ${
          disabled ? styles.disabled : ""
        } ${isOpen ? styles.open : ""}`}
        onClick={handleToggle}
      >
        <div className={styles.selectTrigger}>
          <span className={styles.selectedValue}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ArrowDown
            height={10}
            width={10}
            className={`${styles.arrow} ${isOpen ? styles.rotated : ""}`}
          />
        </div>

        {isOpen && (
          <div className={styles.selectDropdown}>
            {options.map((option) => (
              <div
                key={option.value}
                className={`${styles.selectOption} ${
                  option.value === value ? styles.selected : ""
                }`}
                onClick={() => handleOptionClick(option.value)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>

      {showCount && (
        <span className={styles.outOfText}>out of {totalCount}</span>
      )}
    </div>
  );
};

export default CustomSelect;
