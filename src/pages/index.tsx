import React, { FC, useEffect } from 'react';
import { bind } from '@/compents/layout/layout';

const page: FC<any> = ({ isSmall, stopNess }) => {
  useEffect(() => {
    stopNess();
  }, []);

  return (
    <>
      {isSmall && <p>小票</p>}
      {!isSmall && <p>大票</p>}
    </>
  );
};

export default bind(page);
