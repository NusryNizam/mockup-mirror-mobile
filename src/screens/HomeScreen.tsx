import {
  FlatList,
  ListRenderItemInfo,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

import {ThemedView} from '../components/ThemedView';
import {ThemedText} from '../components/ThemedText';
import {ROOT_STACK_SCREENS} from '../navigation/constants';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/RootStackNavigator';
import {usePeer} from '../hooks/usePeer';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../constants/constants';
import AutoHeightImage from 'react-native-auto-height-image';
import {useCallback, useEffect, useState} from 'react';
import {Svgs} from '../themes/svgs';
import ThemedIconButton from '../components/ThemedIconButton';
import {useNavigation} from '@react-navigation/native';
import {ThemedButton} from '../components/ThemedButton';
import {useColors} from '../contexts/ColorContext';
import {createStyleSheet, useStyles} from '../hooks/useStyles';

type Props = Readonly<
  NativeStackScreenProps<RootStackParamList, ROOT_STACK_SCREENS.HOME>
>;
export default function HomeScreen({route}: Props) {
  const {colors} = useColors();
  const styles = useStyles(stylesFn);

  const [isOverlay, setIsOverlay] = useState(false);
  const qrData = route.params?.data ?? '';
  const {images, clearImages, isConnected} = usePeer(qrData);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleClearImages = useCallback(() => {
    clearImages();
  }, []);

  const handleReconnect = useCallback(() => {
    navigation.replace(ROOT_STACK_SCREENS.PERMISSION);
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isOverlay) {
      setTimeout(() => {
        setIsOverlay(false);
      }, 3000);
    }

    return () => clearTimeout(timeout);
  });

  const renderImage = useCallback(({item}: ListRenderItemInfo<string>) => {
    return (
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <Pressable
          style={{
            position: 'absolute',
            inset: 0,
            height: '100%',
            backgroundColor: 'transparent',
            zIndex: 1,
          }}
          onPress={() => setIsOverlay(true)}></Pressable>
        <AutoHeightImage width={DEVICE_WIDTH} source={{uri: item}} />
      </ScrollView>
    );
  }, []);

  const renderEmptyComponent = useCallback(() => {
    return (
      <ThemedView style={styles.empty}>
        <ThemedView style={{height: 32}}></ThemedView>
        <ThemedText
          style={{...styles.emptyText, ...styles.mainText}}
          type="defaultSemiBold">
          Your selected boards will appear here
        </ThemedText>
        <ThemedText type="caption" style={styles.emptyText}>
          Select one or more boards in Penpot to preview{'\n'}
        </ThemedText>

        <ThemedView style={{height: 64}}></ThemedView>

        <ThemedView style={styles.row}>
          <Svgs.SwipeHorizontal
            opacity={0.5}
            fill={colors.foreground.secondary}
          />
          <ThemedText type="small" style={{opacity: 0.5}}>
            Swipe left to view the next board
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.row}>
          <Svgs.SwipeVertical
            opacity={0.5}
            fill={colors.foreground.secondary}
          />
          <ThemedText type="small" style={{opacity: 0.5}}>
            Swipe up/down to scroll long boards
          </ThemedText>
        </ThemedView>
      </ThemedView>
    );
  }, []);

  return (
    <ThemedView style={styles.container}>
      <StatusBar hidden={true} />

      {isOverlay ? (
        <ThemedView style={styles.overlay}>
          <ThemedIconButton
            Icon={Svgs.Clear}
            action="Clear Images"
            onPress={handleClearImages}
          />

          {isConnected ? null : (
            <ThemedIconButton
              Icon={Svgs.Scan}
              action="Reconnect"
              onPress={handleReconnect}
            />
          )}
        </ThemedView>
      ) : null}

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

const stylesFn = createStyleSheet((color) => ({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    position: 'relative',
  },
  flatlist: {
    height: DEVICE_HEIGHT,
    width: DEVICE_WIDTH,
  },
  empty: {
    flex: 1,
    width: DEVICE_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  mainText: {
    marginBottom: 4,
  },
  emptyText: {
    textAlign: 'center',
  },

  overlay: {
    position: 'absolute',
    zIndex: 1,
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
    backgroundColor: 'rgba(0, 0,0, 0.86)',
    display: 'flex',
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
  },

  lostText: {
    textAlign: 'center',
    width: DEVICE_WIDTH - 48,
    marginBottom: 8,
    color: 'red',
  },

  row: {
    flexDirection: 'row',
    gap: 16,
    padding: 8,
    alignItems: 'center',
  },
}));
