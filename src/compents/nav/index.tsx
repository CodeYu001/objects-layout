import React, { FC } from 'react';
import { Space, Avatar, Input, message, Menu, Dropdown } from 'antd';
import { useParams, useLocation } from 'umi';
import { SearchOutlined, AlignCenterOutlined } from '@ant-design/icons';
import { AppTitle, Logo, menus } from '@/compents/layout/config';

//响应式只分大小屏，不分中屏
const { Search } = Input;

//导航栏
const Nav: FC<any> = ({ isSmall }) => {
  const params: any = useParams();
  const location = useLocation();

  const search = (e: any) => {
    if (!isSmall) {
      const {
        target: { value },
      } = e;
      if (value) window.location.href = `/search/${value}`;
      else message.warning('搜索关键词不可以为空～');
    } else {
      if (e) window.location.href = `/search/${e}`;
    }
  };

  const styles: any = { style: isSmall ? { textAlign: 'center' } : null };

  const menuItem = menus.map(item => (
    <Menu.Item key={item.href} {...styles}>
      <a href={item.href}>{item.lable}</a>
    </Menu.Item>
  ));

  return (
    <>
      {!isSmall && (
        <div className="layout-top">
          <div className="main">
            <Space>
              <Avatar shape="square" size={37} src={Logo} />
              <p>{AppTitle}</p>
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={[location.pathname]}
                className="menu"
              >
                {menuItem}
              </Menu>
            </Space>

            <div className="search">
              <Input
                className="input"
                placeholder="按回车以搜索内容"
                suffix={<SearchOutlined />}
                defaultValue={params.searchKey ? params.searchKey : null}
                onPressEnter={search}
              />
            </div>
          </div>
        </div>
      )}
      {isSmall && (
        <Dropdown
          overlay={
            <Menu style={{ marginTop: '-32px' }}>
              {menuItem}
              <Menu.Divider />
              <Menu.Item key="3" disabled>
                <Search placeholder="搜索内容 ..." onSearch={search} />
              </Menu.Item>
            </Menu>
          }
          trigger={['click']}
        >
          <div>
            <div
              className="layout-top"
              style={{ paddingLeft: '10px', paddingRight: '10px' }}
            >
              <div style={{ width: '100%', position: 'relative' }}>
                <Space size={0}>
                  <Avatar shape="square" size={37} src={Logo} />
                  <p style={{ fontSize: '17px' }}>{AppTitle}</p>
                </Space>

                <div
                  style={{
                    fontSize: '25px',
                    position: 'absolute',
                    right: '0',
                    top: '0',
                  }}
                >
                  <AlignCenterOutlined />
                </div>
              </div>
            </div>
          </div>
        </Dropdown>
      )}
    </>
  );
};

export default Nav;
