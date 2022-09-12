import React from 'react';
import {StatusBar} from 'react-native';

export const StatusBarLight = props => (
  <StatusBar
    barStyle={'light-content'}
    backgroundColor="transparent"
    translucent={true}
    {...props}
  />
);

export const StatusBarDark = props => (
  <StatusBar
    barStyle={props.barStyle ? props.barStyle : 'dark-content'}
    backgroundColor={props.bg ? props.bg : '#FFFFFF'}
    // translucent={true}
    {...props}
  />
);
