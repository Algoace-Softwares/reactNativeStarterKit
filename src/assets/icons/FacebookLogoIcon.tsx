import React from 'react';
import Svg, {Path} from 'react-native-svg';

export interface IconType {
  fillColor: string;
  width: string;
  height: string;
}

export default function FacebookLogoIcon({
  fillColor = '#1877F2',
  width = '256',
  height = '256',
}: IconType): JSX.Element {
  return (
    <Svg width={width} height={height} viewBox={'0 0 256 255'}>
      <Path
        d={
          'M256 128C256 57.308 198.692 0 128 0C57.308 0 0 57.307 0 128C0 191.888 46.808 244.843 108 254.445V165H75.5V128H108V99.8C108 67.72 127.11 50 156.347 50C170.352 50 185 52.5 185 52.5V84H168.86C152.958 84 148 93.867 148 103.99V128H183.5L177.825 165H148V254.445C209.192 244.843 256 191.889 256 128Z'
        }
        fill={fillColor}
      />
    </Svg>
  );
}
