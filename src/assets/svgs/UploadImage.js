import * as React from "react"
import Svg, { Rect, Path } from "react-native-svg"

function SvgComponent() {
  return (
    <Svg
      width={63}
      height={63}
      viewBox="0 0 63 63"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Rect width={63} height={63} rx={5} fill="#F6FCFC" />
      <Path
        d="M41 35v4a2 2 0 01-2 2H25a2 2 0 01-2-2v-4M37 28l-5-5-5 5M32 23v12"
        stroke="#3AAFA9"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default SvgComponent
