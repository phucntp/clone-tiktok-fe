import Discover from "@/components/molecules/layouts/discover/Discover";
import FollowingAccount from "@/components/molecules/layouts/following-account/FollowingAccount";
import Information from "@/components/molecules/layouts/information/Information";
import Object from "@/components/molecules/layouts/object/Object";
import SuggestedAccount from "@/components/molecules/layouts/suggested-account/SuggestedAccount";
import React from "react";
import styles from "./SideBar.module.scss";

const SideBar = () => {
  return (
    <div className={styles.sidebarContainer}>
      <Object />
      <SuggestedAccount />
      <FollowingAccount />
      <Discover />
      <Information />
    </div>
  );
};

export default SideBar;
