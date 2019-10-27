import { createStore, applyMiddleware, compose } from 'redux';
import app from '../../reducers';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
const persistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['product']
};

export default function configureStore() {
  const persistedReducer = persistReducer(persistConfig, app);
  const unnamed = compose(applyMiddleware(thunk));
  const store = createStore(persistedReducer, unnamed);
  const persistor = persistStore(store);
  return { store, persistor };
}
