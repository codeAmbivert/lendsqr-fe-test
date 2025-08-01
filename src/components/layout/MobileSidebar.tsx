import {
  ArrowDown,
  BadgePercentage,
  Briefcase,
  CloseMenuIcon,
  Handshake,
  Home,
  Logo,
  Money,
  MoneyHand,
  PiggyBank,
  Sliders,
  UserCheck,
  UserFriends,
  Users,
  UserTimes,
  Clipboard,
  TireIcon,
  SignOutIcon,
} from "../../../public/icons";
import styles from "@/app/styles/layout/sidebar.module.scss";
import SidebarButton from "../shared/SidebarButton";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (state: boolean) => void;
}

const MobileSidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
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
        { name: "Preferences", icon: Sliders },
        { name: "Fees and Pricing", icon: BadgePercentage },
        { name: "Audit Logs", icon: Clipboard },
        { name: "System Messages", icon: TireIcon },
      ],
    },
  ];

  const handleClose = () => {
    setSidebarOpen(false);
  };

  return (
    <div>
      {sidebarOpen && (
        <div onClick={handleClose} className={styles.transparent_modal} />
      )}
      <div
        className={`${styles.mobile_container} ${
          sidebarOpen ? styles.open : styles.closed
        }`}
      >
        <div className={styles.logo_container}>
          <Logo height={30} width={144.8} />
          <CloseMenuIcon
            onClick={handleClose}
            className={styles.close_menu_icon}
          />
        </div>
        <div className={styles.content}>
          <SidebarButton
            text="Switch Organization"
            startIcon={<Briefcase />}
            endIcon={<ArrowDown width={11} height={11} />}
            className={styles.dashboard_button}
          />
          <SidebarButton
            text="Dashboard"
            startIcon={<Home />}
            isActive={false}
            className={styles.dashboard_button}
          />
          <div className={styles.buttons}>
            {buttons.map((item) => (
              <div key={item.name} className={styles.button_container}>
                <p className={styles.title}>{item.name}</p>
                {item.button.map((buttonItem) => {
                  const IconComponent = buttonItem.icon;
                  return (
                    <SidebarButton
                      key={buttonItem.name}
                      text={buttonItem.name}
                      startIcon={<IconComponent />}
                      isActive={buttonItem.name === "Users"}
                    />
                  );
                })}
              </div>
            ))}
          </div>
          <div className={styles.footer}>
            <SidebarButton text="Logout" startIcon={<SignOutIcon />} />
            <p>v1.2.0</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileSidebar;
