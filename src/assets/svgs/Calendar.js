import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent() {
  return (
    <Svg
      width={19}
      height={19}
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M15.042 3.167H3.958c-.874 0-1.583.709-1.583 1.583v11.084c0 .874.709 1.583 1.583 1.583h11.084c.874 0 1.583-.709 1.583-1.583V4.75c0-.874-.709-1.583-1.583-1.583zM12.667 1.583V4.75M6.333 1.583V4.75M2.375 7.917h14.25"
        stroke="#2B292E"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgComponent;
