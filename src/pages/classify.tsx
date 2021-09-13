import React from 'react';
import PageList from '@/compents/pageList';
import { history } from 'umi';

export default ({ isSmall }: any) => (
  <PageList
    isSmall={isSmall}
    showNote
    pageChange={(p: any, searchKey: string, idclassify: number) =>
      history.push('/classify/' + idclassify + '/' + p)
    }
  />
);
