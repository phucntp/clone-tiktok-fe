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

export const defaultYear = [1900, 1901, 1902, 1903, 1904, 1905, 1906, 1907, 1908, 1909]

const date = new Date()

export const currentDate = {
  year: String(date.getFullYear() ?? 0),
  month: String(date.getMonth() + 1),
  day: String(date.getDate() ?? 0)
}
const yearList = []
for (let i = 1990; i < date.getFullYear() + 1; i++) {
  yearList.push(i)
}

export const convertList = (value: any[]) => {
  const list = value.map(
    (item): TSelectBox => {
      return {
        label: item,
        value: String(item),
      };
    }
  )
  return list
}

export const listOptionYear = (): TSelectBox[] => {
  const yearList: number[] = []
  for (let i = 1990; i < date.getFullYear() + 1; i++) {
    yearList.push(i)
  }
  return convertList(yearList)
}

export const listOptionMonth: TSelectBox[] = months.map(
  (item, index): TSelectBox => {
    return {
      label: item,
      value: String(index + 1),
    };
  }
);

export const listOptionDay: TSelectBox[] = convertList(days);
