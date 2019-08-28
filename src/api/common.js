import request from '@/utils/request'

export function getQiniuToken() {
  return request('/common/getQiniuToken')
}

