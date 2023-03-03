import React, { useCallback } from "react";
import SelectBox from "@/components/atoms/form/select-box/SelectBox";
import { listOptionMonth, listOptionDay, currentDate, listOptionYear } from "@/utils/common/date";
import styles from './Birthday.module.scss'
import { useImmer } from "use-immer";

function Birthday() {
  const [birthday, setBirthday] = useImmer({
    day: currentDate.day,
    month: currentDate.month,
    year: currentDate.year,
  });


  const changeDate = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setBirthday((draft: any) => {
      draft[e.target.name] = e.target.value
    });
  }, [setBirthday])

  return (
    <div className={styles.birthdayContainer}>
      <div className={styles.selectItem}>
        <SelectBox
          name="month"
          valueSelect={birthday.month}
          listOption={listOptionMonth}
          onChange={changeDate}
        />
      </div>
      <div className={styles.selectItem}>
        <SelectBox
          name="day"
          valueSelect={birthday.day}
          listOption={listOptionDay}
          onChange={changeDate}
        />
      </div>
      <div className={styles.selectItem}>
        <SelectBox
          name="year"
          valueSelect={birthday.year}
          listOption={listOptionYear()}
          onChange={changeDate}
        />
      </div>
    </div>
  );
}

export default Birthday;
