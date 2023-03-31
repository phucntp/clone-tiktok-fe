"use client";

import Discover from "@/components/molecules/layouts/discover/Discover";
import FollowingAccount from "@/components/molecules/layouts/following-account/FollowingAccount";
import Information from "@/components/molecules/layouts/information/Information";
import Object from "@/components/molecules/layouts/object/Object";
import SuggestedAccount from "@/components/molecules/layouts/suggested-account/SuggestedAccount";
import React, { useRef } from "react";
import styles from "./SideBar.module.scss";
import useBreakpoint from "@/hooks/useBreakpoint";
import IconMenu from "@/components/atoms/icons/IconMenu";
import Logo from "@/components/atoms/images/logo/Logo";
import { useClickAway } from "react-use";

type TProps = {
  closeSideMenu?: () => void;
};

const SideBar = ({ closeSideMenu = () => {} }: TProps) => {
  const breakpoint = useBreakpoint();
  const ref = useRef(null);
  useClickAway(ref, () => {
    closeSideMenu();
  });
  return (
    <div ref={ref} className={styles.sidebarContainer}>
      {breakpoint === "SM" && (
        <div className="d-flex align-center">
          <IconMenu className="w-32-px h-32-px" color="black" />
          <Logo color="black" />
        </div>
      )}
      {breakpoint === "SM" ? (
        <Object colorFollowing="black" colorForYou="black" />
      ) : (
        <Object />
      )}
      {breakpoint !== "SM" && <SuggestedAccount />}
      <FollowingAccount />
      <Discover className="hidden-content-lg" />
      <Information className="hidden-content-lg" />
    </div>
  );
};

export default SideBar;
