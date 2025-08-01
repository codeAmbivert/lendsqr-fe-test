import React from "react";
import styles from "@/app/styles/button.module.scss";
import { cn } from "@/helpers/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "reset" | "filter";
  size?: "sm" | "md";
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  className,
  variant = "reset", // Default variant
  size = "md", // Default size
  ...props
}) => {
  return (
    <button
      className={cn(styles.button, styles[variant], styles[size], className)}
      {...props}
    />
  );
};

export default Button;
