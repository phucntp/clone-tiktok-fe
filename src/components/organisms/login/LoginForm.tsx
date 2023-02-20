import React from "react";
import InputNormal from "@/components/atoms/form/inputs/InputNormal";
import InputPassword from "@/components/atoms/form/inputs/InputPassword";
import styles from "./LoginForm.module.scss";
import Modal from "@/components/molecules/modal/Modal";

function LoginForm() {
  return (
    <Modal>
      <div className={`${styles.backgroundLogin} p-50`}>
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
