import * as React from "react"
import Svg, { Circle, Path } from "react-native-svg"

function SvgComponent() {
  return (
    <Svg
      width={26}
      height={26}
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Circle cx={13} cy={13} r={13} fill="#3AAFA9" />
      <Path
        d="M17.512 8.488L6.489 12.513l5.118 1.881 1.882 5.119 4.024-11.025zM14.012 11.988l-2.406 2.406"
        stroke="#fff"
        strokeMiterlimit={10}
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default SvgComponent