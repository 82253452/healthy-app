import request from '@/utils/request';

const BASE = '/user';

export function getUserInfo() {
  return request(BASE + '/getUserInfo');
}

export function save(data) {
  return request(BASE + '/saveOrUpdate', { method: 'post', data });
}
export function login(params) {
  return request(BASE + '/login', { method: 'get', params });
}



