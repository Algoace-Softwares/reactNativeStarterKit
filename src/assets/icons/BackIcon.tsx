import React from 'react';
import Svg, {Path} from 'react-native-svg';

export interface IconType {
  fillColor: string;
  width: string;
  height: string;
}

export default function BackIcon({
  fillColor = 'white',
  width = '10',
  height = '15',
}: IconType): JSX.Element {
  return (
    <Svg width={width} height={height} viewBox={'0 0 10 15'}>
      <Path
        d={
          'M9.63403 2.15256L4.20588 7.59256L9.63403 13.0326L7.96292 14.7037L0.851811 7.59256L7.96292 0.481445L9.63403 2.15256Z'
        }
        fill={fillColor}
      />
    </Svg>
  );
}
