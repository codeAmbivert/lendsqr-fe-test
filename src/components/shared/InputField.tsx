import { useState } from "react";
import styles from "@/app/styles/input-field.module.scss";

interface InputFieldProps extends React.HTMLProps<HTMLInputElement> {
  name: string;
  error?: string;
  type?: string;
  icon?: React.ReactNode | string;
  borderColor?: string;
}

const InputField = ({ name, type, error, icon, ...props }: InputFieldProps) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className={styles["input-container"]}>
      <label
        htmlFor={name}
        className={`${styles["input-field"]} ${focused ? styles.focused : ""} ${
          error ? styles.error : ""
        }`}
      >
        {/* <div className="flex items-center"> */}
        <input
          id={name}
          name={name}
          type={type || "text"}
          {...props}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        {icon && icon}
      </label>
      {error && <p>{error}</p>}
    </div>
  );
};

export default InputField;
