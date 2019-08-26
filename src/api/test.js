import request from '@/utils/request'

export function test(free) {
  return request({
    url: '/admin_album/getSelectItem?free='+free,
    method: 'get'
  })
}
