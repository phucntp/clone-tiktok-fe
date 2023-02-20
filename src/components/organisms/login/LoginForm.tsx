import React from "react";
import InputNormal from "@/components/atoms/form/InputNormal";
import InputPassword from "@/components/atoms/form/InputPassword";
import styles from "@/app/login/Login.module.scss";
import Modal from "@/components/molecules/modal/Modal";

function LoginForm() {
  return (
    <Modal>
      <div className={styles.backgroundLogin}>
        <div>LoginForm</div>
        <div>
          <InputNormal label="Login" />
        </div>
        <div>
          <InputPassword label="Password" />
        </div>
      </div>
    </Modal>
  );
}

export default LoginForm;
