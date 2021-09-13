import React, { FC } from 'react';
import Top from '@/compents/top';
import PageList from '@/compents/pageList';
import myUtils from '@/utils/utils';
import { history } from 'umi';

const page: FC<{ isSmall: boolean }> = ({ isSmall }) => {
  const TopArea = myUtils.connectBaseDiv(
    false,
    isSmall,
  )(<Top isSmall={isSmall} />);

  return (
    <>
      <TopArea />
      <PageList
        isSmall={isSmall}
        pageChange={(e: any) => {
          history.push('/index/' + e);
        }}
      />
    </>
  );
};

export default page;
