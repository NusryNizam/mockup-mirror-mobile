import {StyleSheet} from "react-native";

import {ThemedView} from "../components/ThemedView";
import {ThemedText} from "../components/ThemedText";
import {ROOT_STACK_SCREENS} from "../navigation/constants";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "../navigation/RootStackNavigator";
import {usePeer} from "../hooks/usePeer";

type Props = Readonly<
  NativeStackScreenProps<RootStackParamList, ROOT_STACK_SCREENS.HOME>
>;

export default function HomeScreen({route}: Props) {
  const qrData = route.params?.data ?? "";
  const id = usePeer(qrData);

  return (
    <ThemedView style={styles.container}>
      <ThemedText>ID: {id}</ThemedText>
      <ThemedText>Image: {}</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
