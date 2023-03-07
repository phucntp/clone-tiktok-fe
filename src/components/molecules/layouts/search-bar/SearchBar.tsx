import React from "react";
import InputNormal from "@/components/atoms/form/inputs/input-normal/InputNormal";
import styles from "./SearchBar.module.scss";
import ButtonSearch from "@/components/atoms/buttons/ButtonSearch";

const SearchBar = () => {
  return (
    <form className={styles.searchBarContainer}>
      <InputNormal className={styles.inputSearch} />
      <span className={styles.spanBorder}></span>
      <ButtonSearch className={`${styles.buttonSearch} h-40-px border-none`} />
    </form>
  );
};

export default SearchBar;
