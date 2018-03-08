import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'https://conduit.productionready.io/api';

const responseBody = res => res.body;

const requests = {
  get: url =>
    superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  post: (url, body) =>
    superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  put: (url, body) =>
    superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  del: url =>
    superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody)
};

const defaultCount = 10;
const limit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`;
const encode = encodeURIComponent;
const omitSlug = article => ({ ...article, slug: undefined });

const Articles = {
  all: page =>
    requests.get(`/articles?${limit(defaultCount, page)}`),
  get: slug =>
    requests.get(`/articles/${slug}`),
  del: slug =>
    requests.del(`/articles/${slug}`),
  byAuthor: (author, page) =>
    requests.get(`/articles?author=${encode(author)}&${limit(defaultCount, page)}`),
  favoritedBy: (author, page) =>
    requests.get(`/articles?favorited=${encode(author)}&${limit(defaultCount, page)}`),
  feed: page =>
    requests.get(`/articles/feed?${limit(defaultCount, page)}`),
  byTag: (tag, page) =>
    requests.get(`/articles?tag=${encode(tag)}&${limit(defaultCount, page)}`),
  create: article =>
    requests.post('/articles', { article }),
  update: article =>
    requests.put(`/articles/${article.slug}`, { article: omitSlug(article) })
};

const Comments = {
  forArticle: slug =>
    requests.get(`/articles/${slug}/comments`),
  create: (slug, comment) =>
    requests.post(`/articles/${slug}/comments`, { comment }),
  delete: (slug, commentId) =>
    requests.del(`/articles/${slug}/comments/${commentId}`),
};

const Profile = {
  follow: username =>
    requests.post(`/profiles/${username}/follow`),
  get: username =>
    requests.get(`/profiles/${username}`),
  unfollow: username =>
    requests.del(`/profiles/${username}/follow`)
};

const Tags = {
  all: () => requests.get('/tags')
};

let token = null;
let tokenPlugin = req => {
  if (token) {
    req.set('authorization', `Token ${token}`);
  }
};

const Auth = {
  register: (username, email, password) =>
    requests.post('/users', { user: { username, email, password }}),
  login: (email, password) =>
    requests.post('/users/login', { user: { email, password }}),
  current: () =>
    requests.get('/user'),
  save: user =>
    requests.put('/user', { user })
};

export default {
  Articles,
  Auth,
  Comments,
  Profile,
  Tags,
  setToken: _token => { token = _token;}
};
