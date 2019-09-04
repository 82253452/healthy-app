import request from '@/utils/request';

const BASE = '/classify';

export function getClassify() {
  return request(BASE + '/list');
}





