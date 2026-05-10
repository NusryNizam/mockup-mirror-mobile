import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Camera,
  Code,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';

import Spacer from '../components/Spacer';
import {ThemedButton} from '../components/ThemedButton';
import {ThemedText} from '../components/ThemedText';
import {ThemedView} from '../components/ThemedView';
import {DEVICE_WIDTH} from '../constants/constants';
import {useColors} from '../contexts/ColorContext';
import {createStyleSheet, useStyles} from '../hooks/useStyles';
import {ROOT_STACK_SCREENS} from '../navigation/constants';
import {RootStackParamList} from '../navigation/RootStackNavigator';

type Props = Readonly<
  NativeStackScreenProps<RootStackParamList, ROOT_STACK_SCREENS.PERMISSION>
>;

export default function PermissionScreen({navigation}: Props) {
  const styles = useStyles(stylesFn);
  const {hasPermission, requestPermission} = useCameraPermission();
  const device = useCameraDevice('back');

  const {colors} = useColors();
  const backgroundStyle = {backgroundColor: colors.background.primary};

  const handleScan = (result: Code[]) => {
    navigation.replace(ROOT_STACK_SCREENS.HOME, {data: result[0].value ?? ''});
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle="default"
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Setup Your Connection</ThemedText>
        <ThemedText>Scan the QR Code to get started</ThemedText>
        <ThemedText type="caption">
          Make sure both your devices are on the same Wi-Fi network
        </ThemedText>
        <Spacer height={8} />

        {hasPermission && device ? (
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

        {hasPermission && !device ? (
          <ThemedText style={styles.message}>
            No camera found on this device
          </ThemedText>
        ) : null}

        {!hasPermission ? (
          <ThemedView>
            <ThemedView style={styles.cameraPlaceholder} />
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
