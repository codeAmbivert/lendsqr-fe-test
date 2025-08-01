import styles from "@/app/styles/dashboard/dashboard-id-page.module.scss";
import {
  FilledStarIcon,
  OutlineStarIcon,
  UserIcon,
} from "../../../../public/icons";
import { User } from "@/helpers/types";

interface DetailsAndStateButtonsProps {
  user: User | null;
  pageState: string;
  setPageState: (state: string) => void;
}
const DetailsAndStateButtons = ({
  user,
  pageState,
  setPageState,
}: DetailsAndStateButtonsProps) => {
  const states = [
    { label: "General Details", id: "GeneralDetails" },
    { label: "Documents", id: "Documents" },
    { label: "Bank Details", id: "BankDetails" },
    { label: "Loans", id: "Loans" },
    { label: "Savings", id: "Savings" },
    { label: "App and System", id: "AppAndSystem" },
  ];
  return (
    <div className={styles.detailsAndStateButtons}>
      <div className={styles.detailsContainer}>
        <div className={styles.details}>
          <div className={styles.userIconDiv}>
            <UserIcon className={styles.userIcon} />
          </div>
          <div className={styles.userInfo}>
            <div>
              <h3>
                {user?.firstName} {user?.lastName}
              </h3>
              <p>LSQFf587g90</p>
            </div>
            <div className={styles.middleDiv}>
              <div>
                <h4>User&apos;s Tier</h4>
                <div className={styles.starContainer}>
                  <FilledStarIcon className={styles.starIcon} />
                  <OutlineStarIcon className={styles.starIcon} />
                  <OutlineStarIcon className={styles.starIcon} />
                </div>
              </div>
            </div>
            <div>
              <h3>₦200,000.00</h3>
              <span>9912345678/Providus Bank</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.stateButtonsContainer}>
        {states?.map((item) => (
          <div
            key={item.id}
            className={`${pageState === item.id && styles.activeBtn} ${
              styles.button
            } `}
            onClick={() => setPageState(item.id)}
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailsAndStateButtons;
