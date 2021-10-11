import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent() {
  return (
    <Svg
      width={27}
      height={24}
      viewBox="0 0 27 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M2.345 23.997l-.944-.014.703-.632c.023-.021 2.3-2.107 2.725-5.632C1.756 15.809 0 13.014 0 10.019 0 4.496 6.022 0 13.423 0c.232 0 .463.004.691.013 7.139.27 12.732 4.666 12.732 10.006a7.799 7.799 0 01-.906 3.621c-2.014 3.888-6.928 6.4-12.517 6.4a17.8 17.8 0 01-2.769-.217C9.725 21.488 7.502 24 2.586 24l-.24-.003z"
        fill="#B3B0B9"
      />
    </Svg>
  );
}

export default SvgComponent;
