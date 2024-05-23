import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {IconType} from './BackIcon';

export default function DropDownIcon({
  width = '12',
  height = '8',
  fillColor = '#787878',
}: IconType): JSX.Element {
  return (
    <Svg width={width} height={height} viewBox={'0 0 12 8'}>
      <Path
        d={'M1.41 0.589844L6 5.16984L10.59 0.589844L12 1.99984L6 7.99984L0 1.99984L1.41 0.589844Z'}
        fill={fillColor}
      />
    </Svg>
  );
}
