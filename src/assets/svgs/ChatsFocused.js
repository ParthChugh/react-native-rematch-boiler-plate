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
        d="M12.759 29.998l-.709-.01.528-.475c.017-.016 1.725-1.58 2.043-4.224C12.317 23.857 11 21.761 11 19.515 11 15.37 15.516 12 21.067 12c.174 0 .347.003.519.01 5.354.202 9.548 3.499 9.548 7.504a5.85 5.85 0 01-.679 2.716c-1.51 2.916-5.196 4.8-9.388 4.8-.693 0-1.39-.054-2.076-.163C18.294 28.117 16.626 30 12.94 30c-.06 0-.12 0-.181-.002z"
        fill="#fff"
      />
    </Svg>
  );
}

export default SvgComponent;
