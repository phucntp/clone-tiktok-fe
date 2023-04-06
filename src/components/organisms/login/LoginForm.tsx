/* eslint-disable no-unused-vars */
"use client";

import React, { useState, useCallback, useEffect } from "react";
import InputNormal from "@/components/atoms/form/inputs/input-normal/InputNormal";
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
import { minLength, required, validateEmail, validatePassword } from "@/utils/validate";
import InputPassword from "@/components/atoms/form/inputs/input-password/InputPassword";

export default function LoginForm() {
  const [showModal, setShowModal] = useState(true);
  const [userInfo, setUserInfo] = useImmer({ email: "", password: "" });
  const [errEmail, setErrEmail] = useImmer({ hasError: false, message: "" });
  const [errPassword, setErrPassword] = useImmer({
    hasError: false,
    message: "",
  });

  const dispatch = useDispatch();
  const {isLoading} = useSelector((state: AppState) => state.uiReducers.loadingReducer)
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

  const validateEmailLogin = () => {
    if (!required(userInfo.email)) {
      setErrEmail((draft) => {
        (draft.hasError = true),
          (draft.message = t("common.validate.error.username_email_require"));
      });
    } else if (!minLength(userInfo.email, 6)) {
      setErrEmail((draft) => {
        (draft.hasError = true),
          (draft.message = t("common.validate.error.min_length", {
            length: 6,
          }));
      });
    }
  };

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
    validateEmailLogin();
    valPassword();
  };

  const handleClick = useCallback(async () => {
    dispatch(loginActions.login({
      username: !validateEmail(userInfo.email) ? userInfo.email : undefined,
      password: userInfo.password,
      email: validateEmail(userInfo.email) ? userInfo.email : undefined
    }));
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
                name="password"
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
