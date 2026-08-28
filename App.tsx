import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';

import {ColorProvider} from './src/contexts/ColorContext';
import {RootStack} from './src/navigation/RootStackNavigator';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <NavigationContainer>
      <ColorProvider>
        <StatusBar
          hidden={true}
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        />
        <RootStack />
      </ColorProvider>
    </NavigationContainer>
  );
}

export default App;
