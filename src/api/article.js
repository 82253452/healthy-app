import request from '@/utils/request';

const BASE = '/article';

export function getArticles() {
  return request(BASE + '/list');
}
export function getArticlesAbout(page) {
  return request(BASE + '/list/about',{params:page});
}

export function getArticleInfo(id) {
  return request(BASE + '/info/' + id);
}
export function articlePraise(id) {
  return request(BASE + '/praise/' + id);
}
export function articleKeep(id) {
  return request(BASE + '/keep/' + id);
}

