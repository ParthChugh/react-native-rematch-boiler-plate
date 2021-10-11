import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent() {
  return (
    <Svg
      width={22}
      height={24}
      viewBox="0 0 22 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M21.333 24v-2.667A5.333 5.333 0 0016 16H5.333A5.333 5.333 0 000 21.333V24M10.667 10.667a5.333 5.333 0 100-10.667 5.333 5.333 0 000 10.667z"
        fill="#B3B0B9"
      />
    </Svg>
  );
}

export default SvgComponent;
