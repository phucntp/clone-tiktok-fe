
import React from "react";
import RegisterForm from "@/components/organisms/Register/RegisterForm";
import { getDictionary } from "@/configuration/dictionaries";
import { defaultLang } from "@/utils/common/constant";

const page = async () => {
  const dict: Awaited<ReturnType<typeof getDictionary>> = await getDictionary(
    defaultLang
  );

  return (
    <>
      <RegisterForm dict={dict} />
    </>
  );
};

export default page;
