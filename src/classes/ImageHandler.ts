import EventEmitter from 'react-native/Libraries/vendor/emitter/EventEmitter';
import 'text-encoding';

export class ImageStreamHandler {
  private currentImage: string[] = [];
  private images: string[] = [];
  private isReceiving = false;
  private emitter = new EventEmitter();

  handleChunk(data: Uint8Array) {
    const decoder = new TextDecoder();
    const decodedData = decoder.decode(data);

    switch (decodedData) {
      case 'STREAM START':
        this.images = [];
        this.emitter.emit('streamingStateChanged', true);
        break;

      case 'START':
        this.isReceiving = true;
        this.currentImage = [];
        break;

      case 'END':
        this.isReceiving = false;
        this.images.push(this.currentImage.join(''));
        this.currentImage = [];
        break;

      case 'STREAM END':
        this.emitter.emit('streamingStateChanged', false);
        break;

      default:
        if (this.isReceiving) {
          this.currentImage.push(decodedData);
        }
    }
  }

  getImages() {
    if (!this.isReceiving) {
      return this.images.map(base64 => `data:image/png;base64,${base64}`);
    }
  }

  getIsReceiving() {
    return this.isReceiving;
  }

  subscribe(event: 'streamingStateChanged', callback: (data: any) => void) {
    this.emitter.addListener(event, callback);
    return () => this.emitter.removeAllListeners();
  }

  reset() {
    this.currentImage = [];
    this.images = [];
    this.isReceiving = false;
  }
}
