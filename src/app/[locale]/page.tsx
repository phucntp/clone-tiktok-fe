"use client";
import { useTranslations } from "next-intl";
import { LayoutHome } from "@/components/layouts/home/LayoutHome";

export default function Home() {
  const t = useTranslations("login");
  return (
    <LayoutHome>
      <main>{t("title")}</main>
    </LayoutHome>
  );
}
