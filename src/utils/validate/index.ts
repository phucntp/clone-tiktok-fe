/* eslint-disable no-unused-vars */
export const regxPattern = {
    alphabetAll: /^[A-zＡ-ｚ\\w]+/,
    alphabetHalfSize: /^[A-z\\w]+$/,
    phoneNumber: /^0\d{9,10}$/,
    email: /^[\w.+-]{1,64}@[a-z\d](?:[a-z\d-]{0,253}[a-z\d])?(?:\.[a-z\d](?:[a-z\d-]{0,253}[a-z\d])?)+$/,
    url: /^(https:[/][/]|http:[/][/])[a-zA-Z0-9\-\\.]+\.[a-zA-Z]{2,3}(:[a-zA-Z0-9]*)?\/?([a-zA-Z0-9\\-\\._\\?\\,\\'/\\\\+&amp;%\\$#\\=~])*$/,
    numberStr: /^\d+$/,
    postalCode: /^\d{3}-\d{4}$/,
    allWhitespaces: /^\s*$/,
} as const;


type TRegxPattern = typeof regxPattern[keyof typeof regxPattern];
export const isNull = (val: unknown): boolean => val === undefined || val === null || val === '';
export const isMatch = (val: string, pattern: TRegxPattern): boolean => new RegExp(pattern).test(val);

export const maxLength = (val: string, length: number) : boolean => !isNull(val) && val.length <= length
export const minLength = (val: string, length: number) : boolean => !isNull(val) && val.length >= length

export const required = (val: unknown): boolean =>
  !(
    isNull(val) ||
    val === '' ||
    (Array.isArray(val) && val.length === 0) ||
    (typeof val === 'string' && isMatch(val, regxPattern.allWhitespaces))
  );