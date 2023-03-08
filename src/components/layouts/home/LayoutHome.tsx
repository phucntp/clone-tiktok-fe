"use client";

import React from "react";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import SideBar from "../home/side-bar/SideBar";
import styles from "./LayoutHome.module.scss";

export function LayoutHome({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.containerLayout}>
      <Header />
      <SideBar />
      {children}
      <Footer />
    </div>
  );
}
