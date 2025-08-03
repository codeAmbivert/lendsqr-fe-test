import React, { ReactNode, useEffect, useState } from "react";
import styles from "@/app/styles/reusable-table.module.scss";
import { useRouter } from "next/navigation";
import { Filters, User } from "@/helpers/types";
import { RightAngleIcon } from "../../../public/icons";
import { useLayout } from "../layout/LayoutContext";
import { formatPhoneNumber } from "@/helpers/utils";
import CustomSelect from "./CustomSelect";

interface UserTableProps {
  headers: { id: string; label: string | ReactNode }[];
  url: string;
  dataTransformer: (data: User[]) => Record<string, string | ReactNode>[];
  filters: Filters;
  refreshTable?: boolean;
  setRefreshTable?: (value: boolean) => void;
}

const UserTable: React.FC<UserTableProps> = ({
  filters,
  headers,
  url,
  dataTransformer,
  refreshTable = false,
  setRefreshTable,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<User[]>([]);
  const [filteredData, setFilteredData] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isMobile, setIsMobile] = useState(false);
  const { searchText } = useLayout();

  // Check if screen is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  // Calculate the data to display on the current page
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const getUsers = React.useCallback(async () => {
    try {
      setLoading(true);
      const users = localStorage.getItem("users");

      if (users) {
        try {
          setData(JSON.parse(users));
          setLoading(false);
          return;
        } catch (parseError) {
          console.error("Error parsing users from localStorage:", parseError);
          // If localStorage data is corrupted, clear it and fetch from API
          localStorage.removeItem("users");
        }
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setData(data);
      localStorage.setItem("users", JSON.stringify(data));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    getUsers();
    if (refreshTable) setRefreshTable?.(false);
  }, [getUsers, filters, refreshTable, setRefreshTable]);

  // Filter data based on filters prop and global search
  useEffect(() => {
    if (!data.length) {
      setFilteredData([]);
      return;
    }

    let filtered = [...data];

    // First apply global search text if it exists
    if (searchText) {
      filtered = filtered.filter((user) => {
        const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
        const email = user.email?.toLowerCase() || "";
        const organization = user.organization?.toLowerCase() || "";
        const phoneNumber =
          formatPhoneNumber(user.phoneNumber)?.toLowerCase() || "";
        const status = user.status?.toLowerCase() || "";

        const searchLower = searchText.toLowerCase();

        return (
          fullName.includes(searchLower) ||
          email.includes(searchLower) ||
          organization.includes(searchLower) ||
          phoneNumber.includes(searchLower) ||
          status.includes(searchLower)
        );
      });
    }

    // Then apply specific filters
    if (filters.organization) {
      filtered = filtered.filter((user) =>
        user.organization
          ?.toLowerCase()
          .includes(filters.organization.toLowerCase())
      );
    }

    if (filters.username) {
      filtered = filtered.filter(
        (user) =>
          user.firstName
            ?.toLowerCase()
            .includes(filters.username.toLowerCase()) ||
          user.lastName?.toLowerCase().includes(filters.username.toLowerCase())
      );
    }

    if (filters.email) {
      filtered = filtered.filter((user) =>
        user.email?.toLowerCase().includes(filters.email.toLowerCase())
      );
    }

    if (filters.phoneNumber) {
      filtered = filtered.filter((user) =>
        formatPhoneNumber(user.phoneNumber)?.includes(filters.phoneNumber)
      );
    }

    if (filters.status) {
      filtered = filtered.filter(
        (user) => user.status?.toLowerCase() === filters.status.toLowerCase()
      );
    }

    if (filters.dateJoined) {
      const filterDate = new Date(filters.dateJoined);
      filtered = filtered.filter((user) => {
        const userDate = new Date(user.dateJoined);
        return userDate.toDateString() === filterDate.toDateString();
      });
    }

    setFilteredData(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [data, filters, searchText]);

  // Mobile Card View
  const renderMobileCards = () => {
    if (loading) {
      return <div className={styles.mobile_loading}>Loading...</div>;
    }

    if (currentData.length === 0) {
      return (
        <div className={styles.empty_state}>
          <div className={styles.empty_state_content}>
            <div className={styles.empty_state_icon}>📄</div>
            <h3 className={styles.empty_state_title}>No users found</h3>
            <p className={styles.empty_state_message}>
              {searchText || Object.values(filters).some((filter) => filter)
                ? "Try adjusting your search or filters to find what you're looking for."
                : "There are no users to display at the moment."}
            </p>
          </div>
        </div>
      );
    }

    const reorderedHeaders = [...headers].sort((a, b) => {
      // Move action column to the beginning
      if (a.id === "action") return -1;
      if (b.id === "action") return 1;
      return 0;
    });

    return (
      <div className={styles.mobile_cards}>
        {dataTransformer &&
          dataTransformer(currentData)?.map((row, index) => (
            <div
              key={startIndex + index}
              className={styles.mobile_card}
              onClick={() => router.push(`/dashboard/${row.id}`)}
            >
              {reorderedHeaders.map((header) => (
                <div key={header.id} className={styles.card_row}>
                  <span className={styles.card_label}>
                    {header.id === "action"
                      ? "Actions"
                      : header.id.charAt(0).toUpperCase() + header.id.slice(1)}
                  </span>
                  <span className={styles.card_value}>{row[header.id]}</span>
                </div>
              ))}
            </div>
          ))}
      </div>
    );
  };

  // Desktop Table View
  const renderDesktopTable = () => (
    <div className={`${styles.main_table_container} hide-scrollbar`}>
      <div className={`${styles.table_container}`}>
        <table className={styles.data_table}>
          <thead>
            <tr>
              {headers &&
                headers.map((header) => (
                  <th key={header.id} className={styles.table_header}>
                    {header?.label}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={headers.length} className={styles.loading}>
                  Loading...
                </td>
              </tr>
            ) : currentData.length === 0 ? (
              <tr>
                <td
                  colSpan={headers.length}
                  className={styles.empty_state_table}
                >
                  <div className={styles.empty_state_content}>
                    <div className={styles.empty_state_icon}>📄</div>
                    <h3 className={styles.empty_state_title}>No users found</h3>
                    <p className={styles.empty_state_message}>
                      {searchText ||
                      Object.values(filters).some((filter) => filter)
                        ? "Try adjusting your search or filters to find what you're looking for."
                        : "There are no users to display at the moment."}
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              dataTransformer &&
              dataTransformer(currentData)?.map((row, index) => (
                <tr
                  key={startIndex + index}
                  onClick={() => router.push(`/dashboard/${row.id}`)}
                >
                  {headers &&
                    headers.map((header) => (
                      <td key={header.id}>{row[header.id]}</td>
                    ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className={styles.container}>
      {isMobile ? renderMobileCards() : renderDesktopTable()}

      <div className={styles.table_footer}>
        <CustomSelect
          value={rowsPerPage}
          onChange={(value) => {
            const newRowsPerPage = parseInt(value.toString(), 10);
            setRowsPerPage(newRowsPerPage);
            setCurrentPage(1);
          }}
          options={[
            { value: 10, label: "10" },
            { value: 25, label: "25" },
            { value: 50, label: "50" },
            { value: 100, label: "100" },
          ]}
          showCount={true}
          totalCount={filteredData.length}
        />
        <div className={styles.pagination}>
          {renderPaginationButtons(currentPage, setCurrentPage, totalPages)}
        </div>
      </div>
    </div>
  );
};

export default UserTable;

const renderPaginationButtons = (
  currentPage: number,
  setCurrentPage: (page: number) => void,
  totalPages: number
) => {
  const buttons = [];
  const maxButtonsToShow = 5;
  const halfRange = Math.floor(maxButtonsToShow / 2);

  let startPage = Math.max(1, currentPage - halfRange);
  const endPage = Math.min(totalPages, startPage + maxButtonsToShow - 1);

  if (endPage - startPage + 1 < maxButtonsToShow) {
    startPage = Math.max(1, endPage - maxButtonsToShow + 1);
  }

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Previous button
  buttons.push(
    <button
      key="prev"
      onClick={() => handlePageChange(currentPage - 1)}
      disabled={currentPage === 1}
      className={styles.nav_button}
    >
      <RightAngleIcon
        height={11.21}
        width={6.57}
        className={styles.rotateIcon}
      />
    </button>
  );

  // Page buttons
  for (let i = startPage; i <= endPage; i++) {
    buttons.push(
      <button
        key={i}
        onClick={() => handlePageChange(i)}
        className={`${styles.page_button} ${
          i === currentPage ? styles.active : ""
        }`}
      >
        {i}
      </button>
    );
  }

  // Ellipsis and last page if needed
  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      buttons.push(
        <span key="ellipsis-end" className={styles.ellipsis}>
          ...
        </span>
      );
    }
    buttons.push(
      <button
        key={totalPages}
        onClick={() => handlePageChange(totalPages)}
        className={`${styles.page_button} ${
          totalPages === currentPage ? styles.active : ""
        }`}
      >
        {totalPages}
      </button>
    );
  }

  // Next button
  buttons.push(
    <button
      key="next"
      onClick={() => handlePageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
      className={styles.nav_button}
    >
      <RightAngleIcon height={11.21} width={6.57} />
    </button>
  );

  return buttons;
};
