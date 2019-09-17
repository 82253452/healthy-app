import request from '@/utils/request';

const BASE = '/user';

export function getUserInfo() {
  return request(BASE + '/getUserInfo');
}

export function save(data) {
  return request(BASE + '/saveOrUpdate', { method: 'post', data });
}
 export async function login(params) {
  await request(BASE + '/login', { method: 'get', params });
}



