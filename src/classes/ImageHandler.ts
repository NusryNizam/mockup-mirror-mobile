import 'text-encoding';

const PROTOCOL = {
  STREAM_START: 'STREAM START',
  STREAM_END: 'STREAM END',
  START: 'START',
  END: 'END',
} as const;

export class ImageStreamHandler {
  private decoder = new TextDecoder();
  private currentImage: string[] = [];
  private images: string[] = [];
  private isReceiving = false;
  private listeners: ((streaming: boolean) => void)[] = [];

  handleChunk(data: Uint8Array) {
    const decodedData = this.decoder.decode(data);

    switch (decodedData) {
      case PROTOCOL.STREAM_START:
        this.images = [];
        this.listeners.forEach(fn => fn(true));
        break;

      case PROTOCOL.START:
        this.isReceiving = true;
        this.currentImage = [];
        break;

      case PROTOCOL.END:
        this.isReceiving = false;
        this.images.push(this.currentImage.join(''));
        this.currentImage = [];
        break;

      case PROTOCOL.STREAM_END:
        this.listeners.forEach(fn => fn(false));
        break;

      default:
        if (this.isReceiving) {
          this.currentImage.push(decodedData);
        }
    }
  }

  getImages(): string[] {
    if (this.isReceiving) {
      return [];
    }
    return this.images.map(base64 => `data:image/png;base64,${base64}`);
  }

  getIsReceiving() {
    return this.isReceiving;
  }

  subscribe(
    _event: 'streamingStateChanged',
    callback: (streaming: boolean) => void,
  ) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(fn => fn !== callback);
    };
  }

  reset() {
    this.currentImage = [];
    this.images = [];
    this.isReceiving = false;
  }
}
