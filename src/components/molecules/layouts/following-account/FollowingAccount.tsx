import ItemAccount from "@/components/atoms/account/item-account/ItemAccount";
import { useTranslations } from "next-intl";
import React from "react";
import styles from "./FollowingAccount.module.scss";

function FollowingAccount() {
  const t = useTranslations();
  return (
    <div className={styles.followingContainer}>
      <div className={`${styles.followingItem} hidden-content-lg`}>
        {t("layout.title.following_account")}
      </div>
      <ItemAccount />
    </div>
  );
}

export default FollowingAccount;
