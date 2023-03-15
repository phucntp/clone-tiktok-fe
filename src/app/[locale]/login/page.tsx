/* eslint-disable no-unused-vars */
"use client";

// import Loading from "@/components/molecules/ui/Loading/Loading";
import React, { lazy, Suspense } from "react";
import LoginForm from "@/components/organisms/login/LoginForm";

// function delayForDemo(promise: any) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, 10000);
//   }).then(() => promise);
// }
// const LoginForm = lazy(() =>
//   delayForDemo(import("@/components/organisms/login/LoginForm"))
// );

type Props = {
  params: {
    locale: string;
  };
};

const page = ({ params: { locale } }: Props) => {
  return (
    <html lang={`${locale}`}>
      <head />
      <body>
        {/* <Suspense fallback={<Loading />}> */}
        <LoginForm />
        {/* </Suspense> */}
      </body>
    </html>
  );
};

export default page;
