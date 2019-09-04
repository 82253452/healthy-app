import request from '@/utils/request';

const BASE = '/user';

export function getUserInfo() {
  return request(BASE + '/getUserInfo');
}




