import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { isTablet } from '../utils/deviceHelper';

const tablet = isTablet();

export default function JobSectorPicker({ selectedValue, onValueChange }) {
    return (
        <View style={[styles.pickerContainer, tablet && styles.tabletPickerContainer]}>
            <Picker
                selectedValue={selectedValue}
                onValueChange={(itemValue) => onValueChange(itemValue)}
                style={[styles.picker, tablet && styles.tabletPicker]}
                testID="jobSectorPicker"
                itemStyle={{ fontSize: tablet ? 25 : 18 }}
            >
              <Picker.Item label="Select a job sector" value="empty" />
                <Picker.Item label="Agriculture" value="agriculture" />
                <Picker.Item label="Arts & Entertainment" value="arts_entertainment" />
                <Picker.Item label="Construction" value="construction" />
                <Picker.Item label="Education" value="education" />
                <Picker.Item label="Finance" value="finance" />
                <Picker.Item label="Government" value="government" />
                <Picker.Item label="Healthcare" value="healthcare" />
                <Picker.Item label="Hospitality" value="hospitality" />
                <Picker.Item label="Legal" value="legal" />
                <Picker.Item label="Logistics" value="logistics" />
                <Picker.Item label="Manufacturing" value="manufacturing" />
                <Picker.Item label="Marketing & Advertising" value="marketing" />
                <Picker.Item label="Real Estate" value="real_estate" />
                <Picker.Item label="Retail" value="retail" />
                <Picker.Item label="Technology" value="technology" />
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
        backgroundColor: '#f0f0f0',
        padding: 5,
    },
    tabletPickerContainer: {
        marginHorizontal: '3%',  // Narrower margins for larger screen
        padding: 10,  // Increased padding for a larger touch area
    },
    picker: {
        height: 50,
        width: '100%',
    },
    tabletPicker: {
        height: 100,  // Increased height for better usability on tablets
        fontSize: 20,  // Larger font size for better readability
    },
});
