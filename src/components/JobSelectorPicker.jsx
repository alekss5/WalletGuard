import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function JobSectorPicker({ selectedValue, onValueChange }) {
    return (
        <View style={styles.pickerContainer}>
            <Picker
                selectedValue={selectedValue}
                onValueChange={(itemValue) => onValueChange(itemValue)}
                style={styles.picker}
                testID="jobSectorPicker"
            >
                <Picker.Item label="Select a job sector" value="empty" />
                <Picker.Item label="Technology" value="technology" />
                <Picker.Item label="Healthcare" value="healthcare" />
                <Picker.Item label="Finance" value="finance" />
                <Picker.Item label="Education" value="education" />
                <Picker.Item label="Manufacturing" value="manufacturing" />
                <Picker.Item label="Retail" value="retail" />
                <Picker.Item label="None of the above" value="none" />
            </Picker>
        </View>
    );
}

const styles = StyleSheet.create({
    pickerContainer: {
        marginHorizontal: '5%',
        marginBottom: 20,
     
        borderRadius: 4,
    },
    picker: {
        height: 50,
        width: '100%',
    },
});
