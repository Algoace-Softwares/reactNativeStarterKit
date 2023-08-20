import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {IconType} from './BackIcon';

export default function CameraIcon({
  width = '30',
  height = '25',
  fillColor = 'black',
}: IconType): JSX.Element {
  return (
    <Svg width={width} height={height} viewBox={'0 0 20 17'}>
      <Path
        d={
          'M18.3901 13.6547C18.3901 14.0706 18.225 14.4694 17.9309 14.7634C17.6369 15.0574 17.2381 15.2226 16.8222 15.2226H2.7111C2.29526 15.2226 1.89646 15.0574 1.60242 14.7634C1.30838 14.4694 1.14319 14.0706 1.14319 13.6547V5.03124C1.14319 4.61541 1.30838 4.21661 1.60242 3.92257C1.89646 3.62853 2.29526 3.46334 2.7111 3.46334H5.84691L7.41481 1.11148H12.1185L13.6864 3.46334H16.8222C17.2381 3.46334 17.6369 3.62853 17.9309 3.92257C18.225 4.21661 18.3901 4.61541 18.3901 5.03124V13.6547Z'
        }
        stroke={fillColor}
        stroke-width={'1.5679'}
        stroke-linecap={'round'}
        stroke-linejoin={'round'}
      />
      <Path
        d={
          'M9.76667 12.0868C11.4985 12.0868 12.9025 10.6829 12.9025 8.95101C12.9025 7.21915 11.4985 5.8152 9.76667 5.8152C8.03481 5.8152 6.63086 7.21915 6.63086 8.95101C6.63086 10.6829 8.03481 12.0868 9.76667 12.0868Z'
        }
        stroke={fillColor}
        stroke-width={'1.5679'}
        stroke-linecap={'round'}
        stroke-linejoin={'round'}
      />
    </Svg>
  );
}
