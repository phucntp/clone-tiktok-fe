/* eslint-disable no-unused-vars */
import React, { useCallback } from "react";
import SelectBox from "@/components/atoms/form/select-box/SelectBox";
import {
  listOptionMonth,
  listOptionDay,
  currentDate,
  listOptionYear,
} from "@/utils/common/date";
import styles from "./Birthday.module.scss";
import { useImmer } from "use-immer";
import { useTranslations } from "next-intl";

type TProps = {
  onChange: (value: string) => void;
};

function Birthday({ onChange }: TProps) {
  const t = useTranslations();

  const [birthday, setBirthday] = useImmer({
    day: currentDate.day,
    month: currentDate.month,
    year: currentDate.year,
  });

  const changeDate = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setBirthday((draft: any) => {
        draft[e.target.name] = e.target.value;
      });
      onChange(birthday.day + "-" + birthday.month + "-" + birthday.year);
    },
    [birthday, onChange, setBirthday]
  );

  return (
    <div className={styles.birthdayContainer}>
      <div className={styles.selectItem}>
        <SelectBox
          name="month"
          valueSelect={birthday.month}
          listOption={listOptionMonth}
          // onChange={changeDate}
          placeholder={t("common.placeholder.month")}
        />
      </div>
      <div className={styles.selectItem}>
        <SelectBox
          name="day"
          valueSelect={birthday.day}
          listOption={listOptionDay}
          // onChange={changeDate}
          placeholder={t("common.placeholder.day")}
        />
      </div>
      <div className={styles.selectItem}>
        <SelectBox
          name="year"
          valueSelect={birthday.year}
          listOption={listOptionYear()}
          // onChange={changeDate}
          placeholder={t("common.placeholder.year")}
        />
      </div>
    </div>
  );
}

export default Birthday;
