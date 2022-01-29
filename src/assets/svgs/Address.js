import * as React from "react"
import Svg, { Path } from "react-native-svg"

const SvgComponent = (props) => (
  <Svg
    width={20}
    height={38}
    viewBox="0 0 50 4"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M14.932 20.32c2.65 0 4.797-2.236 4.797-4.996 0-2.76-2.147-4.996-4.797-4.996-2.649 0-4.796 2.237-4.796 4.996 0 2.76 2.147 4.997 4.796 4.997Z"
      stroke="#8C8C8C"
      strokeWidth={3.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M14.932 2C11.54 2 8.287 3.404 5.888 5.903 3.489 8.4 2.14 11.79 2.14 15.324c0 3.151.643 5.213 2.399 7.495L14.932 35.31 25.325 22.82c1.756-2.282 2.399-4.344 2.399-7.495 0-3.534-1.348-6.923-3.747-9.421C21.578 3.403 18.325 2 14.932 2v0Z"
      stroke="#8C8C8C"
      strokeWidth={3.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default SvgComponent
