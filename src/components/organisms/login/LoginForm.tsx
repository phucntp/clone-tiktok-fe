import React from "react";
import InputNormal from "@/components/atoms/form/inputs/InputNormal";
import InputPassword from "@/components/atoms/form/inputs/InputPassword";
import styles from "./LoginForm.module.scss";
import Modal from "@/components/molecules/modal/Modal";
import NormalButton from "@/components/atoms/buttons/NormalButton";
import Link from "next/link";

function LoginForm() {
  return (
    <Modal height="80%">
      <div className={`${styles.backgroundLogin} p-50 h-100`}>
        <h2 className="my-32">Đăng nhập</h2>
        <div className="mb-5">
          <label>Email hoặc Tiktok ID</label>
        </div>
        <form action="">
          <div className="my-10">
            <InputNormal />
          </div>
          <div>
            <InputPassword />
          </div>
        </form>
        <Link className="d-block py-10" href="">Quên mật khẩu</Link>
        <NormalButton label="Đăng nhập" type="submit" className="w-100 mt-30" />
        <div className={styles.redirectRegister}>
          Bạn chưa có tài khoản? <a href="">Đăng ký</a>
        </div>
      </div>
    </Modal>
  )
}

export default LoginForm;
