import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import CustomButton from '../../components/UI/CustomButton';
import { useTheme } from 'react-native-paper';
import { isTablet } from '../../utils/deviceHelper';

const tablet = isTablet();
const NumberPicker = ({ value, onValueChange, onCancel, onConfirm }) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <View style={styles.pickerButtons}>
        <CustomButton onPress={onCancel} style={[styles.pickerButton, tablet && styles.tabletPickerButton]}>
          Cancel
        </CustomButton>
        <CustomButton onPress={onConfirm} style={[styles.pickerButton, tablet && styles.tabletPickerButton]}>
          Confirm
        </CustomButton>
      </View>
      <Picker
        selectedValue={value}
        onValueChange={onValueChange}
        style={[styles.picker, tablet && styles.tabletPicker]}
        itemStyle={[styles.pickerItem, tablet && styles.tabletPickerItem]}
      >
        {[...Array(30).keys()].map(i => (
          <Picker.Item color={colors.text} key={i + 1} label={`${i + 1}`} value={i + 1} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    paddingBottom: '11%',
  },
  pickerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  pickerButton: {
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  tabletPickerButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  picker: {
    width: '100%',
    height: 150,
  },
  tabletPicker: {
    height: 250,
  },
  pickerItem: {
    fontSize: 18, 
  },
  tabletPickerItem: {
    fontSize: 24, 
  },
});

export default NumberPicker;
