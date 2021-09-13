import request from '@/utils/request';

//获取分类
export async function GetClassify() {
  return request('/blog/classify');
}

//获取联系我们正文
export async function GetContactText() {
  return request('/blog/configfind', {
    params: { id: '6b3deb6cc9f8434ebfc3f415309f7fa8' },
  });
}
export async function GetContactEmail() {
  return request('/blog/configfind', {
    params: { id: 'e11c51e36d85413da82f7fface356db5' },
  });
}

export async function GetFooter() {
  return request('/blog/configfind', {
    params: { id: '729f3ce042264cda8cca2847efac75b5' },
  });
}
