import request from '@/utils/request';

const BASE = '/privilege';

export function getList() {
  return request(BASE + '/info');
}
export function receive(id) {
  return request(BASE + `/receive/${id}`);
}
export function getUser() {
  return request(BASE + '/get');
}





