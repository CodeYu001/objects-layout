import React, { FC, useEffect } from 'react';
import myUtils, { bindDvaProps } from '@/utils/utils';
import { Divider } from 'antd';

declare type props = bindDvaProps;

const fetchStr = 'layout/fetchFooter';

const page: FC<props> = ({ dispatch, theModel, loadings }) => {
  useEffect(() => {
    dispatch({ type: 'layout/fetchFooter' });
  }, []);
  return (
    <>
      {!loadings[fetchStr] && theModel['footer'] && (
        <div style={{ marginTop: 3 }}>
          <div dangerouslySetInnerHTML={{ __html: theModel['footer'].value }} />
        </div>
      )}
    </>
  );
};

export default myUtils.bindDva('layout', page);
