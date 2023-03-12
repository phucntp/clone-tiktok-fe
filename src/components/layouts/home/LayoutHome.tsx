"use client";

import React, { useState } from "react";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import SideBar from "../home/side-bar/SideBar";
import styles from "./LayoutHome.module.scss";
import useBreakpoint from "@/hooks/useBreakpoint";
import HeaderSP from "./header/HeaderSP";

export function LayoutHome({ children }: { children: React.ReactNode }) {
  const [showSideMenu, setShowSideMenu] = useState(false);

  const closeSideMenu = () => {
    setShowSideMenu(false);
  };

  const openSideMenu = () => {
    setShowSideMenu(true);
  };

  const breakpoint = useBreakpoint();
  return (
    <div className={styles.containerLayout}>
      {breakpoint === "SM" ? (
        <HeaderSP openSideMenu={openSideMenu} />
      ) : (
        <Header />
      )}
      {(breakpoint !== "SM" || (showSideMenu && breakpoint === "SM")) && (
        <SideBar closeSideMenu={closeSideMenu} />
      )}
      {children}
      <Footer />
    </div>
  );
}
