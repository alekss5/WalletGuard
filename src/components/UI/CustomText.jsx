
import { Text } from 'react-native'
import { useTheme } from 'react-native-paper'
import { isTablet } from '../../utils/deviceHelper'
const tablet = isTablet()
export default function CustomText({ style, ...props }) {
    const {colors} = useTheme()
    
  return (
     <Text style={[{color:colors.text}, style,tablet&&{fontSize:27}]} {...props} />

  )
}