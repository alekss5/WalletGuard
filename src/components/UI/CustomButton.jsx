import { TouchableOpacity, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function CustomButton({ onPress, children, style, icon, textStyle }) {
    const { colors } = useTheme();

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[{
                backgroundColor: colors.surface,
                padding: 10,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                borderWidth: 1,
                marginBottom: 10,
            }, style]}
        >
            <Text style={[{ color: colors.text, fontSize: 18 }, textStyle]}>
                {children}
            </Text>
            {icon && <AntDesign name={icon} size={24} color={colors.text} />}
        </TouchableOpacity>
    );
}
