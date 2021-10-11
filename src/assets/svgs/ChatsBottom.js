import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent() {
  return (
    <Svg
      width={27}
      height={22}
      viewBox="0 0 27 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M2.345 21.122l-.944-.012.703-.548c.023-.018 2.3-1.827 2.725-4.884C1.756 14.022 0 11.598 0 9.001 0 4.211 6.022.313 13.423.313c.232 0 .463.003.691.01 7.139.235 12.732 4.047 12.732 8.678 0 1.08-.305 2.137-.906 3.14-2.014 3.372-6.928 5.55-12.517 5.55-.924 0-1.854-.063-2.769-.188-.929 1.444-3.152 3.622-8.068 3.622l-.24-.003z"
        fill="#B3B0B9"
      />
    </Svg>
  );
}

export default SvgComponent;
