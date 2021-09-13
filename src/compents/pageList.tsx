import React, { FC, useEffect } from 'react';
import {
  Divider,
  Alert,
  Skeleton,
  Empty,
  Pagination,
  Card,
  Tag,
  Space,
} from 'antd';
import myUtils, { bindDvaProps, RenderDatas } from '@/utils/utils';
import { history, useParams } from 'umi';
import { LinkOutlined, GithubOutlined } from '@ant-design/icons';

declare type pageProps = bindDvaProps & {
  isSmall: boolean;
  showNote?: boolean;
  pageChange: (page: number, searchKey: any, idClassify: number) => void;
};

const page: FC<pageProps> = ({
  isSmall,
  loadings,
  dispatch,
  theModel: { data, total },
  showNote,
  pageChange,
}) => {
  const { searchKey, current, idClassify }: any = useParams();
  const fetchStr = 'pages/fetchList';

  const theCurrent = current ?? 1;

  const fetchData = () => {
    let payload: any = {};
    payload.current = theCurrent;
    if (idClassify) payload.idClassify = idClassify;
    if (searchKey) payload.searchKey = searchKey;

    dispatch({
      type: fetchStr,
      payload,
    });
  };

  useEffect(() => {
    fetchData();
  }, [`${theCurrent}_${searchKey}_${idClassify}`]);

  if (total === 0)
    return (
      <Card style={{ padding: '150px 0' }}>
        <Empty description="暂无文章" image={Empty.PRESENTED_IMAGE_SIMPLE} />
      </Card>
    );
  else {
    const list = (data || []).map((item: any, index: number) => {
      const children = (
        <>
          <Space align="baseline">
            {item.githubUrl && (
              <a href={item.githubUrl} target="_blank">
                <GithubOutlined style={{ fontSize: 23 }} />
              </a>
            )}
            <h3 className="title">
              <a
                target="_blank"
                onClick={() => history.push(`/detail/${item.idBlog}`)}
              >
                {item.title}
              </a>
            </h3>
          </Space>
          {myUtils.getTags(
            item.tags,
            item.annexJson && (
              <Tag color="#108ee9" icon={<LinkOutlined />}>
                有附件
              </Tag>
            ),
          )}
          {item.mediaJson && (
            <RenderDatas data={item.mediaJson} isList isSmall={isSmall} />
          )}
          <div className="pre-body">{item.desc}</div>
          <div style={{ fontSize: '12px', color: 'rgba(0,0,0,.45)' }}>
            {myUtils.getDateTime(item.publishTime)} <Divider type="vertical" />{' '}
            {item.visits} 次阅读
          </div>
        </>
      );
      const T = myUtils.connectBodyDiv(
        index !== data.length - 1,
        isSmall,
      )(children);
      return <T key={index} />;
    });

    const Main = myUtils.connectBaseDiv(
      true,
      isSmall,
      30,
    )(
      <>
        {list}
        <Pagination
          hideOnSinglePage={true}
          simple
          current={parseInt(theCurrent)}
          total={total}
          pageSize={8}
          style={{
            display: 'block',
            width: 'fit-content',
            margin: '42px auto',
          }}
          onChange={p => pageChange(p, searchKey, idClassify)}
        />
      </>,
    );

    return (
      <Skeleton
        active
        loading={loadings[fetchStr]}
        paragraph={{ rows: 20 }}
        key={`${theCurrent}_${searchKey}`}
      >
        {showNote && (
          <Alert
            message={`一共找到 ${total} 篇相关文章`}
            type="success"
            showIcon
            closable
          />
        )}
        <Main />
      </Skeleton>
    );
  }
};

export default myUtils.bindDva('pages', page);
