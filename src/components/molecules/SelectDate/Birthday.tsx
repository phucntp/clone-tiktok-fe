import React, { useState, useCallback, useEffect } from "react";
import SelectBox from "@/components/atoms/form/select-box/SelectBox";
import { listOptionMonth, listOptionDay } from "@/types/date";

function Birthday() {
  const [birthday, setBirthday] = useState({
    day: "",
    month: "",
    year: "",
  });

  useEffect(() => {
    console.log(birthday);
  }, [birthday]);

  const changeMonth = useCallback((value: string): void => {
    setBirthday((prev) => {
      return {
        ...prev,
        month: listOptionMonth[parseInt(value)].label,
      };
    });
  }, []);

  const changeDay = useCallback((value: string): void => {
    setBirthday((prev) => {
      return {
        ...prev,
        day: listOptionDay[parseInt(value)].label,
      };
    });
  }, []);

  const changeYear = useCallback((value: string): void => {
    setBirthday((prev) => {
      return {
        ...prev,
        year: listOptionMonth[parseInt(value)].label,
      };
    });
  }, []);

  return (
    <div>
      <div>
        <SelectBox
          valueSelect={birthday.month}
          listOption={listOptionMonth}
          handleChange={changeMonth}
        />
      </div>
      <div>
        <SelectBox
          valueSelect={birthday.day}
          listOption={listOptionDay}
          handleChange={changeDay}
        />
      </div>
      <div>
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
