/* eslint-disable no-unused-vars */
import React, { useCallback, useState } from "react";
import { TSelectBox } from "@/types/common/form";

interface Props {
  listOption: TSelectBox[];
  valueSelect: string;
  name?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

function SelectBox({
  listOption,
  valueSelect,
  onChange = (value: string) => {},
  name = "",
  placeholder = "",
}: Props) {
  const [state, setState] = useState(valueSelect);
  const onChangeValue = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      onChange(event.target.value);
      setState(event.target.value);
    },
    [onChange]
  );
  return (
    <>
      <select
        name={name}
        className="normal-select"
        value={state}
        onChange={onChangeValue}
        placeholder={placeholder}
      >
        {listOption.length &&
          listOption.map((option, index) => (
            <option
              key={`${option.label}-${index}`}
              value={option.value.toString()}
            >
              {option.label}
            </option>
          ))}
      </select>
    </>
  );
}

export default SelectBox;
