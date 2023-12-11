export type SpritedImage = {
  h?: number;
  loggingID?: string;
  p?: string;
  spi?: string;
  sprited?: number;
  sz?: string;
  w?: number;
  _spi?: string;
};

export type BaseImage_DEPRECATEDProps = {
  alt: string;
  testid?: string;
  onLoad?: () => any;
  src?: SpritedImage;
  className?: string;
  draggable?: boolean;
  height?: string;
  width?: string;
  style?: CSSProperties;
};
