import styles from "@/app/styles/dashboard/dashboard-cards.module.scss";

interface DashboardCardsProps {
  icon: React.ReactNode;
  title: string;
  count: number | string;
}

const DashboardCards = ({ icon, title, count }: DashboardCardsProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.icon_container}>{icon}</div>
      <p className={styles.title}>{title}</p>
      <p className={styles.count}>{count}</p>
    </div>
  );
};

export default DashboardCards;
