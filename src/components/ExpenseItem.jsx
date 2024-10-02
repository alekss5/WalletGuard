import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';
import AntDesign from '@expo/vector-icons/AntDesign';
import ImageSource from '../utils/ImageSources';
import CustomDivider from './UI/CustomDivider';
import CustomText from './UI/CustomText';

export default function ExpenseItem({ date, title, currency, amount, onDelete,dayNumber }) {
  const { colors } = useTheme();

  return (
    <View>
      <View style={styles.expenseItem}>
        <View style={styles.itemLeft}>
          {dayNumber && <CustomText style={styles.currencyText} >{dayNumber}</CustomText>}
          <Image source={ImageSource.getImageSource(title.icon)} style={styles.icon} testID="expense-icon" />
          <Text style={[styles.itemText, { color: colors.text }]}>{title.description}</Text>
        </View>

        <View style={styles.itemRight}>
          <View>
          {date && <Text style={{ color: colors.subtext, fontSize: 15,paddingRight:'5%' }}>{date}</Text>}

          </View>
          
          <Text style={[styles.currencyText, { color: colors.text }]}>{currency}</Text>
          <Text style={[styles.amountText, { color: colors.text }]}>{amount}</Text>
          {onDelete && (
            <TouchableOpacity onPress={onDelete} style={{ paddingLeft: 10 }} testID="delete-button">
              <AntDesign name="delete" size={27} color={colors.text} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <CustomDivider />
    </View>
  );
}

const styles = StyleSheet.create({
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
    paddingBottom: 2,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 35,
    height: 35,
  },
  itemText: {
    fontSize: 18,
    paddingHorizontal: 10,
  },
  itemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencyText: {
    fontSize: 18,
  },
  amountText: {
    fontSize: 18,
    paddingLeft: 5,
  },
});
