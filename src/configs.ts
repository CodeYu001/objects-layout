//const baseUrl: string = "http://api.sanqi.us/sanqi/";
const baseUrl: string = 'https://localhost:5001/';
const splitUrl = (path: string) => baseUrl + path;

const AppTitle: string = '彼岸阁';

const Logo: string =
  'http://twoyecloud.oss-cn-beijing.aliyuncs.com/original.png';

const menus = [
  { href: '/', lable: '首页' },
  { href: '/detail/1001', lable: 'BT Tool' },
  { href: 'http://pic.sanqi.us', lable: '美女壁纸' },
  { href: '/detail/3', lable: '会员视频解析' },
];

export { AppTitle, Logo, menus, baseUrl, splitUrl };
