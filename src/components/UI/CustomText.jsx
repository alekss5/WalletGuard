
import { Text } from 'react-native'
import { useTheme } from 'react-native-paper'

export default function CustomText({ style, ...props }) {
    const {colors} = useTheme()
    
  return (
     <Text style={[{color:colors.text}, style]} {...props} />

  )
}