import actionCreatorFactory from 'typescript-fsa';

const ac = actionCreatorFactory('[error]');
export const errorActions = {
  throwError: ac<any>('throwError'),
  clearError: ac<void>('clearError'),
};
