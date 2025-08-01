"use client";
import { ChangeEvent, InputHTMLAttributes, useState } from "react";
import styles from "@/app/styles/filter-input.module.scss";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  css?: string;
  className?: string;
  label?: string;
  placeholder?: string;
  inputType?: string;
  borderColor?: string;
  onClick?: () => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  value?: string;
  name: string;
  endIcon?: React.ReactNode;
  startIcon?: React.ReactNode;
  disabled?: boolean;
  error?: string;
}

const FilterInput = ({
  css,
  className,
  label,
  placeholder,
  inputType,
  borderColor,
  onClick,
  onChange,
  required,
  value,
  name,
  endIcon,
  startIcon,
  disabled,
  error,
  ...props
}: InputFieldProps) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className={`${styles.inputContainer} ${className || ""}`}>
      {label && (
        <label htmlFor={name} className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}

      <div
        className={`
          ${styles.inputWrapper} 
          ${css || ""} 
          ${borderColor ? "" : styles.defaultBorder}
          ${startIcon ? styles.hasStartIcon : ""}
          ${endIcon ? styles.hasEndIcon : ""}
          ${focused ? styles.focused : ""}
          ${error ? styles.error : ""}
          ${disabled ? styles.disabled : ""}
        `}
        style={borderColor ? { borderColor } : {}}
        onClick={onClick}
      >
        {startIcon && <div className={styles.startIcon}>{startIcon}</div>}

        <input
          type={inputType || "text"}
          id={name}
          name={name}
          placeholder={placeholder}
          className={styles.input}
          onChange={onChange}
          value={value}
          disabled={disabled}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...props}
        />

        {endIcon && <div className={styles.endIcon}>{endIcon}</div>}
      </div>

      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
};

export default FilterInput;
