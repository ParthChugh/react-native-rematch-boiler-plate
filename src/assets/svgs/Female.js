import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent({value}) {
  return (
    <Svg
      width={9}
      height={13}
      viewBox="0 0 9 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M7.37 7.368a4.321 4.321 0 000-6.106 4.324 4.324 0 00-6.107 0 4.321 4.321 0 000 6.106A4.298 4.298 0 003.808 8.6v1.446H2.792a.508.508 0 100 1.015h1.016v1.431a.508.508 0 001.016 0v-1.43h1.017a.508.508 0 100-1.016H4.824V8.6c.931-.109 1.833-.52 2.546-1.232zm-5.389-.719a3.304 3.304 0 010-4.668 3.307 3.307 0 014.67 0 3.304 3.304 0 010 4.668 3.307 3.307 0 01-4.67 0z"
        fill={value ? '#fff' : 'rgba(43,41,46,0.7)'}
      />
    </Svg>
  );
}

export default SvgComponent;
