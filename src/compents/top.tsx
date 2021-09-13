import React, { FC, useEffect } from 'react';
import myUtils, { bindDvaProps } from '@/utils/utils';
import { Card } from 'antd';
import { history } from 'umi';

declare type props = { isSmall: boolean } & bindDvaProps;

const gridStyle: any = {
  width: '50%',
  textAlign: 'center',
  height: '200px',
  color: '#fff',
  fontSize: '20px',
  lineHeight: '200px',
};

const page: FC<props> = ({
  isSmall,
  dispatch,
  theModel: { top },
  loadings,
}) => {
  const fetchStr = `pages/fetchTop`;

  useEffect(() => {
    dispatch({ type: fetchStr });
  }, []);

  if (isSmall) return <></>;
  else if (top.length == 0) return <></>;
  else
    return (
      <Card loading={loadings[fetchStr]}>
        {top.map((item: any, index: number) => (
          <Card.Grid
            style={{
              ...gridStyle,
              background: `url(${item.background}) no-repeat`,
              objectFit: 'cover',
              backgroundSize: '100%',
            }}
            hoverable={false}
            key={index}
          >
            <div
              style={{ width: '100%', height: '100%', cursor: 'pointer' }}
              onClick={() => {
                if (item.target) window.open(item.url);
                else history.push(item.url);
              }}
            ></div>
          </Card.Grid>
        ))}
      </Card>
    );
};

export default myUtils.bindDva('pages', page);
