import { TouchableOpacity, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import AntDesign from '@expo/vector-icons/AntDesign';
import { mediumVibration } from '../../utils/vibrationPaterns';

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
            backgroundColor: colors.button, padding: 10,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row'
        }, style]}>
            <Text style={[{ color: colors.buttonText, fontSize: 18, }, textStyle]}>{children}</Text>
            {icon && <AntDesign name={icon} size={24} color={colors.text} />}
        </TouchableOpacity>
    )
}

