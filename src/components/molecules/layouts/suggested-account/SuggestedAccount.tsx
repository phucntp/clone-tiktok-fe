import ItemAccount from "@/components/atoms/account/item-account/ItemAccount";
import { useTranslations } from "next-intl";
import React from "react";
import styles from "./SuggestedAccount.module.scss";

function SuggestedAccount() {
  const t = useTranslations();
  return (
    <div className={styles.suggestedContainer}>
      <div className={`${styles.suggestedTitle} hidden-content-lg`}>
        {t("layout.title.suggested_account")}
      </div>
      <ItemAccount />
    </div>
  );
}

export default SuggestedAccount;
