import { Divider, useTheme } from 'react-native-paper'

export default function CustomDivider() {
    const { colors } = useTheme()
    
    return (
        <Divider style={{
            height: 2,
            width: '90%',
            backgroundColor: '#ccc',
            alignSelf: 'center',
            marginVertical: 10,
            marginBottom: 10,
        }} />
    )
}
