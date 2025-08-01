"use client";
import styles from "@/app/styles/dashboard/dashboard-table.module.scss";
import tableStyles from "@/app/styles/reusable-table.module.scss";
import UserTable from "../shared/ReusableTable";
import { format } from "date-fns";
import Status from "../shared/Status";
import ActionMenu from "../shared/ActionMenu";
import { Filters, User } from "@/helpers/types";
import Filter from "./Filter";
import { useState } from "react";
import { formatPhoneNumber } from "@/helpers/utils";

const DashboardTable = () => {
  const [refreshTable, setRefreshTable] = useState(false);
  const [openActionMenu, setOpenActionMenu] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>({
    organization: "",
    username: "",
    email: "",
    dateJoined: null,
    phoneNumber: "",
    status: "",
  });

  const headers = [
    {
      id: "organization",
      label: (
        <Filter
          filters={filters}
          setFilters={setFilters}
          label="organization"
        />
      ),
    },
    {
      id: "username",
      label: (
        <Filter filters={filters} setFilters={setFilters} label="username" />
      ),
    },
    {
      id: "email",
      label: <Filter filters={filters} setFilters={setFilters} label="email" />,
    },
    {
      id: "phoneNumber",
      label: (
        <Filter
          filters={filters}
          setFilters={setFilters}
          label="phone number"
        />
      ),
    },
    {
      id: "dateJoined",
      label: (
        <Filter filters={filters} setFilters={setFilters} label="date joined" />
      ),
    },
    {
      id: "status",
      label: (
        <Filter
          filters={filters}
          setFilters={setFilters}
          label="status"
          status
        />
      ),
    },
    { id: "action", label: "" },
  ];

  const dataTransformer = (data: User[]) => {
    return data?.map((item) => ({
      id: item?._id,
      username: `${item?.firstName} ${item?.lastName}`,
      email: `${item?.email}`,
      phoneNumber: formatPhoneNumber(item?.phoneNumber),
      dateJoined: `${format(
        new Date(item.dateJoined),
        "MMM dd, yyyy"
      )} ${format(new Date(item.dateJoined), "HH:mm a")}`,
      status: <Status status={item.status} />,
      action: (
        <div className={tableStyles.action_btn_container}>
          <button
            className={tableStyles.action_button}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setOpenActionMenu(openActionMenu === item._id ? null : item._id);
            }}
          >
            ⋮
          </button>
          <ActionMenu
            user={item}
            isOpen={openActionMenu === item._id}
            onClose={() => setOpenActionMenu(null)}
            setRefreshTable={setRefreshTable}
          />
        </div>
      ),
      organization: item?.organization,
    }));
  };

  return (
    <div className={styles.container}>
      <UserTable
        refreshTable={refreshTable}
        setRefreshTable={setRefreshTable}
        url="https://lendsqr-users.free.beeceptor.com/"
        filters={filters}
        headers={headers}
        dataTransformer={dataTransformer}
      />
    </div>
  );
};

export default DashboardTable;
