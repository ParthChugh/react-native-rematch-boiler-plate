import * as React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';

function SvgComponent() {
  return (
    <Svg
      width={42}
      height={42}
      viewBox="0 0 42 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Circle cx={21} cy={21} r={21} fill="#3AAFA9" />
      <Path
        d="M29 30v-2a4 4 0 00-4-4h-8a4 4 0 00-4 4v2M21 20a4 4 0 100-8 4 4 0 000 8z"
        fill="#fff"
      />
    </Svg>
  );
}

export default SvgComponent;
