import React, { useEffect } from 'react';
import { Result, Button, ResultProps } from 'antd';
import { history } from 'umi';

export default () => {
  const props: ResultProps = {
    status: '404',
    title: '页面不存在',
    subTitle: '抱歉，找不到该页面！请检查地址是否输入正确',
    extra: (
      <Button
        type="primary"
        onClick={() => {
          history.push('/');
        }}
      >
        返回主页
      </Button>
    ),
  };

  return <Result {...props} />;
};
