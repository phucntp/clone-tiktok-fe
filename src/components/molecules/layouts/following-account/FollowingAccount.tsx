import ItemAccount from "@/components/atoms/account/item-account/ItemAccount";
import { useTranslations } from "next-intl";
import React from "react";

function FollowingAccount() {
  const t = useTranslations();
  return (
    <div>
      <div>{t("layout.title.following_account")}</div>
      <ItemAccount />
    </div>
  );
}

export default FollowingAccount;
