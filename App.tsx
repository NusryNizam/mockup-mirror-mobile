import React from "react";
import {StatusBar, StyleSheet, useColorScheme} from "react-native";
import {RootStack} from "./src/navigation/RootStackNavigator";
import {NavigationContainer} from "@react-navigation/native";
import {Colors} from "./src/constants/Colors";

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === "dark";

  const backgroundStyle = {
    backgroundColor: isDarkMode
      ? Colors.dark.background
      : Colors.light.background,
  };
  return (
    <NavigationContainer>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <RootStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});

export default App;
