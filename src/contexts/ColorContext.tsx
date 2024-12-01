import React, {createContext, useContext, useMemo} from "react";
import {useColorScheme} from "react-native";
import {Colors, ThemeColors} from "../constants/Colors";

interface IColorContext {
  colors: ThemeColors;
}
const value: IColorContext = {
  colors: Colors.light,
};

const ColorContext = createContext(value);

type ColorProviderProps = {
  children: React.ReactNode;
};

export const ColorProvider = ({children}: ColorProviderProps) => {
  const selectedTheme = useColorScheme();

  const colorContextValue: {
    colors: ThemeColors;
  } = useMemo(
    () => ({
      colors: selectedTheme === "light" ? Colors.light : Colors.dark,
    }),
    [selectedTheme],
  );

  return (
    <ColorContext.Provider value={colorContextValue}>
      {children}
    </ColorContext.Provider>
  );
};

export const useColors = (): IColorContext => {
  const context = useContext(ColorContext);
  if (context === undefined) {
    throw new Error("useColors must be used within a ColorProvider");
  }
  return context;
};

export default ColorContext;
