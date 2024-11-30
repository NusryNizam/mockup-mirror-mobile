import React from "react";
import {StatusBar, StyleSheet, useColorScheme} from "react-native";
import {RootStack} from "./src/navigation/RootStackNavigator";
import {NavigationContainer} from "@react-navigation/native";
import {Colors} from "./src/constants/Colors";
import {ColorProvider} from "./src/contexts/ColorContext";
function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === "dark";

  const backgroundStyle = {
    backgroundColor: isDarkMode
      ? Colors.dark.background.primary
      : Colors.light.background.primary,
  };
  return (
    <NavigationContainer>
      <ColorProvider>
        <StatusBar
          hidden={false}
          barStyle={isDarkMode ? "light-content" : "dark-content"}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <RootStack />
      </ColorProvider>
    </NavigationContainer>
  );
}

export default App;
