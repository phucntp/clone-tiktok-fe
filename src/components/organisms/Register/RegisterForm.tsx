"use client";

import React, { useState, useCallback } from "react";
import InputNormal from "@/components/atoms/form/inputs/InputNormal";
import InputPassword from "@/components/atoms/form/inputs/InputPassword";
import styles from "./RegisterForm.module.scss";
import Modal from "@/components/molecules/Modal/Modal";
import NormalButton from "@/components/atoms/buttons/NormalButton";
import Link from "next/link";
import { ROUTER } from "@/routers/routers";
import Birthday from "@/components/molecules/SelectDate/Birthday";
import {useTranslations} from 'next-intl';

export default function LoginForm() {
  const [showModal, setShowModal] = useState(true);
  const t = useTranslations('login');
  const tRegister = useTranslations('register');

  const toggleModal = useCallback(() => {
    setShowModal((prev) => !prev);
  }, []);

  return (
    <>
      <Modal
        showModal={showModal}
        handleBack={toggleModal}
        handleClose={toggleModal}
        height="80%"
      >
        <div className={`${styles.backgroundContain} p-50 pt-0 h-80`}>
          <h2 className="my-32">{tRegister('title')}</h2>
          <Birthday />
          <div className="mb-5">
            <label>{tRegister('label')}</label>
          </div>
          <form action="">
            <div className="my-10">
              <InputNormal />
            </div>
            <div>
              <InputPassword />
            </div>
          </form>
          <NormalButton
            label={tRegister('next')}
            type="submit"
            className="w-100 my-30"
          />
          <div className={styles.redirectLogin}>
            {tRegister('have_an_account')}{" "}
            <Link className="p-5" href={ROUTER.REGISTER}>
              {t('button_submit')}
            </Link>
          </div>
        </div>
      </Modal>
    </>
  );
}
