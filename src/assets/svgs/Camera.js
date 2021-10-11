import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      width={22}
      height={22}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.546 18.713c.344-.344.537-.81.537-1.296V7.333A1.833 1.833 0 0019.25 5.5h-3.667L13.75 2.75h-5.5L6.417 5.5H2.75A1.833 1.833 0 00.917 7.333v10.084A1.833 1.833 0 002.75 19.25h16.5c.486 0 .953-.193 1.296-.537zM7.833 11.917a3.167 3.167 0 116.334 0 3.167 3.167 0 01-6.334 0zM11 7.75a4.167 4.167 0 100 8.333 4.167 4.167 0 000-8.333z"
        fill="#2B292E"
        opacity={0.5}
      />
    </Svg>
  )
}

export default SvgComponent
