"use client";

import ButtonChat from "@/components/atoms/buttons/ButtonChat";
import ButtonInbox from "@/components/atoms/buttons/ButtonInbox";
import ButtonUpload from "@/components/atoms/buttons/ButtonUpload";
import NormalButton from "@/components/atoms/buttons/NormalButton";
import Avatar from "@/components/atoms/images/avatar/Avatar";
import Logo from "@/components/atoms/images/logo/Logo";
import SearchBar from "@/components/molecules/layouts/search-bar/SearchBar";
import { useTranslations } from "next-intl";
import React from "react";
import styles from "./Header.module.scss";

const Header = () => {
  const t = useTranslations();

  return (
    <div className={`${styles.headerContainer} py-10`}>
      <div>
        <Logo />
      </div>
      <div>
        <SearchBar />
      </div>
      <div className={styles.rightContainer}>
        <ButtonUpload label={t("common.button.upload")} className="h-36-px" />
        <NormalButton
          label={t("login.title")}
          className="button-danger h-36-px"
        />
        <ButtonChat className="" />
        <ButtonInbox />
        <Avatar width={40} height={40} />
      </div>
    </div>
  );
};

export default Header;
