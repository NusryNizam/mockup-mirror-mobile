import {StyleSheet} from "react-native";

import {ThemedView} from "../components/ThemedView";
import {ThemedText} from "../components/ThemedText";
import {ROOT_STACK_SCREENS} from "../navigation/constants";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "../navigation/RootStackNavigator";
 
  
type Props = Readonly<
  NativeStackScreenProps<RootStackParamList, ROOT_STACK_SCREENS.HOME>
>;
 

export default function HomeScreen({route}: Props) {
  const data = route.params?.data ?? "";
  console.log(data)

  return (
    <ThemedView style={styles.container}>
      <ThemedText>Status: { }</ThemedText>
      <ThemedText>Image: { }</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
