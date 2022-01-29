import * as React from "react"
import Svg, { Path } from "react-native-svg"

const SvgComponent = (props) => (
  <Svg
    width={38}
    height={38}
    fill="none"
    viewBox="0 0 48 68"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M18.852 35.31c9.198 0 16.655-7.456 16.655-16.655C35.507 9.457 28.05 2 18.852 2 9.653 2 2.197 9.457 2.197 18.655c0 9.199 7.456 16.655 16.655 16.655Z"
      stroke="white"
      strokeWidth={3.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="m18.852 25.317 6.662-6.662-6.662-6.662M12.19 18.655h13.324"
      stroke="white"
      strokeWidth={3.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default SvgComponent
