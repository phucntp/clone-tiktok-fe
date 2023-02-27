
import React from "react";
import LoginForm from "@/components/organisms/Login/LoginForm";

type Props = {
  params: {
    locale: string;
  };
};

const page = ({params: { locale }} : Props) => {
  return (
    <html lang={`${locale}`}>
      <head />
      <body>
      <LoginForm />
      </body>
    </html>
  );
};

export default page;
