import * as React from 'react';
import Svg, {Path, Circle} from 'react-native-svg';

function SvgComponent() {
  return (
    <Svg
      width={19}
      height={19}
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M9.5 18a8.5 8.5 0 100-17 8.5 8.5 0 000 17zM9.5 12.9V9.5"
        stroke="#3AAFA9"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx={9.5} cy={6.1} r={0.85} fill="#3AAFA9" />
    </Svg>
  );
}

export default SvgComponent;
