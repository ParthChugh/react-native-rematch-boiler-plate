import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent() {
  return (
    <Svg
      width={78}
      height={65}
      viewBox="0 0 78 65"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M78 62l-4.752-3.279-.464 5.755L78 62zM.906.991c7.973 1.524 14.655 5.76 20.658 11.37 6.008 5.616 11.31 12.584 16.538 19.547 5.216 6.948 10.36 13.897 16.025 19.4 5.669 5.51 11.899 9.612 19.304 10.824l.162-.987c-7.126-1.166-13.178-5.12-18.77-10.553-5.596-5.438-10.69-12.316-15.921-19.284-5.22-6.954-10.573-13.992-16.655-19.677C16.159 5.94 9.313 1.58 1.094.009L.906.99z"
        fill="#B3B0B9"
      />
    </Svg>
  );
}

export default SvgComponent;
