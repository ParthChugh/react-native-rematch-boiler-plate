import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent() {
  return (
    <Svg
      width={14}
      height={14}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        opacity={0.7}
        d="M6.333 11.667A5.333 5.333 0 106.333 1a5.333 5.333 0 000 10.667zM13 13l-2.9-2.9"
        stroke="#2B292E"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgComponent;
