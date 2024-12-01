import 'text-encoding';

export class ImageStreamHandler {
  private currentImage: string[] = [];
  private images: string[] = [];
  private isReceiving = false;

  handleChunk(data: Uint8Array) {
    const decoder = new TextDecoder();
    const decodedData = decoder.decode(data);

    switch (decodedData) {
      case 'START OVER':
        this.images = [];
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

      default:
        if (this.isReceiving) {
          this.currentImage.push(decodedData);
        }
    }
  }

  getImages() {
    return this.images.map(base64 => `data:image/png;base64,${base64}`);
  }

  reset() {
    this.currentImage = [];
    this.images = [];
    this.isReceiving = false;
  }
}
