"use client";

import React, { useState } from "react";
import styles from "./LayoutHome.module.scss";
import useBreakpoint from "@/hooks/useBreakpoint";
import HeaderSP from "@/components/molecules/header/HeaderSP";
import Header from "@/components/molecules/header/Header";
import SideBar from "@/components/molecules/side-bar/SideBar";

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
    </div>
  );
}
