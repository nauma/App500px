import React from 'react';
import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';

import HomeComponent from './src/Components/Home';
import PhotoComponent from './src/Components/Photo';

const App = StackNavigator({
  Main: { screen: HomeComponent },
  Photo: { screen: PhotoComponent }
});

export default App