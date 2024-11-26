import {useEffect, useState} from "react";
import Peer from "react-native-peerjs";

export const usePeer = (qrData: string) => {
  const [peer] = useState(new Peer()); // Create peer instance once
  const [id, setId] = useState("");

  useEffect(() => {
    try {
      // 1. Initialize peer first
      peer.on("open", (myId: string) => {
        console.log("My peer ID:", myId);

        // 2. Then try to connect to the scanned peer
        const decodedData = atob(qrData);
        console.log("Decoded peer ID:", decodedData);
        setId(decodedData);

        // 3. Create connection
        const conn = peer.connect(decodedData);

        // 4. Handle connection events
        conn.on("open", () => {
          // Remove the id parameter - it's not provided
          console.log("Connection opened with:", conn.peer);

          // 5. Send data
          try {
            const message = "Hi!!";
            // const encodedMessage = btoa(message);

            const encoder = new TextEncoder();
            const encodedData = encoder.encode(message);
            conn.send(encodedData.buffer);
            console.log("Sent message:", message);
          } catch (error) {
            console.error("Error sending message:", error);
          }
        });

        conn.on("error", (error: any) => {
          console.error("Connection error:", error);
        });
      });
    } catch (error) {
      console.error("Error in connection setup:", error);
    }
  }, [qrData]);

  return id;
};
