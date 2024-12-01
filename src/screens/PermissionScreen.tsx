import {StatusBar, useColorScheme} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {ThemedButton} from '../components/ThemedButton';
import {ThemedText} from '../components/ThemedText';
import {ThemedView} from '../components/ThemedView';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/RootStackNavigator';
import {ROOT_STACK_SCREENS} from '../navigation/constants';
import {
  useCameraPermission,
  useCameraDevice,
  Camera,
  Code,
} from 'react-native-vision-camera';
import {DEVICE_WIDTH} from '../constants/constants';
import {createStyleSheet, useStyles} from '../hooks/useStyles';
import Spacer from '../components/Spacer';

type Props = Readonly<
  NativeStackScreenProps<RootStackParamList, ROOT_STACK_SCREENS.PERMISSION>
>;

export default function PermissionScreen({navigation}: Props) {
  const styles = useStyles(stylesFn);
  const {hasPermission, requestPermission} = useCameraPermission();
  const device = useCameraDevice('back');

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode
      ? Colors.dark.background
      : Colors.light.background,
  };

  const handleScan = (result: Code[]) => {
    navigation.replace(ROOT_STACK_SCREENS.HOME, {data: result[0].value ?? ''});
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Setup Your Connection</ThemedText>
        <ThemedText>Scan the QR Code to get started</ThemedText>
        <ThemedText type="caption">
          Make sure both your devices are on the same Wi-Fi network
        </ThemedText>
        <Spacer height={8} />

        {device && hasPermission ? (
          <ThemedView style={styles.cameraWrapper}>
            <Camera
              device={device}
              isActive={true}
              codeScanner={{
                codeTypes: ['qr'],
                onCodeScanned: code => handleScan(code),
              }}
              style={styles.camera}
            />
          </ThemedView>
        ) : null}

        {!hasPermission ? (
          <ThemedView>
            <ThemedView style={styles.cameraPlaceholder}></ThemedView>
            <Spacer height={8} />
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

const stylesFn = createStyleSheet(color => ({
  container: {},
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
    height: '100%',
  },

  cameraWrapper: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  camera: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 8,
  },

  message: {
    paddingBottom: 10,
  },

  cameraPlaceholder: {
    aspectRatio: 1,
    width: DEVICE_WIDTH - 48,
    borderRadius: 8,
    backgroundColor: color.foreground.primary,
    opacity: 0.08,
  },
}));
