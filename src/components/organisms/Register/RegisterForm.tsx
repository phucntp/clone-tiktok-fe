import React from "react";
import InputNormal from "@/components/atoms/form/inputs/InputNormal";
import InputPassword from "@/components/atoms/form/inputs/InputPassword";
import styles from "./RegisterForm.module.scss";
import Modal from "@/components/molecules/Modal/Modal";
import NormalButton from "@/components/atoms/buttons/NormalButton";
import Link from "next/link";

async function LoginForm() {
  return (
    <Modal height="80%">
      <div className={`${styles.backgroundContain} p-50 h-100`}>
        <h2 className="my-32">Đăng ký</h2>
        <div className="mb-5">
          <label>Email</label>
        </div>
        <form action="">
          <div className="my-10">
            <InputNormal />
          </div>
          <div className="my-10">
            <InputPassword />
          </div>
          <div>
            <InputPassword />
          </div>
        </form>
        <Link className="d-block py-10" href="">Quên mật khẩu</Link>
        <NormalButton label="Đăng nhập" type="submit" className="w-100 mt-30" />
      </div>
    </Modal>
  )
}

export default LoginForm;
