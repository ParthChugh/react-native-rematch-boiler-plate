import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent() {
  return (
    <Svg
      width={18}
      height={13}
      viewBox="0 0 18 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M17.443.26a.885.885 0 00-1.252 0L5.587 10.862 1.511 6.787A.885.885 0 00.259 8.04l4.702 4.702a.885.885 0 001.252 0l11.23-11.23a.885.885 0 000-1.252z"
        fill="#fff"
      />
    </Svg>
  )
}

export default SvgComponent
