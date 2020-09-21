import React, { FC } from 'react';
import { Space, Avatar } from 'antd';
import { AppTitle, Logo } from '@/compents/layout/config';

const LargeNav: FC = () => {
  return (
    <div className="layout-top">
      <div className="main">
        <Space>
          {Logo && <Avatar shape="square" size={37} src={Logo} />}
          {AppTitle && <p>{AppTitle}</p>}
        </Space>
      </div>
    </div>
  );
};

const SmallNav: FC = () => {
  return (
    <div className="layout-top-small">
      <div className="main">
        <Space align="start" size={2}>
          {Logo && <Avatar shape="square" size={37} src={Logo} />}
          {AppTitle && <p>{AppTitle}</p>}
        </Space>
      </div>
    </div>
  );
};

export { LargeNav, SmallNav };
