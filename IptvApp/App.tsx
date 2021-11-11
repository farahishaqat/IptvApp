import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Provider } from 'react-redux';
import Layout from './src/layout';
import store from './src/redux/store';
import { ConfigureAxios } from './src/utils/configureAxios';
import './i18n';

const App = () => {
  ConfigureAxios();

  return (
    <Provider store={store}>
      <Layout />
    </Provider>
  );
}

export default App;