'use client';

import React, {useState, useCallback, useEffect} from "react";
import InputNormal from "@/components/atoms/form/inputs/InputNormal";
import InputPassword from "@/components/atoms/form/inputs/InputPassword";
import styles from "./LoginForm.module.scss";
import Modal from "@/components/molecules/Modal/Modal";
import NormalButton from "@/components/atoms/buttons/NormalButton";
import Link from "next/link";
import { ROUTER } from "@/routers/routers";
import loginActions from "@/actions/login";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "@/store";

interface Props {
  dict: any
}

export default function LoginForm({dict} : Props) {
  const [showModal, setShowModal] = useState(true)
  const dispatch = useDispatch()
  const auth = useSelector((state: AppState) => state.loginReducer.data)

  const toggleModal = useCallback(() => {
    setShowModal((prev) => !prev)
  }, [])

  const handleLogin = () => {
    dispatch(loginActions.login({email: 'abcde@gmail.com', password: '222222'}))
  }

  useEffect(() => {
    console.log(auth, 'auth')
  })

  return (
    <>
      <Modal showModal={showModal} handleBack={toggleModal} handleClose={toggleModal} height="80%">
        <div className={`${styles.backgroundContain} p-50 pt-0 h-80`}>
          <h2 className="my-32">{dict.login.title}</h2>
          <div className="mb-5">
            <label>{dict.login.label}</label>
          </div>
          <form action="">
            <div className="my-10">
              <InputNormal />
            </div>
            <div>
              <InputPassword />
            </div>
          </form>
          <Link className="d-block pt-15 font-14" href="">
            {dict.login.forgot_password}
          </Link>
          <button onClick={handleLogin}>login</button>
          <NormalButton
            label={dict.login.button_submit}
            type="submit"
            className="w-100 my-30"
          />
          <div className={styles.redirectRegister}>
            {dict.login.have_not_account}{" "}
            <Link className="p-5" href={ROUTER.REGISTER}>
              {dict.register.button_submit}
            </Link>
          </div>
        </div>
      </Modal>
    </>
  );
}
