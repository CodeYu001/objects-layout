import React, { ReactNode, FC, useState, useEffect } from 'react';
import { connect, Models, Dispatch } from 'umi';
import QueueAnim from 'rc-queue-anim';
import Zmage from 'react-zmage';
import moment from 'moment';
import { Tag, Divider, Space } from 'antd';
import FireOutlined from '@ant-design/icons/lib/icons/FireOutlined';

interface Img {
  src: string;
  alt: string;
}
//用于 ul 渲染图片
interface ImgItemConfig {
  list: Img[];
  width: string;
}

//渲染图片
const RenderImg: FC<any> = ({ showList, isList, isSmall }) => {
  const [config, setConfig] = useState<ImgItemConfig>({
    list: [],
    width: '25%',
  });

  useEffect(() => {
    if (showList) {
      if (isList) showList = showList.slice(0, 4);

      if (isList && isSmall) showList = showList.slice(0, 1);

      let length = showList.length > 4 ? 4 : showList.length;

      if (isSmall) length = 1;

      let theData: any[] = [];
      showList.forEach((url: string) => {
        theData.push({
          src: url,
          alt: '',
        });
      });

      setConfig({
        list: theData,
        width: `${100 / length}%`,
      });
    }
  }, [isSmall]);

  return (
    <QueueAnim
      component="ul"
      style={{
        listStyle: 'none',
        overflow: 'hidden',
        paddingLeft: '0px',
        width: '100%',
        margin: '0 auto',
      }}
      duration={1500}
    >
      {config.list.map((item: Img, index: number) => (
        <li
          key={index}
          style={{
            float: 'left',
            width: config.width,
            textAlign: 'center',
            padding: '10px',
          }}
        >
          <div
            onClick={() => {
              Zmage.browsing({
                set: config.list,
                defaultPage: index,
              });
            }}
          >
            <img
              src={item.src}
              className="Image-item"
              style={{ height: config.list.length <= 2 ? '300px' : '200px' }}
            />
          </div>
        </li>
      ))}
    </QueueAnim>
  );
};
const RenderDatas: FC<any> = ({ data, isList, isSmall }) => {
  const [content, setContent] = useState(<></>);

  useEffect(() => {
    const { urls, type } = data;
    if (urls && type) {
      if (type === 'image')
        setContent(
          <div style={{ margin: '20px 0' }}>
            <RenderImg showList={urls} isList={isList} isSmall={isSmall} />
          </div>,
        );
      if (type === 'video') {
        const theVideo = urls.map((item: string, index: number) => (
          <video src={item} controls key={index} style={{ width: '100%' }}>
            您的浏览器不支持 video 标签。
          </video>
        ));
        setContent(
          <div style={{ margin: '20px 0' }}>
            <QueueAnim duration={1500} type="bottom">
              {theVideo}
            </QueueAnim>
          </div>,
        );
      }
      if (type === 'music') {
        const theMusic = urls.map((item: string, index: number) => (
          <audio src={item} key={index} controls style={{ width: '100%' }}>
            您的浏览器不支持 audio 标签。
          </audio>
        ));
        setContent(
          <div style={{ margin: '20px 0' }}>
            <QueueAnim duration={1500} type="bottom">
              {theMusic}
            </QueueAnim>
          </div>,
        );
      }
    }
  }, []);

  return content;
};

const myUtils = {
  /**
   * 绑定dva
   */
  bindDva: (modelName: string, FC: FC<any>) => {
    return connect((models: Models<any>) => {
      return {
        theModel: models[modelName],
        loadings: models.loading.effects,
      };
    })(FC);
  },

  /**
   * 柯里化绑定 bodydiv，返回绑定后的组件
   * @param needDashed 是否需要虚线
   * @param isSmall 响应式配置
   */
  connectBodyDiv: (needDashed?: boolean, isSmall?: boolean) => {
    return (children: ReactNode) => () => {
      let show = { padding: '50px 0', width: '85%' };
      if (isSmall) show = { padding: '25px 0', width: '85%' };

      const lastBorder = {
        style: needDashed
          ? {
              borderBottom: '1px dashed #ddd',
              padding: show.padding,
            }
          : { padding: show.padding },
      };

      return (
        <div {...lastBorder}>
          <div
            style={{
              width: show.width,
              margin: '0 auto',
              position: 'relative',
            }}
          >
            {children}
          </div>
        </div>
      );
    };
  },

  /**
   * 柯里化绑定BaseDiv
   * @param needWhite 是否需要白色背景
   * @param isSmall 响应式配置
   * @param toTop marginTop
   */
  connectBaseDiv: (needWhite?: boolean, isSmall?: boolean, toTop?: number) => {
    return (children: ReactNode) => () => {
      let addStyles = {
        borderRadius: isSmall ? 'none' : '10px',
        background: needWhite ? '#fff' : 'none',
        marginTop: toTop ? toTop : 0,
      };
      return (
        <div className="blog-body" style={addStyles}>
          {children}
        </div>
      );
    };
  },

  getDateTime: (time: string) => moment(time).format('YYYY-MM-DD HH:mm'),

  getTags: (e: string, preNode?: ReactNode) => {
    if (e || preNode) {
      const theArr = e ? JSON.parse(e) : [];

      return (
        <div style={{ marginTop: -6 }}>
          <Space align="baseline" size={1}>
            {preNode}
            {theArr.map((f: string, index: number) => (
              <Tag color="red" key={index}>
                <FireOutlined /> {f}
              </Tag>
            ))}
          </Space>
        </div>
      );
    } else return '';
  },

  randomHexColor() {
    //随机生成十六进制颜色
    var hex = Math.floor(Math.random() * 16777216).toString(16); //生成ffffff以内16进制数
    while (hex.length < 6) {
      //while循环判断hex位数，少于6位前面加0凑够6位
      hex = '0' + hex;
    }
    return '#' + hex; //返回‘#'开头16进制颜色
  },
};

export declare type bindDvaProps = {
  theModel: any;
  loadings: any;
  dispatch: Dispatch;
};

export { RenderDatas };

export default myUtils;
