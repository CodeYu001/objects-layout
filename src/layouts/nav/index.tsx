import React, { FC, useState, useEffect, ReactNode } from 'react';
import {
  Space,
  Avatar,
  Input,
  message,
  Menu,
  Dropdown,
  Spin,
  Button,
  Drawer,
} from 'antd';
import { useParams, Link, history } from 'umi';
import { SearchOutlined, AlignCenterOutlined } from '@ant-design/icons';
import { AppTitle, Logo } from '@/configs';
import myUtils, { bindDvaProps } from '@/utils/utils';
import MenuUnfoldOutlined from '@ant-design/icons/lib/icons/MenuUnfoldOutlined';

//响应式只分大小屏，不分中屏
const { Search } = Input;

declare type navProps = {
  isSmall?: boolean;
} & bindDvaProps;

//导航栏
const Nav: FC<navProps> = ({
  isSmall,
  dispatch,
  theModel: { classify },
  loadings,
}) => {
  const styles: any = { style: isSmall ? { textAlign: 'center' } : null };

  const params: any = useParams();

  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    dispatch({ type: 'layout/fetchClassify' });
  }, []);

  const search = (e: any) => {
    if (!isSmall) {
      const {
        target: { value },
      } = e;
      if (value) history.push(`/search/${value}`);
      else message.warning('搜索关键词不可以为空 ～');
    } else {
      if (e) {
        history.push(`/search/${e}`);
        setVisible(false);
      }
    }
  };

  if (!isSmall)
    return (
      <Spin spinning={loadings['layout/fetchClassify']}>
        <div className="layout-top">
          <div className="main">
            <Space>
              <Avatar shape="square" size={37} src={Logo} />
              <p
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  history.push('/');
                }}
                title="返回主页"
              >
                {AppTitle}
              </p>
              <Menu theme="dark" mode="horizontal" className="menu">
                {classify.map((e: any) => (
                  <Menu.Item key={e.idClassify} {...styles}>
                    <Link to={e.href} target={e.target ? '_blank' : undefined}>
                      {e.title}
                    </Link>
                  </Menu.Item>
                ))}
              </Menu>
            </Space>

            <div className="search">
              <Input
                className="input"
                placeholder="搜索内容 ..."
                suffix={<SearchOutlined />}
                defaultValue={params.searchKey ? params.searchKey : null}
                onPressEnter={search}
              />
            </div>
          </div>
        </div>
      </Spin>
    );
  else
    return (
      <Spin spinning={loadings['layout/fetchClassify']}>
        <div>
          <div
            className="layout-top"
            style={{ paddingLeft: '10px', paddingRight: '10px' }}
          >
            <div style={{ width: '100%', position: 'relative' }}>
              <Space size={0}>
                <Avatar shape="square" size={37} src={Logo} />
                <p
                  style={{ fontSize: '17px', cursor: 'pointer' }}
                  onClick={() => {
                    history.push('/');
                  }}
                  title="返回主页"
                >
                  {AppTitle}
                </p>
              </Space>

              <div
                style={{
                  fontSize: '25px',
                  position: 'absolute',
                  right: '0',
                  top: '0',
                }}
              >
                <Button
                  onClick={() => setVisible(true)}
                  style={{ background: 'none' }}
                >
                  <MenuUnfoldOutlined
                    style={{ color: 'rgba(255,255,255,.8)', fontSize: 15 }}
                  />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Drawer
          visible={visible}
          title={false}
          closeIcon={false}
          onClose={() => setVisible(false)}
          placement="left"
          bodyStyle={{ padding: 0 }}
        >
          <Menu
            style={{ height: '100%' }}
            onClick={() => {
              setVisible(false);
            }}
          >
            {classify.map((e: any) => (
              <Menu.Item key={e.idClassify} {...styles}>
                <Link to={e.href} target={e.target ? '_blank' : undefined}>
                  {e.title}
                </Link>
              </Menu.Item>
            ))}
            <Menu.Divider />
            <Menu.Item key="3" disabled style={{ marginTop: 20 }}>
              <Search placeholder="搜索内容 ..." onSearch={search} />
            </Menu.Item>
          </Menu>
        </Drawer>
      </Spin>
    );
};

export default myUtils.bindDva('layout', Nav);
