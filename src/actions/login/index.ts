import actionCreatorFactory from 'typescript-fsa';
import { TParamLogin } from '@/types/login';

const ac = actionCreatorFactory('[login]');
const loginActions = {
  login: ac<TParamLogin>('login'),
};
export default loginActions;
