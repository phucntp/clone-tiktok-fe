import React from "react";
import { TSelectBox } from "@/types/form";

interface Props {
  listOption: TSelectBox[];
  valueSelect: string;
  // eslint-disable-next-line no-unused-vars
  handleChange: (value: string) => void;
}

function SelectBox({ listOption, valueSelect, handleChange }: Props) {


  return (
    <>
      <select value={valueSelect} onChange={(e) => handleChange(e.target.value)}>
        {listOption.length &&
          listOption.map((option, index) => <option key={`${option.label}-${index}`} value={option.value.toString()}>{option.label}</option>)}
      </select>
    </>
  );
}

export default SelectBox;
