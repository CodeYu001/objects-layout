import React, { FC } from 'react';
import { BackTop, Divider } from 'antd';
import { configResponsive, useResponsive } from 'ahooks';
import NProgress from 'nprogress';
import { Link } from 'umi';
import Nav from './nav/index';
import Footer from './footer';
import 'braft-editor/dist/index.css';
import 'braft-editor/dist/output.css';
import './main.css';

configResponsive({ small: 0, middle: 960, large: 1200 });

const LayoutOrigin: FC<any> = ({ children }) => {
  const { small, middle, large } = useResponsive();

  const isSmall = small && !middle && !large;

  const stopNess = () => NProgress.done();

  const renderChild = React.Children.map(children, child =>
    React.cloneElement(child, { isSmall, stopNess }),
  );

  return (
    <>
      <Nav isSmall={isSmall} />
      <div className={isSmall ? 'small-body' : 'large-body'}>{renderChild}</div>

      <div className="layout-footer">
        © {new Date().getFullYear()} 彼岸阁.
        <Divider type="vertical" />
        <Link to="/contact">联络方式</Link>
        <Footer />
      </div>

      <BackTop />
    </>
  );
};

export default LayoutOrigin;
