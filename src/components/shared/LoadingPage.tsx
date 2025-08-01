import React from "react";
import { Logo2 } from "../../../public/icons";
import styles from "@/app/styles/layout/loading-page.module.scss";

const LoadingPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.animate_pulse}>
        <Logo2 height={32} width={173.27} />
      </div>
    </div>
  );
};

export default LoadingPage;
