import React, { useState, useCallback, useEffect } from "react";
import SelectBox from "@/components/atoms/form/select-box/SelectBox";
import { listOptionMonth, listOptionDay } from "@/utils/common/date";
import styles from './Birthday.module.scss'
import { useImmer } from "use-immer";

function Birthday() {
  const [birthday, setBirthday] = useImmer({
    day: "",
    month: "",
    year: "",
  });

  const changeMonth = ((value: string) => {
    setBirthday((draft) => {
      draft.month = listOptionMonth[parseInt(value)].label
    });
  });

  const changeDay = ((event: React.ChangeEvent<HTMLSelectElement>) => {
    setBirthday((draft) => {
      draft.day = listOptionDay[parseInt(event.target.value)].label
    });
  });

  const changeYear = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBirthday((draft) => {
      draft.year = listOptionMonth[parseInt(event.target.value)].label
    }
    );
  };

  return (
    <div className={styles.birthdayContainer}>
      <div className={styles.selectItem}>
        <SelectBox
          valueSelect={birthday.month}
          listOption={listOptionMonth}
          handleChange={changeMonth}
        />
      </div>
      <div className={styles.selectItem}>
        <SelectBox
          valueSelect={birthday.day}
          listOption={listOptionDay}
          handleChange={changeDay}
        />
      </div>
      <div className={styles.selectItem}>
        <SelectBox
          valueSelect={birthday.year}
          listOption={listOptionMonth}
          handleChange={changeYear}
        />
      </div>
    </div>
  );
}

export default Birthday;
