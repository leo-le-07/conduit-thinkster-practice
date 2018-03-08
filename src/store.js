import { createStore, applyMiddleware, combineReducers } from 'redux';
import { promiseMiddleware, localStorageMiddleware } from './middleware';
import auth from './reducers/auth';
import common from './reducers/common';
import home from './reducers/home';
import articleList from './reducers/articleList';
import settings from './reducers/settings';
import article from './reducers/article';
import profile from './reducers/profile';
import editor from './reducers/editor';

const reducer = combineReducers({
  auth,
  common,
  home,
  articleList,
  settings,
  article,
  profile,
  editor
});

const store = createStore(reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(promiseMiddleware, localStorageMiddleware)
);

export default store;