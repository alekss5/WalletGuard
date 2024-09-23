import { StyleSheet, View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from 'react-native-paper';
import CustomText from './CustomText';

const months = [
    { label: 'January', value: 0 },
    { label: 'February', value: 1 },
    { label: 'March', value: 2 },
    { label: 'April', value: 3 },
    { label: 'May', value: 4 },
    { label: 'June', value: 5 },
    { label: 'July', value: 6 },
    { label: 'August', value: 7 },
    { label: 'September', value: 8 },
    { label: 'October', value: 9 },
    { label: 'November', value: 10 },
    { label: 'December', value: 11 },
];

const years = Array.from(new Array(10), (x, i) => new Date().getFullYear() - i);

export default function MonthYearPicker({ selectedMonth, setSelectedMonth }) {
    const {colors} = useTheme()
  return (
   
    <View style={styles.pickerContainer}>
        <View style={styles.pickerWrapper}>
           
            <Picker
                selectedValue={selectedMonth}
                onValueChange={(itemValue) => setSelectedMonth(itemValue)}
                style={styles.picker}
            >
                {months.map(month => (
                    <Picker.Item color={colors.text} key={month.value} label={month.label} value={month.value} />
                ))}
            </Picker>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    pickerContainer: {
   
    },
    pickerWrapper: {
        marginBottom: 20,
    },
    picker: {
    
        width: '100%',
        height: 190,

    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});