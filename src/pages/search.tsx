import React, { FC, useEffect } from 'react';
import { bind } from '@/compents/layout/layout';

const page: FC<any> = ({ isSmall, stopNess }) => {
  useEffect(() => {
    stopNess();
  }, []);

  return <>这是搜索页</>;
};

export default bind(page);
