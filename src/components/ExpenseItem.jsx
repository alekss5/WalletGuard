import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';
import AntDesign from '@expo/vector-icons/AntDesign';
import ImageSource from '../utils/ImageSources';
import CustomDivider from './UI/CustomDivider';
import CustomText from './UI/CustomText';
import { isTablet } from '../utils/deviceHelper';

const tablet = isTablet();

export default function ExpenseItem({ date, title, currency, amount, onDelete, dayNumber }) {
  const { colors } = useTheme();

  return (
    <View>
      <View style={styles.expenseItem}>
        <View style={styles.itemLeft}>
          {dayNumber && <CustomText style={[styles.currencyText, tablet && styles.tabletCurrencyText]}>{dayNumber}</CustomText>}
          <Image source={ImageSource.getImageSource(title.icon)} style={[styles.icon, tablet && styles.tabletIcon]} testID="expense-icon" />
          <Text style={[styles.itemText, { color: colors.text }, tablet && styles.tabletItemText]}>
            {title.description}
          </Text>
        </View>

        <View style={styles.itemRight}>
          <View>
            {date && <Text style={[styles.dateText, { color: colors.subtext }, tablet && styles.tabletDateText]}>{date}</Text>}
          </View>
          <Text style={[styles.currencyText, { color: colors.text }, tablet && styles.tabletCurrencyText]}>{currency}</Text>
          <Text style={[styles.amountText, { color: colors.text }, tablet && styles.tabletAmountText]}>{amount}</Text>
          {onDelete && (
            <TouchableOpacity onPress={onDelete} style={{ paddingLeft: tablet ? 20 : 10 }} testID="delete-button">
              <AntDesign name="delete" size={tablet ? 40 : 27} color={colors.text} />
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
    width: tablet ? '95%' : '90%',
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
  tabletIcon: {
    width: 50,
    height: 50,
  },
  itemText: {
    fontSize: 18,
    paddingHorizontal: 10,
  },
  tabletItemText: {
    fontSize: 22,
    paddingHorizontal: 15,
  },
  itemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencyText: {
    fontSize: 18,
  },
  tabletCurrencyText: {
    fontSize: 22,
  },
  amountText: {
    fontSize: 18,
    paddingLeft: 5,
  },
  tabletAmountText: {
    fontSize: 22,
    paddingLeft: 10,
  },
  dateText: {
    fontSize: 15,
    paddingRight: '5%',
  },
  tabletDateText: {
    fontSize: 18,
    paddingRight: '10%',
  },
});
