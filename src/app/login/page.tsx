
import React from "react";
import LoginForm from "@/components/organisms/Login/LoginForm";
import { getDictionary } from "@/configuration/dictionaries";
import { defaultLang } from "@/utils/constant";

const page = async () => {
  const dict: Awaited<ReturnType<typeof getDictionary>> = await getDictionary(
    defaultLang
  );

  return (
    <>
      <LoginForm dict={dict} />
    </>
  );
};

export default page;
