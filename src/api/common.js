import request from '@/utils/request'

const BASE = '/common';
export function getQiniuToken() {
  return request(`${BASE}/getQiniuToken`)
}
export function jsapiSignature(params) {
  return request(`${BASE}/jsapiSignature`,{params})
}
