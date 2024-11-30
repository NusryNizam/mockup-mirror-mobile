import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import React from "react";
import {SvgProps} from "react-native-svg";
import {ThemedText} from "./ThemedText";
import { useColors } from "../contexts/ColorContext";

type Props = {
  Icon: React.FC<SvgProps>;
  action: string;
  onPress?: () => void;
};
const ThemedIconButton = ({Icon, action, onPress}: Props) => {
  const {colors} = useColors();

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Icon fill={colors.foreground.primary} />
      <ThemedText type="small">
        {action}
      </ThemedText>
    </TouchableOpacity>
  );
};

export default ThemedIconButton;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    height: 84,
    display: "flex",
    flexDirection: "column",
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    flex: 1,
  },
});
