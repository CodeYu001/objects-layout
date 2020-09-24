import React, { FC, useEffect } from 'react';
import { BackTop, Divider } from 'antd';
import { configResponsive, useResponsive } from 'ahooks';
import NProgress from 'nprogress';
import { connect } from 'dva';
import Nav from '../nav/index';
import './layout.css';

const baseUrl: string = 'http://api.sanqii.cn/';

const namespace = 'layout';

configResponsive({
  small: 0,
  middle: 960,
  large: 1200,
});

const LayoutOrigin: FC<any> = ({ children, layout: { footers }, dispatch }) => {
  const { small, middle, large } = useResponsive();

  const isSmall = small && !middle && !large;

  const stopNess = () => {
    NProgress.done();
  };

  useEffect(() => {
    dispatch({ type: `${namespace}/fetch` });
  }, []);

  return (
    <>
      <Nav isSmall={isSmall} />

      {React.Children.map(children, child => {
        return React.cloneElement(child, {
          isSmall,
          stopNess,
        });
      })}

      <div className="layout-footer">
        © {new Date().getFullYear()} 彼岸花网 版权所有.
        <br />
        {footers.map((e: any, index: number) => (
          <span key={index}>
            <a href={e.value} target="_blank">
              {e.name}
            </a>
            <Divider type="vertical" />
          </span>
        ))}
      </div>
      <BackTop />
    </>
  );
};

//绑定model
const TheLayout = connect(({ layout }: any) => ({
  layout,
}))(LayoutOrigin);

//组件绑定
const bind = (Opts: FC) => () => (
  <TheLayout>
    <Opts />
  </TheLayout>
);

export { bind, baseUrl };
