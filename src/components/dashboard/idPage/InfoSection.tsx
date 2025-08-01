import styles from "@/app/styles/dashboard/info-section.module.scss";

interface InfoItem {
  label: string;
  value: string | number;
  key: string;
}

interface InfoSectionProps {
  title: string;
  items: InfoItem[];
  className?: string;
}

const InfoSection: React.FC<InfoSectionProps> = ({
  title,
  items,
  className,
}) => {
  return (
    <div className={`${styles.infoSection} ${className || ""}`}>
      <h3 className={styles.sectionTitle}>{title}</h3>
      <div className={styles.infoGrid}>
        {items.map((item) => (
          <div key={item.key} className={styles.infoItem}>
            <span className={styles.label}>{item.label}</span>
            <span className={styles.value}>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoSection;
