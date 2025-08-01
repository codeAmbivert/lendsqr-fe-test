import React from "react";
import {
  ArrowDown,
  BadgePercentage,
  Briefcase,
  Clipboard,
  Handshake,
  Home,
  Money,
  MoneyHand,
  PiggyBank,
  SignOutIcon,
  Sliders,
  TireIcon,
  UserCheck,
  UserFriends,
  Users,
  UserTimes,
} from "../../../public/icons";
import styles from "@/app/styles/layout/sidebar.module.scss";
import SidebarButton from "../shared/SidebarButton";

const Sidebar = () => {
  const buttons = [
    {
      name: "CUSTOMERS",
      button: [
        { name: "Users", icon: UserFriends },
        { name: "Guarantors", icon: Users },
        { name: "Loans", icon: Money },
        { name: "Decision Models", icon: Handshake },
        { name: "Savings", icon: PiggyBank },
        { name: "Loan Requests", icon: MoneyHand },
        { name: "Whitelist", icon: UserCheck },
        { name: "Karma", icon: UserTimes },
      ],
    },
    {
      name: "BUSINESSES",
      button: [
        { name: "Organization", icon: Briefcase },
        { name: "Loan Products", icon: MoneyHand },
      ],
    },
    {
      name: "SETTINGS",
      button: [
        { name: "Prefrences", icon: Sliders },
        { name: "Fees and Pricing", icon: BadgePercentage },
        { name: "Audit Logs", icon: Clipboard },
        { name: "System Messages", icon: TireIcon },
      ],
    },
  ];
  return (
    <div className={styles.container}>
      <SidebarButton
        text="Switch Organization"
        startIcon={<Briefcase />}
        endIcon={<ArrowDown width={11} height={11} />}
      />
      <SidebarButton text="Dashboard" startIcon={<Home />} isActive={false} />
      <div className={styles.buttons}>
        {buttons.map((item) => (
          <div key={item.name} className={styles.button_container}>
            <p className={styles.title}>{item.name}</p>
            {item.button.map((button) => (
              <SidebarButton
                key={button.name}
                text={button.name}
                startIcon={<button.icon />}
                isActive={button.name === "Users"}
              />
            ))}
          </div>
        ))}
      </div>
      <div className={styles.footer}>
        <SidebarButton text="Logout" startIcon={<SignOutIcon />} />
        <p>v1.2.0</p>
      </div>
    </div>
  );
};

export default Sidebar;
