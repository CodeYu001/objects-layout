import request from '@/utils/request';

//获取廣告
export async function GetTop() {
  return request('/blog/top');
}

//查询列表
export async function GetList(params: any) {
  return request('/blog/SiteList', { params });
}

//詳情頁
export async function GetDetail(params: any) {
  return request('/blog/Detail', { params });
}
