import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { LogBox } from 'react-native';
import StackNavigator from './src/Navigator/StackNavigator';
import { Provider } from 'react-redux';
import NetInfo, {useNetInfo} from "@react-native-community/netinfo";
import store from './src/redux/store';
import * as actions from './src/redux/actions';
import NoInternet from './src/Screens/NoInternet';

LogBox.ignoreAllLogs();//Ignore all log notifications

const App = () => {
  const net = useNetInfo()
 
  return (
    <Provider store={store}>
      {!net.isConnected ? <NoInternet/>: <StackNavigator />}
    </Provider>
  );
};

export default App;
