"use client";

import Logo from "@/components/atoms/images/logo/Logo";
import NormalLink from "@/components/atoms/links/NormalLink";
import { useTranslations } from "next-intl";
import React from "react";
import styles from "./Footer.module.scss";

const company = ["About", "Newsroom", "Contact", "Careers", "ByteDance"];
const programs = [
  "TikTok for good",
  "Advertise",
  "Developers",
  "TikTok Rewards",
  "TikTok Browse",
  "TikTok Embeds",
];
const support = [
  "Help Center",
  "Safety Center",
  "Creator Portal",
  "Community Guidelines",
  "Transparency",
  "Accessibility",
];
const legal = ["Terms of Use", "Privacy Policy"];

const Footer = () => {
  const t = useTranslations();
  return (
    <div className={styles.footerContainer}>
      <Logo />
      <div className={styles.footerContent}>
        <div>{t("layout.footer.company")}</div>
        {company.map((item, index) => (
          <NormalLink key={index} text={item} />
        ))}
      </div>
      <div className={styles.footerContent}>
        <div>{t("layout.footer.programs")}</div>
        {programs.map((item, index) => (
          <NormalLink key={index} text={item} />
        ))}
      </div>
      <div className={styles.footerContent}>
        <div>{t("layout.footer.support")}</div>
        {support.map((item, index) => (
          <NormalLink key={index} text={item} />
        ))}
      </div>
      <div className={styles.footerContent}>
        <div>{t("layout.footer.legal")}</div>
        {legal.map((item, index) => (
          <NormalLink key={index} text={item} />
        ))}
      </div>
    </div>
  );
};

export default Footer;
