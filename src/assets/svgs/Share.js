import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';

function SvgComponent() {
  return (
    <Svg
      width={13}
      height={13}
      marginTop={10}
      viewBox="0 0 13 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <G
        opacity={0.7}
        stroke="#2B292E"
        strokeLinecap="round"
        strokeLinejoin="round">
        <Path d="M5.417 7.041a2.709 2.709 0 004.084.293l1.625-1.625a2.708 2.708 0 00-3.83-3.83l-.931.927" />
        <Path d="M7.583 5.958A2.708 2.708 0 003.5 5.666L1.874 7.29a2.708 2.708 0 003.83 3.83l.926-.927" />
      </G>
    </Svg>
  );
}

export default SvgComponent;
