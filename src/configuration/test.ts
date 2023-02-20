import { AxiosRequestConfigWithFns } from 'shared/dist/lib/axios';

const CREDENTIAL_KEY = 'withCredentials';

export const ApiServerConfig: AxiosRequestConfigWithFns = {
  // MEMO: 'npm run start'の場合、
  // package.jsonでproxyに 'http://localhost:4000' を指定しているので、'/api/v1'のみでOK
  baseURL: '/api/v1',
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'x-csrftoken',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    [CREDENTIAL_KEY]: true,
  },
};
import { match } from 'shared/dist/lib/utils/match';

export const isProduction = process.env.NODE_ENV === 'production' || process.env.REACT_APP_NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development' || process.env.REACT_APP_NODE_ENV === 'development';

const NIKKEI_URL_ORIGIN =
  process.env.REACT_APP_CONFIG_ENV === 'production' ? 'https://id.nikkei.com' : 'https://id.dev-ext.nikkei.com';

const GTM_ID = process.env.REACT_APP_GTM_ID ?? '';
const GTM_AUTH = process.env.REACT_APP_GTM_AUTH ?? '';
const GTM_PREVIEW = process.env.REACT_APP_GTM_PREVIEW ?? '';

export const config = {
  isProduction,
  isDevelopment,
  isLocalhost: !isProduction,
  NIKKEI_URL_ORIGIN,
  GTM_ID,
  GTM_AUTH,
  GTM_PREVIEW,
};

/**
 * get env name
 * @param v is current env
 * @return TEnvtypes
 */
type TEnvtypes = 'local' | 'development' | 'staging' | 'production';
export const getEnvName = (envType: string | undefined): TEnvtypes =>
  match<TEnvtypes, string | undefined>(
    [
      [(v: string | undefined) => v === 'production', 'production'],
      [(v: string | undefined) => v === 'staging', 'staging'],
      [(v: string | undefined) => v === 'development', 'development'],
      [match._, 'local'],
    ],
    envType,
  ) || 'local';

// 環境による表示・非表示をENVで判別。本番環境以外の場合はtrueを返し、本番環境はfalseを返す。
export const isNotShowPrd: boolean = getEnvName(process.env.REACT_APP_CONFIG_ENV) !== 'production';

export const getOtherPrdEnvName = [getEnvName(process.env.REACT_APP_CONFIG_ENV)].filter((v) => v !== 'production');

