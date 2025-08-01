import React from "react";
import styles from "@/app/styles/filter-actions.module.scss";

interface FilterActionsProps {
  onReset?: () => void;
  onFilter?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  resetText?: string;
  filterText?: string;
  className?: string;
}

const FilterActions = ({
  onReset,
  onFilter,
  isLoading = false,
  disabled = false,
  resetText = "Reset",
  filterText = "Filter",
  className,
}: FilterActionsProps) => {
  return (
    <div className={`${styles.filterActions} ${className || ""}`}>
      <button
        type="button"
        className={styles.resetButton}
        onClick={onReset}
        disabled={disabled}
      >
        {resetText}
      </button>
      <button
        type="button"
        className={styles.filterButton}
        onClick={onFilter}
        disabled={disabled || isLoading}
      >
        {isLoading ? "Filtering..." : filterText}
      </button>
    </div>
  );
};

export default FilterActions;
