const tintColorLight = "#6911D4";
const tintColorDark = "#7EFFF5";

// export const Colors: ITheme = {
//   light: {
//     text: "#11181C",
//     foregroundSecondary: "#8f9da3",
//     background: "#fff",
//     tint: tintColorLight,
//     icon: "#687076",
//     tabIconDefault: "#687076",
//     tabIconSelected: tintColorLight,
//   },
//   dark: {
//     text: "#ECEDEE",
//     foregroundSecondary: "#495e74",
//     background: "#18181A",
//     tint: tintColorDark,
//     icon: "#9BA1A6",
//     tabIconDefault: "#9BA1A6",
//     tabIconSelected: tintColorDark,
//   },
// };

// export type IColor = {
//   text: string;
//   foregroundSecondary: string;
//   background: string;
//   tint: string;
//   icon: string;
//   tabIconDefault: string;
//   tabIconSelected: string;
// };

// export type ITheme = {
//   light: IColor;
//   dark: IColor;
// };

export const Colors: ColorTheme = {
  dark: {
    background: {
      primary: "#1C1C1C",
      secondary: "#2C2C2C",
      tertiary: "#3C3C3C",
      quaternary: "#4C4C4C",
    },
    foreground: {
      primary: "#FFFFFF",
      secondary: "#CCCCCC",
    },
    accent: {
      primary: "#4DFFF2",
      primaryMuted: "#2C8C86",
      secondary: "#C094FF",
      tertiary: "#00FFE1",
      quaternary: "#FF66FF",
    },
    status: {
      success50: "#FFFFFF",
      success500: "#00A99D",
      success950: "#005C54",
      warning50: "#FFF5F0",
      warning500: "#FF5722",
      warning950: "#802B11",
      error50: "#FFF0F0",
      error500: "#FF1744",
      error950: "#990F29",
      info50: "#F0F8FF",
      info500: "#2196F3",
      info950: "#0D47A1",
    },
    app: {
      white: "#FFFFFF",
      black: "#000000",
      pink: "#FF66FF",
      blue: "#66CCFF",
      gold: "#FFD700",
      indigo: "#B8C0FF",
      red: "#FFB8B8",
      yellow: "#F0FF66",
      purple: "#E0B0FF",
      lemon: "#CCFF66",
      orange: "#FFD6B8",
    },
  },
  light: {
    background: {
      primary: "#FFFFFF",
      secondary: "#F5F5F5",
      tertiary: "#EEEEEE",
      quaternary: "#E0E0E0",
    },
    foreground: {
      primary: "#000000",
      secondary: "#4A5568",
    },
    accent: {
      primary: "#6200EE",
      primaryMuted: "#B8B5F7",
      secondary: "#0055FF",
      tertiary: "#8000FF",
      quaternary: "#FF00FF",
    },
    status: {
      success50: "#F0FFF4",
      success500: "#00875A",
      success950: "#004D34",
      warning50: "#FFFAF0",
      warning500: "#DD6B20",
      warning950: "#7B341E",
      error50: "#FFF5F5",
      error500: "#E53E3E",
      error950: "#822727",
      info50: "#F0F7FF",
      info500: "#3182CE",
      info950: "#1A365D",
    },
    app: {
      white: "#FFFFFF",
      black: "#000000",
      pink: "#FF00FF",
      blue: "#0099FF",
      gold: "#FFB700",
      indigo: "#4B0082",
      red: "#FF0000",
      yellow: "#FFFF00",
      purple: "#800080",
      lemon: "#99FF00",
      orange: "#FFA500",
    },
  },
};

type ColorShades = {
  primary: string;
  secondary: string;
  tertiary: string;
  quaternary: string;
};

type ForegroundColors = {
  primary: string;
  secondary: string;
};

type AccentColors = {
  primary: string;
  primaryMuted: string;
  secondary: string;
  tertiary: string;
  quaternary: string;
};

type StatusColors = {
  success50: string;
  success500: string;
  success950: string;
  warning50: string;
  warning500: string;
  warning950: string;
  error50: string;
  error500: string;
  error950: string;
  info50: string;
  info500: string;
  info950: string;
};

type AppColors = {
  white: string;
  black: string;
  pink: string;
  blue: string;
  gold: string;
  indigo: string;
  red: string;
  yellow: string;
  purple: string;
  lemon: string;
  orange: string;
};

export type ThemeColors = {
  background: ColorShades;
  foreground: ForegroundColors;
  accent: AccentColors;
  status: StatusColors;
  app: AppColors;
};

type ColorTheme = {
  light: ThemeColors;
  dark: ThemeColors;
};
