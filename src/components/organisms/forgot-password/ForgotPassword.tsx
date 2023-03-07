/* eslint-disable no-unused-vars */
"use client";

import React, { useState, useCallback, useEffect } from "react";
import InputNormal from "@/components/atoms/form/inputs/input-normal/InputNormal";
import styles from "./ForgotPassword.module.scss";
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
import {
  minLength,
  required,
  validateEmail,
  validatePassword,
} from "@/utils/validate";
import InputPassword from "@/components/atoms/form/inputs/input-password/InputPassword";
import forgotPasswordActions from "@/actions/forgotPassword";

export default function ForgotPasswordForm() {
  const [showModal, setShowModal] = useState(true);
  const [userInfo, setUserInfo] = useImmer({ email: "", newPassword: "" });
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

  const valEmail = () => {
    if (!required(userInfo.email)) {
      setErrEmail((draft) => {
        (draft.hasError = true),
          (draft.message = t("common.validate.error.email_require"));
      });
    } else if (!validateEmail(userInfo.email)) {
      setErrEmail((draft) => {
        (draft.hasError = true),
          (draft.message = t("common.validate.error.email_validate"));
      });
    }
  };

  const valPassword = () => {
    if (!required(userInfo.newPassword)) {
      setErrPassword((draft) => {
        (draft.hasError = true),
          (draft.message = t("common.validate.error.password_require"));
      });
    } else if (!validatePassword(userInfo.newPassword)) {
      setErrPassword((draft) => {
        (draft.hasError = true),
          (draft.message = t("common.validate.error.password_validate"));
      });
    }
  };

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    valEmail();
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
    dispatch(forgotPasswordActions.forgotPassword(userInfo));
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
          <h2 className="my-32">{t("forgot_password.title")}</h2>
          <div className="mb-5">
            <label>{t("forgot_password.label")}</label>
          </div>
          <form action="">
            <div className="mt-10 mb-5">
              <InputNormal
                name="email"
                onBlur={handleBlur}
                onChange={handleChangeInfo}
                placeholder={t("common.placeholder.username_email")}
              />
            </div>
            <Message
              className="mb-5"
              hasError={errEmail.hasError}
              text={errEmail.message}
            />
            <div className="my-10">
              <InputPassword
                name="newPassword"
                onChange={handleChangeInfo}
                onBlur={handleBlur}
                placeholder={t("common.placeholder.password")}
              />
            </div>
            <Message
              className="mb-5"
              hasError={errPassword.hasError}
              text={errPassword.message}
            />
          </form>
          <NormalButton
            label={t("forgot_password.button_submit")}
            type="submit"
            className="w-100 my-30"
            handleClick={handleClick}
          />
          <div className={styles.redirectRegister}>
            {t("forgot_password.have_not_account")}{" "}
            <Link className="p-5" href={ROUTER.REGISTER}>
              {t("register.button_submit")}
            </Link>
          </div>
        </div>
      </Modal>
    </>
  );
}
