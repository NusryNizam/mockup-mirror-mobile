import {StyleSheet} from "react-native";

import {ThemedView} from "../components/ThemedView";
import { ThemedText } from "../components/ThemedText";

export default function HomeScreen() {
  return <ThemedView style={styles.container}>
   <ThemedText> HOME</ThemedText>
  </ThemedView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
