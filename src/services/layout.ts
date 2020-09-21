import request from '@/compents/request';

//获取底部链接
export async function GetFooterLinks() {
  return request('api/GetFooters');
}
