
 
import { ThemedButton } from './src/components/ThemedButton';
import { ThemedText } from './src/components/ThemedText';
import { ThemedView } from './src/components/ThemedView';
import { CameraView, ScanningResult, useCameraPermissions } from 'expo-camera';
import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.dark.text : Colors.light.text,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light.text : Colors.dark.text,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): React.JSX.Element {
  const [permission, requestPermission] = useCameraPermissions();

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.dark.background : Colors.light.background,
  };

  const handleScan = (result: ScanningResult) => {
    console.log("Scanned: ", result);
  };

  if (!permission) {
    // Camera permissions are still loading.
    return <ThemedView />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <ThemedView style={styles.container}>
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
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
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
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
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
    textAlign: "center",
    paddingBottom: 10,
  },
});

export default App;
