/* eslint-disable no-unused-vars */
"use client";

import React, { useState, useCallback, useEffect } from "react";
import InputNormal from "@/components/atoms/form/inputs/InputNormal";
import styles from "./LoginForm.module.scss";
import Modal from "@/components/molecules/modal/Modal";
import NormalButton from "@/components/atoms/buttons/NormalButton";
import Link from "next/link";
import { ROUTER } from "@/routers/routers";
import loginActions from "@/actions/login";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "@/store";
import { useTranslations } from "next-intl";
import { useImmer } from "use-immer";
import Message from "@/components/atoms/form/message/Message";
import { maxLength, required, validatePassword } from "@/utils/validate";

export default function LoginForm() {
  const [showModal, setShowModal] = useState(true);
  const [userInfo, setUserInfo] = useImmer({ email: "", password: "" });
  const [errEmail, setErrEmail] = useImmer({ hasError: false, message: "" });
  const [errPassword, setErrPassword] = useImmer({
    hasError: false,
    message: "",
  });

  const dispatch = useDispatch();
  // const auth = useSelector((state: AppState) => state.loginReducer)
  const t = useTranslations();

  const toggleModal = useCallback(() => {
    setShowModal((prev) => !prev);
  }, []);

  const handleChangeInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrEmail((draft) => {
      (draft.hasError = false), (draft.message = "");
    });
    setErrPassword((draft) => {
      (draft.hasError = false), (draft.message = "");
    });
    setUserInfo((draft: any) => {
      draft[e.target.name] = e.target.value;
    });
  };

  const validateEmail = () => {
    if (!required(userInfo.email)) {
      setErrEmail((draft) => {
        (draft.hasError = true),
          (draft.message = t("common.validate.error.email_require"));
      });
    } else if (!maxLength(userInfo.email, 20)) {
      setErrEmail((draft) => {
        (draft.hasError = true),
          (draft.message = t("common.validate.error.max_length", {
            length: 20,
          }));
      });
    }
  }

  const valPassword = () => {
    if (!required(userInfo.password)) {
      setErrPassword((draft) => {
        (draft.hasError = true),
          (draft.message = t("common.validate.error.password_require"));
      });
    } else if (!validatePassword(userInfo.password)) {
      setErrPassword((draft) => {
        (draft.hasError = true),
          (draft.message = t("common.validate.error.password_validate"));
      });
    }
  };

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    validateEmail();
    valPassword();
  };

  const handleClick = useCallback(async () => {
    // const data = await fetch('http://localhost:9000/api/users/login', {
    //   method: 'POST',
    //   credentials: 'include',
    //   headers: {
    //     'Content-Type': 'application/json'
    //     // 'Content-Type': 'application/x-www-form-urlencoded',
    //   },
    //   body: JSON.stringify({email: "phuc@gmail.com", password: "1234567"})
    // })
    dispatch(loginActions.login(userInfo));
  }, [dispatch, userInfo]);
  return (
    <>
      <Modal
        showModal={showModal}
        handleBack={toggleModal}
        handleClose={toggleModal}
        height="90%"
      >
        <div className={`${styles.backgroundContain} p-50 pt-0 h-80`}>
          <h2 className="my-32">{t("login.title")}</h2>
          <div className="mb-5">
            <label>{t("login.label")}</label>
          </div>
          <form action="">
            <div className="mt-10 mb-5">
              <InputNormal
                name="email"
                onBlur={handleBlur}
                onChange={handleChangeInfo}
              />
            </div>
            <Message className="mb-5" hasError={errEmail.hasError} text={errEmail.message} />
            <div className="my-10">
              <InputNormal
                name="password"
                inputType="password"
                onChange={handleChangeInfo}
                onBlur={handleBlur}
              />
            </div>
            <Message
              className="mb-5"
              hasError={errPassword.hasError}
              text={errPassword.message}
            />
          </form>
          <Link className="d-block pt-15 font-14" href="">
            {t("login.forgot_password")}
          </Link>
          <NormalButton
            label={t("login.button_submit")}
            type="submit"
            className="w-100 my-30"
            handleClick={handleClick}
          />
          <div className={styles.redirectRegister}>
            {t("login.have_not_account")}{" "}
            <Link className="p-5" href={ROUTER.REGISTER}>
              {t("register.button_submit")}
            </Link>
          </div>
        </div>
      </Modal>
    </>
  );
}
