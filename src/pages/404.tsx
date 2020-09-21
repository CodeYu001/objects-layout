import React, { FC, useEffect } from 'react';
import { bind } from '@/compents/layout/layout';
import { Result, Button } from 'antd';

const page: FC<any> = ({ stopNess }) => {
  useEffect(() => {
    stopNess();
  }, []);
  return (
    <Result
      status="404"
      title="页面不存在"
      subTitle={`抱歉，这个页面不存在耶，再瞅瞅其他页面吧～`}
      extra={
        <Button
          type="primary"
          onClick={() => {
            window.location.href = '/';
          }}
        >
          返回主页
        </Button>
      }
    />
  );
};

export default bind(page);
