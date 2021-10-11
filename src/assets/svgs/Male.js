import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';

function SvgComponent({value}) {
  return (
    <Svg
      width={13}
      height={13}
      viewBox="0 0 13 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <G clipPath="url(#prefix__clip0)">
        <Path
          d="M12.993.472a.541.541 0 00-.033-.134l-.001-.004a.547.547 0 00-.096-.149.555.555 0 00-.103-.093L12.756.09a.535.535 0 00-.155-.069.54.54 0 00-.143-.021H8.667a.542.542 0 000 1.083h2.483L7.918 4.316A4.847 4.847 0 004.875 3.25 4.88 4.88 0 000 8.125 4.88 4.88 0 004.875 13 4.88 4.88 0 009.75 8.125c0-1.119-.377-2.18-1.067-3.043l3.234-3.233v2.484a.542.542 0 001.083 0V.542c0-.012-.003-.023-.003-.034a.546.546 0 00-.004-.036zM4.875 11.917c-2.09 0-3.792-1.701-3.792-3.792a3.796 3.796 0 016.474-2.683 3.796 3.796 0 01-2.682 6.475z"
          fill={value ? '#fff' : 'rgba(43,41,46,0.7)'}
        />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0">
          <Path fill="#fff" d="M0 0h13v13H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default SvgComponent;
