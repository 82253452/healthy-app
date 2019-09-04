import request from '@/utils/request';

const BASE = '/address';

export function getAddressyFir() {
  return request(BASE + '/list/fir');
}

export function getAddressySec(id) {
  return request(BASE + '/list/sec/' + id );
}



