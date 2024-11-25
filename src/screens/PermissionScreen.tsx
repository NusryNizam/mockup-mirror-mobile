import {useCameraPermissions, ScanningResult, CameraView} from "expo-camera";
import {
  StyleSheet,
  ActivityIndicator,
  StatusBar,
  useColorScheme,
} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {Colors} from "react-native/Libraries/NewAppScreen";
import {ThemedButton} from "../components/ThemedButton";
import {ThemedText} from "../components/ThemedText";
import {ThemedView} from "../components/ThemedView";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "../navigation/RootStackNavigator";
import { ROOT_STACK_SCREENS } from "../navigation/constants";


type Props = Readonly<
  NativeStackScreenProps<RootStackParamList, ROOT_STACK_SCREENS.PERMISSION>
>;

export default function PermissionScreen({navigation}: Props) {
  const [permission, requestPermission] = useCameraPermissions();

  const isDarkMode = useColorScheme() === "dark";

  const backgroundStyle = {
    backgroundColor: isDarkMode
      ? Colors.dark.background
      : Colors.light.background,
  };

  const loaderColor = isDarkMode ? Colors.dark.tint : Colors.light.tint;

  const handleScan = (result: ScanningResult) => {
    console.log("Scanned: ", result);
    navigation.replace(ROOT_STACK_SCREENS.HOME, {data: result.data});
  };

  if (!permission) {
    // Camera permissions are still loading.
    return (
      <ThemedView>
        <ActivityIndicator color={loaderColor} />
      </ThemedView>
    );
  }

  if (!permission.granted) {
    return (
      <ThemedView>
        <ThemedText></ThemedText>
        <ThemedText style={styles.message}>
          We need your permission to show the camera
        </ThemedText>
        <ThemedButton text="Grant permission" onPress={requestPermission} />
      </ThemedView>
    );
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Setup Your Connection</ThemedText>
        <ThemedText>Scan the QR Code to get started</ThemedText>
        <ThemedText></ThemedText>

        <CameraView
          facing="back"
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
          onBarcodeScanned={handleScan}
          style={styles.camera}
        />

        {!permission.granted ? (
          <ThemedView>
            <ThemedText></ThemedText>
            <ThemedText style={styles.message}>
              We need your permission to show the camera
            </ThemedText>
            <ThemedButton text="Grant permission" onPress={requestPermission} />
          </ThemedView>
        ) : null}
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
  },
  highlight: {
    fontWeight: "700",
  },
  stepContainer: {
    padding: 24,
    gap: 8,
    marginBottom: 8,
    height: "100%",
  },
  camera: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 8,
  },

  message: {
    paddingBottom: 10,
  },
});
