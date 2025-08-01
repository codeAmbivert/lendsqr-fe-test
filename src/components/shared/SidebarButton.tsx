import styles from "@/app/styles/layout/sidebar-button.module.scss";
import { Work_Sans } from "next/font/google";

const workSans = Work_Sans({
  variable: "--work-sans",
  subsets: ["latin"],
});

interface SidebarButtonProps {
  startIcon?: React.ReactNode;
  text: string;
  endIcon?: React.ReactNode;
  isActive?: boolean;
  className?: string;
}

const SidebarButton = ({
  startIcon,
  text,
  endIcon,
  isActive,
  className,
}: SidebarButtonProps) => {
  return (
    <button
      className={`${isActive ? styles.active : styles.btn} ${
        workSans.variable
      } ${className || ""}`}
    >
      {startIcon && startIcon}
      <span>{text}</span>
      {endIcon && endIcon}
      {isActive && <div className={styles.active_div} />}
    </button>
  );
};

export default SidebarButton;
