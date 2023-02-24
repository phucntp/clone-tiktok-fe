// MEMO: まとめて書きたいのでルールを切った
// eslint-disable-next-line max-classes-per-file
import { AxiosError } from 'axios';
import { ERROR_MESSAGE, UNKNOWN_ERROR_MESSAGE } from '@/utils/errors';
import prop from 'ramda/src/prop';

export type ErrorCode = keyof typeof ERROR_MESSAGE | 'unknown';
export type TError = {
  name: string;
  message: string;
  code?: ErrorCode;
};
type TOption = {
  code?: string;
  message?: string;
  url?: string;
};

/**
 * nameに「 4xx,」や「 5xx,」が含まれている場合、それ用のメッセージを返す。
 * Sentryでの調査を簡単にするのが目的
 * @param errorName getErrorで返却しているname
 */
export const convertUnknownError = (errorName: string): string => {
  if (/\s5\d{2},/.test(errorName)) {
    return UNKNOWN_ERROR_MESSAGE['500'];
  }
  if (/\s4\d{2},/.test(errorName)) {
    return UNKNOWN_ERROR_MESSAGE['400'];
  }
  return UNKNOWN_ERROR_MESSAGE['default'];
};

export const isErrorCode = (v: any): v is ErrorCode =>
  typeof v === 'string' && (v === 'unknown' || Object.keys(ERROR_MESSAGE).includes(v));
export const isTError = (v: any): v is TError =>
  typeof v.name === 'string' && typeof v.message === 'string' && (typeof v.code === 'undefined' || isErrorCode(v.code));

export class BaseError extends Error implements TError {
  constructor(err: any) {
    super(err?.message || 'Unknown System Error.');
    this.className = 'baseError';
    this.code = undefined;
    this.name = 'baseError';
  }

  public code?: ErrorCode;

  public className: string;
}

// FIXME: 以下はlib/axiosに移動したい
const isAxiosError = (v: any): v is AxiosError => typeof v.isAxiosError === 'boolean';
export const isConnectError = (v: any): v is Error => v.code === 'ENOTFOUND' || v.code === 'ECONNREFUSED';
export const isTimeoutError = (v: any): v is Error => v.code === 'ECONNABORTED' && /timeout/i.test(v.message);
export const isApiError = (v: any): v is ApiError => typeof v.className !== 'undefined' && v.className === 'ApiError';
export const isAbortedErrorMsg = (message: string) => /aborted/i.test(message);
export const isAbortedError = (v: any): v is Error => v.code === 'ECONNABORTED' && isAbortedErrorMsg(v.message);
const COMMON_API_ERROR = {
  name: 'apiError',
  code: 'unknown' as ErrorCode,
  message: 'Unknown ApiError Error.',
};
export const getError = (v: any, option?: TOption): TError => {
  const code = isErrorCode(prop('code', v)) ? v.code : COMMON_API_ERROR.code;
  const name = option ? `code: ${option.code}, message: ${option.message}, url: ${option.url}` : COMMON_API_ERROR.name;
  return {
    code,
    name: prop('name', v) ?? name,
    message: code !== 'unknown' ? prop(code, ERROR_MESSAGE) : prop('message', v) || COMMON_API_ERROR.message,
  };
};
export class ApiError extends BaseError {
  constructor(param1: number | any, param2?: Partial<TError>) {
    if (typeof param1 === 'number') {
      super(param2?.message);
      this.statusCode = param1;
      const errorInfo = getError(param2);
      this.name = errorInfo.name;
      this.message = errorInfo.message;
      this.code = errorInfo.code;
    } else {
      super(param1);
      this.statusCode = 500;
    }
    this.className = 'ApiError';
    if (isConnectError(param1)) {
      this.statusCode = 500;
      const errorInfo = getError({ code: 'B0030' });
      this.name = errorInfo.name;
      this.message = errorInfo.message;
      this.code = errorInfo.code;
    } else if (isAbortedError(param1)) {
      // set 200 when the error is aborted error
      this.statusCode = 200;
      const errorInfo = getError({ message: param1.message ?? 'AbortedError' });
      this.name = errorInfo.name;
      this.message = 'Request aborted';
      this.code = errorInfo.code;
    } else if (isTimeoutError(param1)) {
      this.statusCode = 500;
      const errorInfo = getError({ code: 'B0031' });
      this.name = errorInfo.name;
      this.message = errorInfo.message;
      this.code = errorInfo.code;
    } else if (isAxiosError(param1)) {
      const errorInfo = getError(param1.response?.data, {
        code: param1.code,
        message: param1.message,
        url: param1.config?.url,
      });
      this.statusCode = param1.response?.status || 500;
      this.name = errorInfo.name;
      this.message = errorInfo.message;
      this.code = errorInfo.code;
    }
  }

  public readonly statusCode: number;
}
