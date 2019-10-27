import React from 'react';
import AppNavigator from './AppNavigator';
import { Root } from 'native-base';
import { Provider } from 'react-redux';
import configureStore from './reducers/store/store';
const { store, persistor } = configureStore();
export default () => (
  <Provider store={store}>
    <Root persistor={persistor}>
      <AppNavigator />
    </Root>
  </Provider>
);
//test local
