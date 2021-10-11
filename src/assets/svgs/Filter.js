import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent() {
  return (
    <Svg
      width={20}
      height={16}
      viewBox="0 0 20 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path d="M20 .222H0L8 8.41v5.662l4 1.73V8.41l8-8.188z" fill="#fff" />
    </Svg>
  );
}

export default SvgComponent;
