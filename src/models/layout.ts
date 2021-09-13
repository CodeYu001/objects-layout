import { Effect, Reducer } from 'umi';
import NProgress from 'nprogress';
import {
  GetClassify,
  GetContactText,
  GetContactEmail,
  GetFooter,
} from '@/services/layout';

interface ModelProps {
  namespace: string;
  state: {
    classify: [];
    contact: object;
    footer: string;
  };
  effects: {
    fetchClassify?: Effect;
    fetchContact?: Effect;
    fetchFooter?: Effect;
  };
  reducers: {
    save: Reducer;
  };
}

const Model: ModelProps = {
  namespace: 'layout',
  state: {
    classify: [],
    contact: { text: '', email: '' },
    footer: '',
  },
  effects: {
    *fetchClassify(_, { call, put }) {
      const res = yield call(GetClassify);
      // NProgress.done();
      yield put({
        type: 'save',
        payload: {
          classify: res.data,
        },
      });
    },
    *fetchContact(_, { call, put }) {
      NProgress.start();
      const res1 = yield call(GetContactText);
      const res2 = yield call(GetContactEmail);
      yield put({
        type: 'save',
        payload: {
          contact: { text: res1.data.value, email: res2.data.value },
        },
      });
      NProgress.done();
    },
    *fetchFooter(_, { call, put }) {
      const res = yield call(GetFooter);
      // NProgress.done();
      yield put({
        type: 'save',
        payload: {
          footer: res.data,
        },
      });
    },
  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default Model;
