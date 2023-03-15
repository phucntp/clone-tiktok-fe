import React from "react";
import Object from "@/components/molecules/layouts/object/Object";
import Menu from "@/components/atoms/icons/IconMenu";
import ButtonSearch from "@/components/atoms/buttons/ButtonSearch";
import styles from "./Header.module.scss";

type TProps = {
  openSideMenu?: () => void;
};

function HeaderSP({ openSideMenu = () => {} }: TProps) {
  return (
    <div className={styles.headerContainer}>
      <Menu openSideMenu={openSideMenu} className="w-32-px h-32-px" />
      <Object className="d-flex justify-center" showIcon={false} />
      <ButtonSearch className="background-none border-none" color="#fff" />
    </div>
  );
}

export default HeaderSP;
