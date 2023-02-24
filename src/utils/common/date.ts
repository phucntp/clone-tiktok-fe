/* eslint-disable no-unused-vars */
import { TSelectBox } from "../../types/common/form";
export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "Octorber",
  "November",
  "December",
];

export const days = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31,
];

export const listOptionMonth: TSelectBox[] = months.map(
  (item, index): TSelectBox => {
    return {
      label: item,
      value: String(index + 1),
    };
  }
);

export const listOptionDay: TSelectBox[] = days.map(
  (item): TSelectBox => {
    return {
      label: String(item),
      value: String(item),
    };
  }
);
