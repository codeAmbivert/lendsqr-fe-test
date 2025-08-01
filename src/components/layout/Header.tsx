import styles from "@/app/styles/layout/header.module.scss";
import {
  BellIcon,
  Logo,
  OpenMenuIcon,
  SearchIcon,
} from "../../../public/icons";
import Image from "next/image";
import { useLayout } from "./LayoutContext";

interface HeaderProps {
  openSidebar: boolean;
  setOpenSidebar: (state: boolean) => void;
}

const Header = ({ openSidebar, setOpenSidebar }: HeaderProps) => {
  const { searchText, setSearchText } = useLayout();

  return (
    <div className={styles.container}>
      <div className={styles.logo_container}>
        <OpenMenuIcon
          className={styles.open_menu_icon}
          onClick={() => setOpenSidebar(!openSidebar)}
        />

        <Logo height={30} width={144.8} />
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

      <div className={styles.user_section}>
        <span className={styles.docs_link}>Docs</span>
        {/* <div className={styles.notification_icon}>

        </div> */}
        <BellIcon height={22.74} width={19.67} />
        <div className={styles.user_profile}>
          <div className={styles.user_avatar}>
            <Image src="/user-avatar.png" alt="User" width={48} height={48} />
          </div>
          <span className={styles.user_name}>Adedeji</span>
          <span className={styles.dropdown_arrow}>▼</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
