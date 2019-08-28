import request from '@/utils/request';

const BASE = '/comment';


export function commontList(id) {
  return request(BASE + '/comments', { method: 'get', params: { id: id } });
}
