import {useCallback, useEffect, useRef, useState} from 'react';
// @ts-expect-error since this doesn't have TS bindings
import Peer from 'react-native-peerjs';

import {ImageStreamHandler} from '../classes/ImageHandler';

const imageHandler = new ImageStreamHandler();

export const usePeer = (qrData: string) => {
  const [peer] = useState(new Peer()); // Create peer instance once
  const [id, setId] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isStreamingData, setIsStreamingData] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isStreamingRef = useRef(false);

  const clearImages = useCallback(() => {
    setImages([]);
    imageHandler.reset();
  }, []);

  const disconnect = useCallback(() => {
    peer.disconnect();
  }, [peer]);

  useEffect(() => {
    try {
      // 1. Initialize peer first
      peer.on('open', (myId: string) => {
        console.log('My peer ID:', myId);

        // 2. Then try to connect to the scanned peer
        const decodedData = (
          globalThis as typeof globalThis & {atob: (s: string) => string}
        ).atob(qrData);
        setId(decodedData);

        // 3. Create connection
        const conn = peer.connect(decodedData, {
          serialization: 'binary',
          reliable: true,
        });

        // 4. Handle connection events
        conn.on('open', () => {
          console.log('Connection opened with:', conn.peer);
          setIsConnected(true);
        });

        conn.on('data', async (data: Uint8Array) => {
          try {
            imageHandler.handleChunk(data);

            if (!isStreamingRef.current) {
              setImages(imageHandler.getImages());
            }
          } catch (error) {
            console.error('Error decoding received message:', error);
          }
        });

        conn.on('error', (err: any) => {
          console.error('Connection error:', err);
          setIsConnected(false);
          setError(err?.message ?? 'Connection error');
        });

        conn.on('close', () => {
          setIsConnected(false);
          console.log('Connection closed');
        });
      });
    } catch (err: any) {
      console.error('Error in connection setup:', err);
      setError(err?.message ?? 'Failed to connect');
    }

    return () => {
      peer.destroy();
      setIsConnected(false);
    };
  }, [qrData, peer]);

  useEffect(() => {
    const unsubscribeStreaming = imageHandler.subscribe(
      'streamingStateChanged',
      (newState: boolean) => {
        isStreamingRef.current = newState;
        setIsStreamingData(newState);
      },
    );

    return () => {
      unsubscribeStreaming();
    };
  }, []);

  return {
    id,
    images,
    clearImages,
    isConnected,
    disconnect,
    isStreamingData,
    error,
  };
};
