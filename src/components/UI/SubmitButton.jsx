import { TouchableOpacity, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import AntDesign from '@expo/vector-icons/AntDesign';
import { mediumVibration } from '../../utils/vibrationPaterns';
import { isTablet } from '../../utils/deviceHelper';

const tablet = isTablet()
export default function SubmitButton({ onPress, children, style, icon, textStyle }) {
    const { colors } = useTheme()
    const handlePress = () => {
        mediumVibration();
        if (onPress) {
            onPress();
        }
    };
    return (
        <TouchableOpacity onPress={handlePress} style={[{
            backgroundColor: colors.button,
            padding: tablet ? 20 : 10,
            borderRadius: tablet ? 15 : 10,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row'
        }, style]}>
            <Text style={[{ color: colors.buttonText, fontSize: tablet ? 22 : 18, }, textStyle]}>{children}</Text>
            {icon && <AntDesign name={icon} size={tablet ? 30 : 24} color={colors.text} />}
        </TouchableOpacity>
    )
}

