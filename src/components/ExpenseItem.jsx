import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';
import AntDesign from '@expo/vector-icons/AntDesign';
import ImageSource from '../utils/ImageSources';
import CustomDivider from './UI/CustomDivider';

export default function ExpenseItem({ date, title, currency, amount, onDelete }) {
  const { colors } = useTheme();

  return (
    <View>
      <View style={styles.expenseItem}>
        <View style={styles.itemLeft}>
          {date && <Text style={[styles.currencyText, { color: colors.text }]}>{date}   </Text>}
          <Image source={ImageSource.getImageSource(title.icon)} style={styles.icon} />
          <Text style={[styles.itemText, { color: colors.text }]}>{title.description}</Text>
        </View>

        <View style={styles.itemRight}>
          <Text style={[styles.currencyText, { color: colors.text }]}>{currency}</Text>
          <Text style={[styles.amountText, { color: colors.text }]}>{amount}</Text>
          {onDelete && (
            <TouchableOpacity onPress={onDelete} style={{ paddingLeft: 10 }}>
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
