import styles from "@/app/styles/status.module.scss";

interface StatusProps {
  status: string;
}

const Status = ({ status }: StatusProps) => {
  const statusClass = status?.toLocaleLowerCase() || "default";

  return (
    <div className={`${styles.status} ${styles[statusClass]}`}>{status}</div>
  );
};

export default Status;
