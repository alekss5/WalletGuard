import { Divider } from 'react-native-paper'

export default function CustomDivider({style}) {
    
    return (
        <Divider style={[{
            height: 2,
            width: '90%',
            backgroundColor: '#ccc',
            alignSelf: 'center',
            marginVertical: 10,
            marginBottom: 10,
        },style]} />
    )
}
