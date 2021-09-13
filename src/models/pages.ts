import { Effect, Reducer } from 'umi';
import NProgress from 'nprogress';
import { GetTop, GetList, GetDetail } from '@/services/page';

interface pageProps {
  namespace: string;
  state: {
    data: any[];
    total: number;
    detail: object;
    current: number;
    top: any[];
  };
  effects: {
    fetchTop?: Effect;
    fetchList?: Effect;
    fetchDetail?: Effect;
  };
  reducers: {
    save: Reducer;
  };
}

const theModal: pageProps = {
  namespace: 'pages',
  state: {
    data: [],
    total: -1,
    detail: {},
    current: 1,
    top: [],
  },
  effects: {
    *fetchTop(_, { call, put }) {
      NProgress.start();
      const res = yield call(GetTop);
      NProgress.done();
      yield put({ type: 'save', payload: { top: res.data } });
    },
    *fetchList({ payload }, { call, put }) {
      NProgress.start();
      const res = yield call(GetList, payload);
      NProgress.done();
      yield put({
        type: 'save',
        payload: { data: res.data, total: res.total },
      });
    },
    *fetchDetail({ payload }, { call, put }) {
      NProgress.start();
      const res = yield call(GetDetail, payload);
      NProgress.done();
      yield put({ type: 'save', payload: { detail: res } });
    },
  },
  reducers: {
    save: (state, { payload }) => {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default theModal;
