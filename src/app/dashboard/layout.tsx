"use client";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import styles from "@/app/styles/layout/layout.module.scss";
import { LayoutProvider, useLayout } from "@/components/layout/LayoutContext";
import MobileSidebar from "@/components/layout/MobileSidebar";

const LayoutContent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { openSidebar, setOpenSidebar } = useLayout();

  return (
    <>
    <div className={styles.layout}>
      <Header openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
      <main>
        <div className={styles.sidebar}>
          <Sidebar />
        </div>
        <div className={styles.content}>{children}</div>
      </main>
    </div>
      <MobileSidebar 
        sidebarOpen={openSidebar}
        setSidebarOpen={setOpenSidebar}/> 
    </>
  );
};

const Layout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <LayoutProvider>
      <LayoutContent>{children}</LayoutContent>
    </LayoutProvider>
  );
};

export default Layout;