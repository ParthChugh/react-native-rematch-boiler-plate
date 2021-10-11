import * as React from "react"
import Svg, { Path } from "react-native-svg"
import {View} from 'react-native'

function SvgComponent({color}) {
  return ( 
    <View style={{padding: 20}}>
      <Svg
        width={21}
        height={21}
        viewBox="0 0 21 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          d="M16.625 10.5H4.375M10.5 16.625L4.375 10.5 10.5 4.375"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  )
}

export default SvgComponent
