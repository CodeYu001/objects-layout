import React, { useEffect, FC } from 'react';
import { Card, Divider } from 'antd';
import myUtils, { bindDvaProps } from '@/utils/utils';

const page: FC<bindDvaProps> = ({
  loadings,
  dispatch,
  theModel: { contact },
}) => {
  const fetchStr = 'layout/fetchContact';

  useEffect(() => {
    dispatch({ type: fetchStr });
  }, []);

  return (
    <>
      <h1 style={{ textIndent: '.5cm' }}>聯絡</h1>
      <Card loading={loadings[fetchStr]}>
        {contact.text}
        <Divider dashed />
        電子郵箱 📮：
        <a href={`mailto:${contact.email}`}>
          <b>{contact.email}</b>
        </a>
      </Card>
    </>
  );
};
export default myUtils.bindDva('layout', page);
