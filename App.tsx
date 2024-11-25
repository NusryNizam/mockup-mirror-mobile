import {ThemedButton} from "./src/components/ThemedButton";
import {ThemedText} from "./src/components/ThemedText";
import {ThemedView} from "./src/components/ThemedView";
import {CameraView, ScanningResult, useCameraPermissions} from "expo-camera";
import React from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from "react-native";
import {Colors} from "./src/constants/Colors";

function App(): React.JSX.Element {
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
  };

  if (!permission) {
    // Camera permissions are still loading.
    return (
      <ThemedView>
        <ActivityIndicator color={loaderColor} />
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

  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  message: {
    paddingBottom: 10,
  },
});

export default App;
