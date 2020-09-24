import React, { ReactNode } from 'react';
import { Menu } from 'antd';
import { Link } from 'umi';

const AppTitle: string = '彼岸花壁纸';

const Logo: string =
  'https://gw.alipayobjects.com/mdn/afts/img/A*tF_ZT5B56RUAAAAAAAAAAABjARQnAQ/original?bz=rms';

const menus: any[] = [
  { href: '/', lable: '首页' },
  { href: '/4k', lable: '4K 壁纸' },
  { href: '/5k', lable: '5K 壁纸' },
  { href: '/mobile', lable: '手机屏壁纸' },
];

export { AppTitle, Logo, menus };
