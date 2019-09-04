import request from '@/utils/request';

const BASE = '/article';

export function getArticles(page) {
  return request(BASE + '/list', { params: page });
}

export function getUserArticles(page) {
  return request(BASE + '/list/user', { params: page });
}

export function getArticlesAbout(page) {
  return request(BASE + '/list/about', { params: page });
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

export function articleSave(data) {
  return request(BASE + '/save', { method: 'post', data: data });
}


