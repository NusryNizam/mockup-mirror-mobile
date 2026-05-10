/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {useCallback, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItemInfo,
  Pressable,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';

import Spacer from '../components/Spacer';
import ThemedIcon from '../components/ThemedIcon';
import ThemedIconButton from '../components/ThemedIconButton';
import {ThemedText} from '../components/ThemedText';
import {ThemedView} from '../components/ThemedView';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../constants/constants';
import {useColors} from '../contexts/ColorContext';
import {usePeer} from '../hooks/usePeer';
import {createStyleSheet, useStyles} from '../hooks/useStyles';
import {ROOT_STACK_SCREENS} from '../navigation/constants';
import {RootStackParamList} from '../navigation/RootStackNavigator';
import {Svgs} from '../themes/svgs';

type Props = Readonly<
  NativeStackScreenProps<RootStackParamList, ROOT_STACK_SCREENS.HOME>
>;
export default function HomeScreen({route}: Props) {
  const styles = useStyles(stylesFn);

  const flatlistRef = useRef<FlatList>(null);
  const [isOverlay, setIsOverlay] = useState(false);
  const qrData = route.params?.data ?? '';
  const {images, clearImages, isConnected, disconnect, isStreamingData, error} =
    usePeer(qrData);

  const {colors} = useColors();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleReconnect = useCallback(() => {
    disconnect();
    navigation.replace(ROOT_STACK_SCREENS.PERMISSION);
  }, [disconnect, navigation]);

  useEffect(() => {
    if (!isOverlay) return;
    const timeout = setTimeout(() => setIsOverlay(false), 3000);
    return () => clearTimeout(timeout);
  }, [isOverlay]);

  useEffect(() => {
    if (!isStreamingData) {
      flatlistRef.current?.scrollToOffset({animated: true, offset: 0});
    }
  }, [isStreamingData]);

  const renderImage = useCallback(
    ({item}: ListRenderItemInfo<string>) => {
      return (
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}>
          <Pressable style={styles.button} onPress={() => setIsOverlay(true)} />
          <AutoHeightImage width={DEVICE_WIDTH} source={{uri: item}} />
        </ScrollView>
      );
    },
    [styles.button, styles.scrollView],
  );

  const renderEmptyComponent = useCallback(() => {
    return (
      <ThemedView style={styles.empty}>
        <ThemedView style={{height: 32}} />
        <ThemedText
          style={{...styles.emptyText, ...styles.mainText}}
          type="defaultSemiBold">
          Your selected boards will appear here
        </ThemedText>
        <ThemedText type="caption" style={styles.emptyText}>
          Select one or more boards in Penpot to preview{'\n'}
        </ThemedText>

        <ThemedView style={{height: 64}} />

        <ThemedView style={styles.row}>
          <ThemedIcon name="SwipeHorizontal" opacity={0.4} />
          <ThemedText type="small" style={{opacity: 0.5}}>
            Swipe left to view the next board
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.row}>
          <ThemedIcon name="SwipeVertical" opacity={0.4} />
          <ThemedText type="small" style={{opacity: 0.5}}>
            Swipe up/down to scroll long boards
          </ThemedText>
        </ThemedView>

        <Spacer height={32} />
        {error ? (
          <ThemedText
            type="small"
            style={{
              opacity: 0.7,
              color: 'red',
              textAlign: 'center',
              marginBottom: 8,
            }}>
            {error}
          </ThemedText>
        ) : null}
        <TouchableOpacity onPress={handleReconnect}>
          <ThemedText
            type="link"
            smallText={true}
            style={{textDecorationLine: 'underline'}}>
            Reset Connection
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    );
  }, [
    error,
    handleReconnect,
    styles.empty,
    styles.emptyText,
    styles.mainText,
    styles.row,
  ]);

  return (
    <ThemedView style={styles.container}>
      <StatusBar hidden={true} />

      {isOverlay ? (
        <ThemedView style={styles.overlay}>
          <ThemedIconButton
            Icon={Svgs.Clear}
            action="Clear Images"
            onPress={clearImages}
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
        ref={flatlistRef}
        style={styles.flatlist}
        horizontal={true}
        data={images}
        renderItem={renderImage}
        getItemLayout={(_, index) => ({
          length: DEVICE_WIDTH,
          offset: DEVICE_WIDTH * index,
          index,
        })}
        keyExtractor={(_, index) => index.toString()}
        snapToAlignment="start"
        decelerationRate="fast"
        snapToInterval={DEVICE_WIDTH}
        ListEmptyComponent={
          isStreamingData ? (
            <ThemedView style={styles.fullscreen}>
              <ActivityIndicator size={20} color={colors.accent.primary} />
            </ThemedView>
          ) : (
            renderEmptyComponent
          )
        }
        showsHorizontalScrollIndicator={false}
      />
    </ThemedView>
  );
}

const stylesFn = createStyleSheet(_color => ({
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
  row: {
    flexDirection: 'row',
    gap: 16,
    padding: 8,
    alignItems: 'center',
  },
  fullscreen: {
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    position: 'absolute',
    inset: 0,
    height: '100%',
    backgroundColor: 'transparent',
    width: DEVICE_WIDTH,
    zIndex: 1,
  },
}));
