import * as React from "react"
import Svg, { Circle, Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      width={26}
      height={26}
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Circle cx={13} cy={13} r={13} fill="#3AAFA9" />
      <Path
        d="M13 6.583a1.75 1.75 0 00-1.75 1.75V13a1.75 1.75 0 003.5 0V8.334A1.75 1.75 0 0013 6.584v0z"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M17.083 11.834V13a4.084 4.084 0 01-8.166 0v-1.166M13 17.084v2.333M10.667 19.416h4.666"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default SvgComponent
