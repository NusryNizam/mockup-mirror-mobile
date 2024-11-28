import {
  FlatList,
  ListRenderItemInfo,
  ScrollView,
  StatusBar,
  StyleSheet,
} from "react-native";

import {ThemedView} from "../components/ThemedView";
import {ThemedText} from "../components/ThemedText";
import {ROOT_STACK_SCREENS} from "../navigation/constants";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "../navigation/RootStackNavigator";
import {usePeer} from "../hooks/usePeer";
import {DEVICE_HEIGHT, DEVICE_WIDTH} from "../constants/constants";
import AutoHeightImage from "react-native-auto-height-image";
import {useCallback} from "react";

type Props = Readonly<
  NativeStackScreenProps<RootStackParamList, ROOT_STACK_SCREENS.HOME>
>;
export default function HomeScreen({route}: Props) {
  const qrData = route.params?.data ?? "";
  const {images} = usePeer(qrData);

  console.log("Images");
  console.log(images);

  const renderImage = useCallback(({item}: ListRenderItemInfo<string>) => {
    return (
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <AutoHeightImage width={DEVICE_WIDTH} source={{uri: item}} />
      </ScrollView>
    );
  }, []);

  const renderEmptyComponent = useCallback(() => {
    return (
      <ThemedView style={styles.empty}>
        <ThemedText
          style={{...styles.emptyText, ...styles.mainText}}
          type="defaultSemiBold">
          Your selected boards will appear here
        </ThemedText>
        <ThemedText type="caption" style={styles.emptyText}>
          Select one or more boards in Penpot to get started
        </ThemedText>
      </ThemedView>
    );
  }, []);

  return (
    <ThemedView style={styles.container}>
      <StatusBar hidden={true} />

      <FlatList
        style={styles.flatlist}
        horizontal={true}
        data={images}
        renderItem={image => renderImage(image)}
        keyExtractor={(_, index) => index.toString()}
        snapToAlignment="start"
        decelerationRate="fast"
        snapToInterval={DEVICE_WIDTH}
        ListEmptyComponent={renderEmptyComponent}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  flatlist: {
    height: DEVICE_HEIGHT,
    width: DEVICE_WIDTH,
  },
  empty: {
    flex: 1,
    width: DEVICE_WIDTH,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  mainText: {
    marginBottom: 4,
  },
  emptyText: {
    textAlign: "center",
  },
});
