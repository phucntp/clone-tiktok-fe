/* eslint-disable no-unused-vars */
"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import InputNormal from "@/components/atoms/form/inputs/input-normal/InputNormal";
import styles from "./RegisterForm.module.scss";
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
  maxLength,
  minLength,
  required,
  validatePassword,
  validateEmail,
} from "@/utils/validate";
import Birthday from "@/components/molecules/select-date/Birthday";
import InputPassword from "@/components/atoms/form/inputs/input-password/InputPassword";
import registerActions from "@/actions/register";

export default function RegisterForm() {
  const [showModal, setShowModal] = useState(true);
  const [userInfo, setUserInfo] = useImmer({
    email: "",
    password: "",
    username: "",
    birthday: "",
  });
  const [errUsername, setErrUsername] = useImmer({
    hasError: false,
    message: "",
  });
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
    setErrUsername((draft) => {
      (draft.hasError = false), (draft.message = "");
    });
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

  const valUsername = () => {
    if (!required(userInfo.username)) {
      setErrUsername((draft) => {
        (draft.hasError = true),
          (draft.message = t("common.validate.error.username_require"));
      });
    } else if (!maxLength(userInfo.username, 20)) {
      setErrUsername((draft) => {
        (draft.hasError = true),
          (draft.message = t("common.validate.error.max_length", {
            length: 20,
          }));
      });
    } else if (!minLength(userInfo.username, 6)) {
      setErrUsername((draft) => {
        (draft.hasError = true),
          (draft.message = t("common.validate.error.min_length", {
            length: 6,
          }));
      });
    }
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
    valUsername();
    valEmail();
    valPassword();
  };

  const handleBirthDay = useCallback(
    (value: string) => {
      setUserInfo((draft) => {
        draft.birthday = value;
      });
    },
    [setUserInfo]
  );

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
    dispatch(registerActions.register(userInfo));
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
          <h2 className="my-32">{t("register.title")}</h2>
          <div className="mb-5">
            <label>{t("register.label")}</label>
          </div>
          <Birthday onChange={handleBirthDay} />
          <form action="">
            <div className="mt-10 mb-5">
              <InputNormal
                name="username"
                onBlur={handleBlur}
                onChange={handleChangeInfo}
                placeholder={t("common.placeholder.username")}
              />
            </div>
            <Message
              className="mb-5"
              hasError={errUsername.hasError}
              text={errUsername.message}
            />
            <div className="mt-10 mb-5">
              <InputNormal
                name="email"
                onBlur={handleBlur}
                onChange={handleChangeInfo}
                placeholder={t("common.placeholder.email")}
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
          <NormalButton
            label={t("register.next")}
            type="submit"
            className="w-100 my-30"
            handleClick={handleClick}
          />
          <div className={styles.redirectLogin}>
            {t("register.have_an_account")}
            <Link className="p-5" href={ROUTER.LOGIN}>
              {t("login.button_submit")}
            </Link>
          </div>
        </div>
      </Modal>
    </>
  );
}
