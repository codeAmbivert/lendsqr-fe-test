"use client";
import {
  useEffect,
  useRef,
  useState,
  useMemo,
  Dispatch,
  SetStateAction,
} from "react";
import { CalendarIcon, FilterIcon } from "../../../public/icons";
import styles from "@/app/styles/filter-comp.module.scss";
import FilterInput from "../shared/FilterInput";
import ReusableDropDown from "../shared/ReusableDropDown";
import DatePicker from "../shared/DatePicker";
import FilterActions from "../shared/FilterActions";
import { Filters, User } from "@/helpers/types";

interface FilterProps {
  label: string;
  status?: boolean;
  filters: Filters;
  setFilters?: Dispatch<SetStateAction<Filters>>;
}

const initialFilterState = {
  organization: "",
  username: "",
  email: "",
  dateJoined: null,
  phoneNumber: "",
  status: "",
};

const Filter = ({ label, status, filters, setFilters }: FilterProps) => {
  const popupRef = useRef<HTMLDivElement>(null);
  const [openFilter, setOpenFilter] = useState(false);
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [compFilters, setCompFilters] = useState<Filters>(initialFilterState);

  // Get unique organizations from users stored in localStorage using useMemo
  const organizations = useMemo(() => {
    try {
      const storedUsers = localStorage.getItem("users");
      if (storedUsers) {
        const parsedUsers = JSON.parse(storedUsers);
        if (Array.isArray(parsedUsers)) {
          // Extract unique organizations from users
          const uniqueOrgs = new Set<string>();
          parsedUsers.forEach((user: User) => {
            const orgName = user.organization;
            if (orgName) {
              uniqueOrgs.add(orgName);
            }
          });

          // Convert to dropdown format
          return Array.from(uniqueOrgs).map((orgName) => ({
            label: orgName,
            value: orgName,
          }));
        }
      }
      return [];
    } catch (error) {
      console.error("Error parsing users from localStorage:", error);
      return [];
    }
  }, []);

  const statusOptions = [
    { label: "Active", value: "Active" },
    { label: "Inactive", value: "Inactive" },
    { label: "Pending", value: "Pending" },
    { label: "Blacklisted", value: "Blacklisted" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCompFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFilter = () => {
    setFilters?.(compFilters);
    setOpenFilter(false);
  };

  const handleReset = () => {
    setCompFilters(initialFilterState);
    setFilters?.(initialFilterState);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node) &&
        !openDatePicker
      ) {
        setOpenFilter(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDatePicker]);

  useEffect(() => {
    if (openFilter) {
      setCompFilters(filters);
    }
  }, [openFilter]);

  return (
    <div ref={popupRef} className={styles.filter_container}>
      <button
        className={styles.table_header}
        onClick={() => setOpenFilter(!openFilter)}
      >
        {label} <FilterIcon width={16} height={10.67} />        
      </button>

      {openFilter && (
        <div className={status ? styles.status_filter : styles.filter}>
          <ReusableDropDown
            searchable
            label="Organization"
            options={organizations}
            placeHolder="Select"
            value={organizations?.find(
              (org) => org.label === compFilters?.organization
            )}
            onChange={(option) =>
              setCompFilters((prev) => ({
                ...prev,
                organization: option.label,
              }))
            }
          />
          <FilterInput
            value={compFilters?.username}
            onChange={handleChange}
            label="Username"
            name="username"
            placeholder="User"
          />
          <FilterInput
            value={compFilters?.email}
            onChange={handleChange}
            label="Email"
            name="email"
            placeholder="Email"
          />
          <FilterInput
            value={
              (compFilters?.dateJoined as Date)?.toLocaleDateString() || ""
            }
            label="Date Joined"
            name="dateJoined"
            placeholder="Date"
            readOnly
            endIcon={<CalendarIcon width={16} height={16} />}
            onClick={() => setOpenDatePicker(true)}
          />
          <FilterInput
            value={compFilters?.phoneNumber}
            onChange={handleChange}
            label="Phone Number"
            name="phoneNumber"
            placeholder="Phone Number"
          />

          <ReusableDropDown
            label="Status"
            options={statusOptions}
            placeHolder="Select"
            position="up"
            value={statusOptions?.find(
              (opt) => opt.label === compFilters?.status
            )}
            onChange={(option) =>
              setCompFilters((prev) => ({
                ...prev,
                status: option.label,
              }))
            }
          />
          <div>
            <FilterActions
              onReset={handleReset}
              onFilter={handleFilter}
              isLoading={false}
              disabled={false}
              resetText="Reset"
              filterText="Filter"
            />
          </div>
        </div>
      )}
      <DatePicker
        isOpen={openDatePicker}
        onClose={setOpenDatePicker}
        title="Date Joined"
        onChange={(date) => {
          if (date) {
            setCompFilters((prev) => ({
              ...prev,
              dateJoined: date.toDate(),
            }));
          }
          setOpenDatePicker(false);
        }}
      />
    </div>
  );
};

export default Filter;
