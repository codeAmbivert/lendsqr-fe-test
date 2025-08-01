"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { BackIcon } from "../../../../public/icons";
import styles from "@/app/styles/dashboard/dashboard-id-page.module.scss";
import { Work_Sans } from "next/font/google";
import { User } from "@/helpers/types";
import DetailsAndStateButtons from "@/components/dashboard/idPage/DetailsAndStateButtons";
import InfoSection from "@/components/dashboard/idPage/InfoSection";
import infoStyles from "@/app/styles/dashboard/info-section.module.scss";

const work_sans = Work_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

const UserDetail = () => {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [pageState, setPageState] = useState("GeneralDetails");
  const [user, setUser] = useState<User | null>(null);

  const getUserFromLocalStorage = () => {
    const localStorageData = localStorage.getItem("users");
    if (localStorageData) {
      try {
        const users = JSON.parse(localStorageData);
        const foundUser = users.find((user: User) => user._id === id) || null;
        setUser(foundUser);
      } catch (error) {
        console.error("Error parsing users data:", error);
        setUser(null);
      }
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      getUserFromLocalStorage();
    }
  }, [id]);

  const personalInfoItems = [
    {
      label: "Full Name",
      value: `${user?.firstName || ""} ${user?.lastName || ""}`,
      key: "fullName",
    },
    {
      label: "Phone Number",
      value: user?.phoneNumber || "N/A",
      key: "phoneNumber",
    },
    { label: "Email Address", value: user?.email || "N/A", key: "email" },
    { label: "BVN", value: user?.bvn?.toString() || "N/A", key: "bvn" },
    { label: "Gender", value: user?.gender || "N/A", key: "gender" },
    {
      label: "Marital Status",
      value: user?.maritalStatus || "N/A",
      key: "maritalStatus",
    },
    { label: "Children", value: user?.children || "N/A", key: "children" },
    {
      label: "Type of Residence",
      value: user?.residenceType || "N/A",
      key: "residenceType",
    },
  ];

  const educationEmploymentItems = [
    {
      label: "Level of Education",
      value: user?.educationLevel || "N/A",
      key: "educationLevel",
    },
    {
      label: "Employment Status",
      value: user?.employmentStats || "N/A",
      key: "employmentStats",
    },
    {
      label: "Sector of Employment",
      value: user?.sector || "N/A",
      key: "sector",
    },
    {
      label: "Duration of Employment",
      value: user?.employmentDuration || "N/A",
      key: "employmentDuration",
    },
    {
      label: "Office Email",
      value: user?.officeEmail || "N/A",
      key: "officeEmail",
    },
    {
      label: "Monthly Income",
      value: user?.monthlyIncome || "N/A",
      key: "monthlyIncome",
    },
    {
      label: "Loan Repayment",
      value: user?.loanRepayment || "N/A",
      key: "loanRepayment",
    },
  ];

  const socialsItems = [
    {
      label: "Twitter",
      value: `@${user?.firstName?.toLowerCase() || "N/A"}_${
        user?.lastName?.toLowerCase() || ""
      }`,
      key: "twitter",
    },
    {
      label: "Facebook",
      value: `${user?.firstName || ""} ${user?.lastName || ""}`,
      key: "facebook",
    },
    {
      label: "Instagram",
      value: `@${user?.firstName?.toLowerCase() || "N/A"}_${
        user?.lastName?.toLowerCase() || ""
      }`,
      key: "instagram",
    },
  ];

  const guarantorItems =
    user?.guarantor?.map((guarantor, index) => [
      {
        label: "Full Name",
        value: guarantor.name || "N/A",
        key: `guarantor${index}_name`,
      },
      {
        label: "Phone Number",
        value: guarantor.phoneNumber || "N/A",
        key: `guarantor${index}_phone`,
      },
      {
        label: "Email Address",
        value: guarantor.email || "N/A",
        key: `guarantor${index}_email`,
      },
      {
        label: "Relationship",
        value: guarantor.relationship || "N/A",
        key: `guarantor${index}_relationship`,
      },
    ]) || [];

  const renderContent = () => {
    if (!user) {
      return <div className={styles.loading}>Loading user information...</div>;
    }

    switch (pageState) {
      case "GeneralDetails":
        return (
          <>
            <InfoSection
              title="Personal Information"
              items={personalInfoItems}
              className={infoStyles.withBorder}
            />
            <InfoSection
              title="Education and Employment"
              items={educationEmploymentItems}
              className={infoStyles.withBorder}
            />
            <InfoSection
              title="Socials"
              items={socialsItems}
              className={infoStyles.withBorder}
            />
            {guarantorItems.map((items, index) => (
              <InfoSection
                key={`guarantor-${index}`}
                title="Guarantor"
                items={items}
              />
            ))}
          </>
        );
      case "Documents":
        return (
          <div className={styles.placeholder}>
            Documents information will be displayed here
          </div>
        );
      case "BankDetails":
        return (
          <div className={styles.placeholder}>
            Bank details will be displayed here
          </div>
        );
      case "Loans":
        return (
          <div className={styles.placeholder}>
            Loans information will be displayed here
          </div>
        );
      case "Savings":
        return (
          <div className={styles.placeholder}>
            Savings information will be displayed here
          </div>
        );
      case "AppAndSystem":
        return (
          <div className={styles.placeholder}>
            App and System information will be displayed here
          </div>
        );
      default:
        return (
          <div className={styles.placeholder}>
            Select a section to view details
          </div>
        );
    }
  };

  const handleBlacklist = (action: "blacklist" | "activate") => {
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
      setUser(updatedUser);
      const localStorageData = localStorage.getItem("users");
      if (localStorageData) {
        try {
          const users = JSON.parse(localStorageData);
          const updatedUsers = users.map((u: User) =>
            u._id === user._id ? updatedUser : u
          );
          localStorage.setItem("users", JSON.stringify(updatedUsers));
          getUserFromLocalStorage();
        } catch (error) {
          console.error("Error updating users data:", error);
        }
      }
    }
  };

  return (
    <div className={`${styles.container} ${work_sans.className}`}>
      <div className={styles.backBtn} onClick={() => router.back()}>
        <BackIcon className={styles.backIcon} />
        <span>Back to Users</span>
      </div>
      <div className={styles.userDetailsHeader}>
        <h3>User Details</h3>

        <div className={styles.actionBtns}>
          <button
            className={styles.blacklistBtn}
            onClick={() => handleBlacklist("blacklist")}
          >
            {user?.status === "Blacklisted"
              ? "UNBLACKLIST USER"
              : "BLACKLIST USER"}
          </button>
          <button
            className={styles.activateBtn}
            onClick={() => handleBlacklist("activate")}
          >
            {user?.status === "Inactive" ? "ACTIVATE USER" : "DEACTIVATE USER"}
          </button>
        </div>
      </div>
      <DetailsAndStateButtons
        user={user}
        pageState={pageState}
        setPageState={setPageState}
      />
      <div className={styles.allInfoContainer}>{renderContent()}</div>
    </div>
  );
};

export default UserDetail;
