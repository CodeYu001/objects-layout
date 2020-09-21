import { GetFooterLinks } from '@/services/layout';

export default {
  namespace: 'layout',
  state: {
    footers: [],
  },
  effects: {
    *fetch(_: any, { call, put }: any) {
      const res = yield call(GetFooterLinks);
      yield put({ type: 'save', payload: { footers: res.data } });
    },
  },
  reducers: {
    save: (state: any, { payload }: any) => {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
