import 'text-encoding';

declare const TextDecoder: new () => {decode(data?: BufferSource): string};

const PROTOCOL = {
  STREAM_START: 'STREAM START',
  STREAM_END: 'STREAM END',
  START: 'START',
  END: 'END',
} as const;

type StreamingListener = (streaming: boolean) => void;
type ImageAddedListener = (images: string[]) => void;

export class ImageStreamHandler {
  private decoder = new TextDecoder();
  private currentImage: string[] = [];
  private images: string[] = [];
  private isReceiving = false;
  private streamingListeners: StreamingListener[] = [];
  private imageAddedListeners: ImageAddedListener[] = [];

  handleChunk(data: Uint8Array | ArrayBuffer | string) {
    const decodedData =
      typeof data === 'string'
        ? data
        : this.decoder.decode(
            data instanceof ArrayBuffer ? new Uint8Array(data) : data,
          );

    switch (decodedData) {
      case PROTOCOL.STREAM_START:
        this.images = [];
        this.currentImage = [];
        this.isReceiving = false;
        this.streamingListeners.forEach(fn => fn(true));
        break;

      case PROTOCOL.START:
        this.isReceiving = true;
        this.currentImage = [];
        break;

      case PROTOCOL.END: {
        this.isReceiving = false;
        this.images.push(this.currentImage.join(''));
        this.currentImage = [];
        const snapshot = this.images.map(
          b64 => `data:image/jpeg;base64,${b64}`,
        );
        this.imageAddedListeners.forEach(fn => fn(snapshot));
        break;
      }

      case PROTOCOL.STREAM_END:
        this.streamingListeners.forEach(fn => fn(false));
        break;

      default:
        if (this.isReceiving) {
          this.currentImage.push(decodedData);
        }
    }
  }

  subscribe(
    event: 'streamingStateChanged',
    callback: StreamingListener,
  ): () => void;

  subscribe(event: 'imageAdded', callback: ImageAddedListener): () => void;

  subscribe(
    event: 'streamingStateChanged' | 'imageAdded',
    callback: StreamingListener | ImageAddedListener,
  ): () => void {
    if (event === 'streamingStateChanged') {
      this.streamingListeners.push(callback as StreamingListener);
      return () => {
        this.streamingListeners = this.streamingListeners.filter(
          fn => fn !== callback,
        );
      };
    } else {
      this.imageAddedListeners.push(callback as ImageAddedListener);
      return () => {
        this.imageAddedListeners = this.imageAddedListeners.filter(
          fn => fn !== callback,
        );
      };
    }
  }

  reset() {
    this.currentImage = [];
    this.images = [];
    this.isReceiving = false;
  }
}
