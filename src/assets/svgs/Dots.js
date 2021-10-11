import * as React from 'react';
import Svg, {Circle} from 'react-native-svg';

function SvgComponent({color}) {
  return (
    <Svg
      width={4}
      height={18}
      viewBox="0 0 4 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Circle cx={2} cy={2} r={2} fill={color || '#fff'} />
      <Circle cx={2} cy={9} r={2} fill={color || '#fff'} />
      <Circle cx={2} cy={16} r={2} fill={color || '#fff'} />
    </Svg>
  );
}

export default SvgComponent;
