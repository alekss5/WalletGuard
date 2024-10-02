import {View } from 'react-native'
import { useTheme } from 'react-native-paper';

export default function BackgroundColorContainer({children,style}) {
    const { colors } = useTheme()
    return (
        <View style={[{ flex: 1, backgroundColor: colors.background },style]}>
            {children}
        </View>
    )
}

