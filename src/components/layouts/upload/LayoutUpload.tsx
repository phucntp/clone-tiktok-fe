import Footer from "@/components/molecules/footer/Footer";
import Header from "@/components/molecules/header/Header";
import React from "react";
import styles from "./LayoutUpload.module.scss";

function LayoutUpload({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.containerLayout}>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default LayoutUpload;
