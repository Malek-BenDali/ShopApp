import React from 'react';
import {Text, View} from 'react-native';
import {store} from './src/store';
import {Provider} from 'react-redux';

const App = () => {
  return (
    <Provider store={store}>
      <Text>Hola</Text>
    </Provider>
  );
};

export default App;
