import request from '@/utils/request';

const BASE = '/comment';


export function commontList(data) {
  return request(BASE + '/comments', { method: 'get', params: data });
}

export function addCommont(data) {
  return request(BASE + '/addComment', { method: 'post', data: data });
}

export function commentPraise(id) {
  return request(BASE + '/praise/' + id);
}
