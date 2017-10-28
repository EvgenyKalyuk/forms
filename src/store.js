import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers/index';
import { localStorageMiddleware } from './middlewares/localStorage';

const middlewares = [localStorageMiddleware, thunk];

const store = () =>
  createStore(rootReducer, applyMiddleware(...middlewares));

export default store;