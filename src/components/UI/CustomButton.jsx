import { TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';
import AntDesign from '@expo/vector-icons/AntDesign';
import CustomText from './CustomText';

export default function CustomButton({ onPress, children, style, icon, textStyle, testID,disabled }) {
    const { colors } = useTheme();

    return (
        <TouchableOpacity
        disabled={disabled}
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
            testID={testID} // Apply testID here
        >
            {icon && <AntDesign name={icon} size={24} color={colors.text} />}
            <CustomText style={[{  fontSize: 18 }, textStyle]}>
                {children}
            </CustomText>
        </TouchableOpacity>
    );
}
