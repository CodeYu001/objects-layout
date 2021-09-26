import React, { useEffect, FC } from 'react';
import {
  Skeleton,
  Divider,
  Result,
  ResultProps,
  Button,
  Space,
  Tooltip,
  Tag,
} from 'antd';
import { useParams, history } from 'umi';
import myUtils, { RenderDatas, bindDvaProps } from '@/utils/utils';
import { LinkOutlined, GithubOutlined } from '@ant-design/icons';
import { server } from '@/utils/request';

declare type pageProps = {
  isSmall: boolean;
} & bindDvaProps;

const page: FC<pageProps> = ({
  isSmall,
  dispatch,
  loadings,
  theModel: { detail },
}) => {
  const { id }: any = useParams();

  const fecthStr = 'pages/fetchDetail';

  useEffect(() => {
    dispatch({
      type: fecthStr,
      payload: { id },
    });
  }, []);

  const props: ResultProps = {
    status: '404',
    subTitle: '文章暂时无法查看，看看其他文章吧',
    extra: (
      <Button type="primary" onClick={() => history.push('/')}>
        返回主页
      </Button>
    ),
  };

  const BindBodyDiv = myUtils.connectBodyDiv(
    false,
    isSmall,
  )(
    <Skeleton active loading={loadings[fecthStr]} paragraph={{ rows: 30 }}>
      {detail.code === -1 && <Result {...props} title={detail.message} />}

      {detail.code === 0 && (
        <>
          <Space align="baseline">
            {detail.data.githubUrl && (
              <a href={detail.data.githubUrl} target="_blank">
                <GithubOutlined style={{ fontSize: 23 }} />
              </a>
            )}
            <h3 className="title">{detail.data.title}</h3>
          </Space>
          {myUtils.getTags(
            detail.data.tags,
            <div>
              {detail.data.annexJson && (
                <Tag color="#108ee9" icon={<LinkOutlined />}>
                  有附件
                </Tag>
              )}
              <div
                style={{
                  fontSize: '12px',
                  color: 'rgba(0,0,0,.45)',
                  marginRight: 10,
                }}
              >
                {myUtils.getDateTime(detail.data.publishTime)}
                <Divider type="vertical" />
                阅读 {detail.data.visits}
              </div>
            </div>,
          )}

          <RenderDatas
            data={{ urls: detail.data, type: detail.type }}
            isSmall={isSmall}
          />
          <Divider dashed />
          <div
            dangerouslySetInnerHTML={{ __html: detail.data.content }}
            className="braft-output-content"
          />
          {detail.data.annexJson && (
            <>
              <Divider dashed />
              <Space>
                {detail.data.annexJson.map((e: any, index: number) => (
                  <Tooltip key={index} title="点我下载附件" placement="bottom">
                    <a download href={`${server}/blog/download?dir=${e.dir}`}>
                      <LinkOutlined /> 附件 {index + 1} - {e.dir.split('.')[1]}
                    </a>
                  </Tooltip>
                ))}
              </Space>
            </>
          )}
        </>
      )}
    </Skeleton>,
  );

  const Content = myUtils.connectBaseDiv(true, isSmall)(<BindBodyDiv />);

  return <Content />;
};

export default myUtils.bindDva('pages', page);
