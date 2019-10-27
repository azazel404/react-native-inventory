import { createStore, applyMiddleware, combineReducers } from 'redux';

import user from './modules/user';
import drawer from './modules/drawer';
import product from './modules/product';

const rootReducer = combineReducers({
  user,
  product,
  drawer
});

export default rootReducer;
