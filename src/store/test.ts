import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoggedInResponse, LoggedInUser } from '@/presentation/types';
import { pick } from 'shared/dist/lib/ramda';
import { updatedAt2updatedKey } from 'shared/dist/domain/shared/User';
import { chatService } from '@/application/services/chat';

type TAuthState = {
  isAuthenticated: boolean;
  user: LoggedInUser;
};

const initialUser: LoggedInUser = {
  id: '',
  ordererId: '',
  expertId: '',
  userType: 'unknown',
  firstName: '',
  lastName: '',
  profilePicture: '',
  deletedCauseCd: 'none',
  updatedKey: 0,
  isInfoFilled: false,
  isRegularMember: false,
  url: '',
};

const initialState: TAuthState = {
  isAuthenticated: false,
  user: { ...initialUser },
};

const _module = createSlice({
  name: '[auths/authentications]',
  initialState,
  reducers: {
    updateUserUpdatedKey(state: TAuthState, action: PayloadAction<{ profilePicture: string; updatedAt?: string }>) {
      return {
        ...state,
        user: {
          ...state.user,
          profilePicture: action.payload.profilePicture,
          updatedKey: updatedAt2updatedKey(action.payload.updatedAt),
        },
      };
    },
    login(state: TAuthState, action: PayloadAction<LoggedInResponse>) {
      chatService.init();
      return {
        ...state,
        isAuthenticated: true,
        user: {
          ...initialUser,
          ...pick(Object.keys(initialUser), action.payload),
        },
      };
    },
    setLoggedInResponse(state: TAuthState, action: PayloadAction<Partial<LoggedInResponse>>) {
      chatService.init();
      return {
        ...state,
        isAuthenticated: true,
        user: {
          ...initialUser,
          ...pick(Object.keys(initialUser), action.payload),
        },
      };
    },
    logout(state: TAuthState) {
      chatService.disconnect();
      return {
        ...state,
        ...initialState,
      };
    },
    setSelectUserId(state: TAuthState, action: PayloadAction<Pick<LoggedInUser, 'expertId' | 'ordererId'>>) {
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };
    },
  },
});

/**
 * NOTICE: loginのactionを検知し、動作するepicがあるので注意すること
 */
export const authenticationsModule = _module;
