"use client";
import styles from "@/app/styles/dashboard/dashboard.module.scss";
import React, { useEffect, useState } from "react";
import {
  DashboardActiveIcon,
  DashboardLoansIcon,
  DashboardUserIcon,
  SearchIcon,
} from "../../../public/icons";
import DashboardCards from "@/components/dashboard/DashboardCards";
import LoadingPage from "@/components/shared/LoadingPage";
import DashboardTable from "@/components/dashboard/DashboardTable";
import { useLayout } from "@/components/layout/LayoutContext";

const DashboardPage = () => {
  const [loading, setLoading] = useState(true);
  const { searchText, setSearchText } = useLayout();
  const cards = [
    { icon: DashboardUserIcon, title: "USERS", count: "2,453" },
    { icon: DashboardActiveIcon, title: "ACTIVE USERS", count: "2,453" },
    { icon: DashboardLoansIcon, title: "USERS WITH LOANS", count: "12,453" },
    {
      icon: DashboardActiveIcon,
      title: "USERS WITH SAVINGS",
      count: "102,453",
    },
  ];

  useEffect(() => {
    if (typeof window !== "undefined") {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className={styles.container}>
      <p className={styles.page_name}>Users</p>
      <div className={styles.cards_container}>
        {cards.map((item) => (
          <DashboardCards
            key={item.title}
            icon={<item.icon height={40} width={40} />}
            title={item.title}
            count={item.count}
          />
        ))}
      </div>
      <div className={styles.search_container}>
        <input
          type="text"
          placeholder="Search for anything"
          className={styles.search_input}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <div className={styles.search_icon}>
          <SearchIcon height={14} width={13.97} />
        </div>
      </div>
      <DashboardTable />
    </div>
  );
};

export default DashboardPage;
