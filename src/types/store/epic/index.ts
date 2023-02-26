/* eslint-disable no-unused-vars */
import { combineEpics, Epic } from 'redux-observable';
import { mergeMap, Observable } from 'rxjs';
import actionCreatorFactory, { Action, AnyAction } from 'typescript-fsa';
import { ofAction } from 'typescript-fsa-redux-observable-of-action';
import { isApiError, getError } from '@/types/errors';
import { omit } from 'ramda';

type TAnyActions<T = any> = Action<T> | Action<T>[];
type TResAnyActions<T = any> = (res: T) => TAnyActions<T>;
type TAsyncEpicProp = {
  asyncFunc: Observable<any>;
  previous?: TAnyActions;
  next?: TResAnyActions | TAnyActions;
  error?: TResAnyActions | TAnyActions;
  complete?: TAnyActions;
};
export type ActionParameter<T extends (...args: any[]) => any> = Parameters<T>[0];
export type WrapAction<T extends (...args: any[]) => any> = Action<ActionParameter<T>>;

const actionCreator = actionCreatorFactory('[types/store/epic/asyncActionWithCallback]');
const actions = {
  start: actionCreator<TAsyncEpicProp>('start'),
  _exec: actionCreator<Omit<TAsyncEpicProp, 'previous'>>('_exec'),
};
export const asyncActionWithCallback = actions.start;

const _toArray = <T>(v: T | T[]): T[] => (Array.isArray(v) ? v : [v]);
const asyncStart: Epic<AnyAction, Action<Pick<TAsyncEpicProp, 'previous'> | Omit<TAsyncEpicProp, 'previous'>>, any> = (
  action$,
  _,
) =>
  action$.pipe(
    ofAction(actions.start),
    mergeMap(({ payload }) => {
      console.log('ab', payload)
      const nextAction = actions._exec(omit(['previous'], payload));
      return payload.previous ? [..._toArray(payload.previous), nextAction] : [nextAction];
    }),
  );

const _next10error = (action: TResAnyActions<any> | TAnyActions | undefined, param: any): Action<any>[] =>
  // eslint-disable-next-line no-nested-ternary
  !action
    ? []
    : typeof action === 'function' && param
    ? ([action(param)].flat() as Action<
        any
      >[])
    : ([action].flat() as Action<any>[]);

const asyncExec: Epic<AnyAction, Action<any>, any> = (action$, _) =>
  action$.pipe(
    ofAction(actions._exec),
    mergeMap(({ payload }) => {
      console.log(payload, 'abcf')
      const complete: Action<any>[] = payload.complete ? [payload.complete].flat() : [];
      return payload.asyncFunc.toPromise().then(
        (res): Action<any>[] => {
          return [..._next10error(payload.next, res), ...complete]
        },
        (err): Action<any>[] => [..._next10error(payload.error, err), ...complete],
      );
    }),
    mergeMap((acs) => [...acs]),
  );
export const commonAsyncEpics = combineEpics(asyncStart, asyncExec);