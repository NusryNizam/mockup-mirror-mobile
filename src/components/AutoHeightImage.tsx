import {useState} from 'react';
import {Image} from 'react-native';

type AutoHeightImageProps = Readonly<{
  uri: string;
  width: number;
}>;

/**
 * Renders a remote/data-URI image at a fixed width, deriving its height from the
 * image's natural aspect ratio. Unlike react-native-auto-height-image, this reads
 * the size from the <Image> onLoad event (the decode used for rendering) instead
 * of Image.getSize(), which no longer resolves for `data:` URIs on RN 0.87 /
 * New Architecture.
 */
export default function AutoHeightImage({uri, width}: AutoHeightImageProps) {
  const [aspectRatio, setAspectRatio] = useState<number>();

  return (
    <Image
      source={{uri}}
      resizeMode="contain"
      onLoad={({nativeEvent: {source}}) => {
        if (source.width > 0 && source.height > 0) {
          setAspectRatio(source.width / source.height);
        }
      }}
      style={{
        width,
        aspectRatio,
        height: aspectRatio ? undefined : width * 1.4,
      }}
    />
  );
}
