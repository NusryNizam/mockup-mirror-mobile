import {useCallback, useEffect, useState} from 'react';

// since this doesn't have TS bindings
// @ts-ignore
import Peer from 'react-native-peerjs';

import {ImageStreamHandler} from '../classes/ImageHandler';

export const usePeer = (qrData: string) => {
  const [peer] = useState(new Peer()); // Create peer instance once
  const [id, setId] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  const clearImages = useCallback(() => {
    setImages([]);
  }, []);

  const disconnect = useCallback(() => {
    peer.disconnect();
  }, [peer]);

  useEffect(() => {
    const imageHandler = new ImageStreamHandler();

    try {
      // 1. Initialize peer first
      peer.on('open', (myId: string) => {
        console.log('My peer ID:', myId);

        // 2. Then try to connect to the scanned peer
        const decodedData = atob(qrData);
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
            setImages(imageHandler.getImages());
          } catch (error) {
            console.error('Error decoding received message:', error);
          }
        });

        conn.on('error', (error: any) => {
          console.error('Connection error:', error);
          setIsConnected(false);
        });

        conn.on('close', () => {
          setIsConnected(false);
          console.log('Connection closed');
        });
      });
    } catch (error) {
      console.error('Error in connection setup:', error);
    }

    return () => {
      peer.destroy();
      setIsConnected(false);
    };
  }, [qrData, peer]);

  return {id, images, clearImages, isConnected, disconnect};
};
