import actionCreatorFactory from 'typescript-fsa';
import { GetListParameter } from '@/application/services/incrementalLookupAggregation';

// actions
const ac = actionCreatorFactory('[events/ui/incrementalSearch]');
const actions = {
  /** incrementalSearchの候補に表示するデータを取得する */
  getLookupItems: ac<GetListParameter>('getLookupItems'),
  /** incrementalSearchの候補を初期化する */
  resetLookupItems: ac<void>('resetLookupItems'),
};
export const incrementalSearchEvents = actions;
