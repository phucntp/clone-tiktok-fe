import { TCredential, LoggedInResponse, LogoutResponse } from '@/presentation/types';
import { ApiError } from 'shared/dist/lib/types/error';
import { UserType, TRedirectLoggedInActionCode, TokenType, ETokenType } from 'shared/dist/domain/shared';
import { Logger } from '@/di';
import { Expert } from 'shared/dist/domain/models/expert';
import { Orderer } from 'shared/dist/domain/models/orderer';
import { authRepositories } from '../../../repositories/auth';
import { JWT2StateUrl } from '../../../presentation/helpers';

const INITIAL_LOGGED_IN_RESPONSE: LoggedInResponse = {
  id: '',
  ordererId: '',
  expertId: '',
  firstName: '',
  lastName: '',
  userType: 'unknown',
  profilePicture: '',
  deletedCauseCd: 'none', // 'none', 'withdrawal', 'forcedCancel', 'accountFreeze'
  updatedKey: 0,
  isInfoFilled: false,
  isRegularMember: false,
  url: '',
};

type PropBody = { body: any };
const isAny = (x: unknown): x is any => typeof x === 'object' && x !== null;
const hasBodyProp = (x: unknown): x is PropBody => isAny(x) && x.body !== 'undefined';

/**
 * CAUTION：
 * This function is a tentative implementation,
 * so please never refer to the implementation.
 */
const loginDummy = async (credential: TCredential) => {
  const res = await authRepositories.loginDummy({
    id: [credential.id, credential.userType].join('&_SEPARATER_&'),
  });
  if (res instanceof Error) {
    throw res;
  }
  if (!res.result || !hasBodyProp(res)) {
    throw new ApiError(403, { code: 'E0002' });
  }
  return { ...INITIAL_LOGGED_IN_RESPONSE, ...res.body };
};

const INITIAL_LOGOUT_RESPONSE: LogoutResponse = {
  result: true,
  sessionId: '',
  nidLogoutUrl: '',
};

const logout = async () => {
  const res = await authRepositories.logout({
    condition: {},
    body: {},
  });

  if (res instanceof Error) {
    throw res;
  }
  return { ...INITIAL_LOGOUT_RESPONSE, ...res };
};

const loginAuto = async () => {
  const res = await authRepositories.loginAuto({});
  if (res instanceof Error) {
    throw res;
  }
  if (!res.result) {
    throw new ApiError(403, { code: 'E0002' });
  }
  return { ...INITIAL_LOGGED_IN_RESPONSE, ...res.body };
};

const selectLoggedInUser = async (id: string, userType: UserType) => {
  const res = await authRepositories.selectLogin({
    body: { id, userType },
  });
  if (res instanceof Error) {
    throw res;
  }
  if (!res.result) {
    throw new ApiError(403, { code: 'E0002' });
  }
  return { ...INITIAL_LOGGED_IN_RESPONSE, ...res.body };
};

// FIXME: Don't imitate
type TLoginNikkeiResponse = LoggedInResponse & {
  expert?: Expert;
  orderer?: Orderer;
  nextAction: TokenType;
  url?: string;
};

const loginNikkei = async (params: {
  nikkeiAuthorizationCode: string;
  redirectLoggedInActionCode: TRedirectLoggedInActionCode;
  url?: string;
}) => {
  const { nikkeiAuthorizationCode, redirectLoggedInActionCode, url } = params;
  const { urlRedirect } = await JWT2StateUrl(url ?? '');
  const res: any = await authRepositories.loginNikkei({
    body: { nikkeiAuthorizationCode, redirectLoggedInActionCode },
  });
  if (res instanceof Error) {
    throw res;
  }
  if (!res.result) {
    throw new ApiError(400, { code: 'E0002' });
  }
  Logger.log(res.body);
  return {
    ...INITIAL_LOGGED_IN_RESPONSE,
    nextAction: ETokenType.unknown,
    ...res.body,
    url: urlRedirect,
  } as TLoginNikkeiResponse;
};
const authVerify = async () => {
  const res = await authRepositories.authVerify({});

  if (res instanceof Error) {
    throw res;
  }
  return res.body;
};
const authVerifyLoginNikkei = async () => {
  const res = await authRepositories.authVerifyLoginNikkei({});

  if (res instanceof Error) {
    throw res;
  }
  return res.body;
};
export const authServices = {
  loginDummy,
  loginNikkei,
  logout,
  loginAuto,
  selectLoggedInUser,
  authVerify,
  authVerifyLoginNikkei,
};
