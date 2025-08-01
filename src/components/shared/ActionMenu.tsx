import React, { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "@/app/styles/action-menu.module.scss";
import { User } from "@/helpers/types";

interface ActionMenuProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
  setRefreshTable?: (value: boolean) => void;
}

const ActionMenu = ({
  user,
  isOpen,
  onClose,
  setRefreshTable,
}: ActionMenuProps) => {
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;

      // Don't close if clicking on the action button (three dots)
      if (target.closest(".action_button") || target.textContent === "⋮") {
        return;
      }

      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      // Use a slight delay to prevent immediate closing when opening
      const timeoutId = setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
      }, 100);

      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleViewDetails = () => {
    router.push(`/dashboard/${user?._id}`);
    onClose();
  };

  const handleBlacklist = (
    e: React.MouseEvent<HTMLButtonElement>,
    action: "blacklist" | "activate"
  ) => {
    e.stopPropagation();
    if (user) {
      const updatedUser = {
        ...user,
        status:
          action === "blacklist"
            ? user?.status === "Blacklisted"
              ? "Active"
              : "Blacklisted"
            : user?.status === "Active"
            ? "Inactive"
            : "Active",
      };
      const localStorageData = localStorage.getItem("users");
      if (localStorageData) {
        try {
          const users = JSON.parse(localStorageData);
          const updatedUsers = users.map((u: User) =>
            u._id === user?._id ? updatedUser : u
          );
          localStorage.setItem("users", JSON.stringify(updatedUsers));
          setRefreshTable?.(true);
        } catch (error) {
          console.error("Error updating users data:", error);
        }
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div ref={menuRef} className={styles.actionMenu}>
      <button onClick={handleViewDetails} className={styles.menuItem}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
        View Details
      </button>

      <button
        onClick={(e) => handleBlacklist(e, "blacklist")}
        className={styles.menuItem}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="m4.9 4.9 14.2 14.2" />
        </svg>
        {user?.status === "Blacklisted" ? "Unblacklist User" : "Blacklist User"}
      </button>

      <button
        onClick={(e) => handleBlacklist(e, "activate")}
        className={styles.menuItem}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="m22 2-5 5" />
          <path d="m17 7 5-5" />
        </svg>
        {user?.status === "Inactive" ? "Activate User" : "Deactivate User"}
      </button>
    </div>
  );
};

export default ActionMenu;
