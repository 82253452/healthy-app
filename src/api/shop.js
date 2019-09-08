import request from '@/utils/request';

const BASE = '/shop';


export function getShopIndex(param) {
  return request(BASE + '/getShopIndex', { params: param });
}

export function getShopInfo(id) {
  return request(BASE + '/getShopById/' + id);
}
export function getShopAbout(page) {
  return request(BASE + '/list/about', { params: page });
}



