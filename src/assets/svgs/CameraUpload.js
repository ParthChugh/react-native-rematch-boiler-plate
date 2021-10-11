import * as React from "react"
import Svg, { Rect, Path } from "react-native-svg"

function SvgComponent() {
  return (
    <Svg
      width={60}
      height={31}
      viewBox="0 0 60 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Rect width={60} height={31} rx={5} fill="#F6FCFC" />
      <Path
        d="M41 22a2 2 0 01-2 2H21a2 2 0 01-2-2V11a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2v11z"
        stroke="#3AAFA9"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M30 20a4 4 0 100-8 4 4 0 000 8z"
        stroke="#3AAFA9"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default SvgComponent
