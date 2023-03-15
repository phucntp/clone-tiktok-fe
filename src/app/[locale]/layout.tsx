import React from "react";
import "./globals.scss";
import "@/styles/main.scss";
import { NextIntlClientProvider } from "next-intl/client";
import { Providers } from "./Providers";
import Loading from "@/components/molecules/ui/Loading/Loading";

type Props = {
  children: React.ReactNode;
  params: {
    locale: string;
  };
};

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "vi" }];
}

export default async function RootLayout({
  children,
  params: { locale },
}: Props) {
  let messages;
  try {
    messages = (await import(`@/lang/${locale}.json`)).default;
  } catch (error) {
    console.log(error);
  }
  return (
    <html lang={`${locale}`}>
      <head />
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
            {children}
            <Loading />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
