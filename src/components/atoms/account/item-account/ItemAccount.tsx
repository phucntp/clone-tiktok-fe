import React from "react";
import Avatar from "@/components/atoms/images/avatar/Avatar";
import styles from "./ItemAccount.module.scss";

function ItemAccount() {
  return (
    <div className={styles.accountContainer}>
      <div className={styles.accountAvatar}>
        <Avatar />
      </div>
      <div className={`${styles.accountContent} hidden-content-lg`}>
        <div className={styles.accountTitle}>
          <h4>Gusion Name</h4>
        </div>
        <p>Description</p>
      </div>
    </div>
  );
}

export default ItemAccount;
