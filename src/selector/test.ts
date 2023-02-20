import { createSelector } from '@reduxjs/toolkit';
import { match } from 'shared/dist/lib/utils';
import { isOrdererUser, isExpertUser } from 'shared/dist/domain/shared';
import { always } from 'shared/dist/lib/ramda';
import { AppState } from '../../../store';

const getFeatureState = (state: AppState) => state.auths.authentication;
const getLoggedId = (state: ReturnType<typeof getFeatureState>) =>
  match(
    [
      [isOrdererUser, always(state.user.ordererId)],
      [isExpertUser, always(state.user.expertId)],
    ],
    state.user.userType,
  ) || '';

export const authSelector = {
  isAuthenticated: createSelector(getFeatureState, (state) => state.isAuthenticated),
  loggedInId: createSelector(getFeatureState, getLoggedId),
  loggedInExpertId: createSelector(getFeatureState, (state) => state.user.expertId),
  loggedInOrdererId: createSelector(getFeatureState, (state) => state.user.ordererId),
  loggedInUserType: createSelector(getFeatureState, (state) => state.user.userType),
  loggedInUserFirstName: createSelector(getFeatureState, (state) => state.user.firstName),
  loggedInUserLastName: createSelector(getFeatureState, (state) => state.user.lastName),
  profileImage: createSelector(getFeatureState, (state) => state.user.profilePicture),
  updatedKey: createSelector(getFeatureState, (state) => state.user.updatedKey),
  isRegularMember: createSelector(getFeatureState, (state) => state.user.isRegularMember),
};
