import React, { useEffect } from 'react';
import { Result, Button, ResultProps } from 'antd';
import { history } from 'umi';

export default () => {
  const props: ResultProps = {
    status: '500',
    title: '非法的请求参数',
    subTitle: '抱歉，您键入的 url 有误',
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
