import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {IconType} from './BackIcon';

export default function DropUpIcon({
  width = '12',
  height = '8',
  fillColor = '#787878',
}: IconType): JSX.Element {
  return (
    <Svg width={width} height={height} viewBox={'0 0 12 7'}>
      <Path
        d={
          'M6.00071 3.49938L1.99976 7L-2.5046e-07 5.25031L5.99929 0L12 5.25031L10.0002 7L5.99929 3.49938H6.00071Z'
        }
        fill={fillColor}
      />
    </Svg>
  );
}
