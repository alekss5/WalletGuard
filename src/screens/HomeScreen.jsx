import { View, StyleSheet, Text, Dimensions, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { lightVibration } from '../utils/vibrationPaterns';
import { selectVisibleDecimals, selectVisibleMonthlyBudget, selectVisibleMonthlyGoal, selectVisibleTotalBalance } from '../redux/selectors/ui';
import { selectBudgetData, selectExpensesArray } from '../redux/selectors/budget';
import BackgroundColorContainer from '../components/UI/BackgroundColorContainer';
import BackgroundImageContainer from '../components/UI/BackgroundImageContainer';
import BalanceCard from '../components/BalanceCard';
import ExpenseItem from '../components/ExpenseItem';
import CustomText from '../components/UI/CustomText';
import CustomDivider from '../components/UI/CustomDivider';
import Chart from '../components/Chart';
import CustomButton from '../components/UI/CustomButton';
import { selectName } from '../redux/selectors/personalInf';
import { isTablet } from '../utils/deviceHelper';
import { useMemo } from 'react';
const tablet = isTablet()

const { width } = Dimensions.get('window');
const isSmallDevice = width < 370;

export default function HomeScreen({ navigation }) {
  const { colors } = useTheme();
  const { total, expense, income, currency, budget } = useSelector(selectBudgetData);
  const name = useSelector(selectName);
  const visibleIncome = useSelector(selectVisibleTotalBalance);
  const visibleMonthlyBudget = useSelector(selectVisibleMonthlyBudget);
  const visibleMonthlyGoal = useSelector(selectVisibleMonthlyGoal);
  const visibleDecimal = useSelector(selectVisibleDecimals);
  const expensesArray = useSelector(selectExpensesArray);

  const visibleExpenses = useMemo(() => {
    return expensesArray.slice(- (tablet ? 6 : 4)).reverse();
  }, [expensesArray]);

  const navigateToAllExpenses = () => {
    lightVibration();
    navigation.navigate('Expenses');
  };

  const formatValue = (value) => visibleDecimal ? value.toFixed(2) : Math.round(value).toString();

  const formattedTotal = formatValue(total);
  const formattedExpense = formatValue(expense);
  const formattedIncome = formatValue(income);

  const leftToSpend = parseFloat(formattedTotal);
  const budgetSpendings = parseFloat((budget - expense).toFixed(2));

  const formatedBudgetSpendings = formatValue(budgetSpendings);
  const formatedLeftToSpend = formatValue(leftToSpend);

  const chartGoal = [
    { name: 'Expense', amount: expense, color: colors.error },
    { name: 'Remaining', amount: leftToSpend, color: colors.success },
  ];

  const chartBudget = [
    { name: 'Expense', amount: expense, color: colors.error },
    { name: 'Remaining Budget', amount: budgetSpendings, color: colors.success },
  ];
  return (
    <BackgroundColorContainer>
      <BackgroundImageContainer>
        <SafeAreaView style={{ flex: 1 }}>
          <FlatList
            data={visibleExpenses}
            ListHeaderComponent={
              <>
                <View style={styles.nameContainer}>
                  <Text style={[styles.nameText, { color: colors.subtext }]}>Hello, </Text>
                  <Text style={[styles.nameText, { color: colors.text }]}>{name}</Text>
                </View>
                <BalanceCard
                  onPress={navigateToAllExpenses}
                  visibleIncome={visibleIncome}
                  total={formattedTotal}
                  expense={formattedExpense}
                  income={formattedIncome}
                  currency={currency}
                  colors={colors}
                />
                <View style={{ width: '90%', alignSelf: 'center' }}>
                  {visibleMonthlyGoal && (
                    <Chart chartData={chartGoal} amount={formatedLeftToSpend} title="Monthly Goal" text="Left Funds" currency={currency} />
                  )}

                  {visibleMonthlyBudget && (
                    <Chart chartData={chartBudget} amount={formatedBudgetSpendings} title={`Monthly Budget: ${budget} ${currency}`} text="Left Budget" currency={currency} />
                  )}
                </View>

                <View style={styles.expensesContainer}>
                  <CustomText style={styles.text}>Expenses</CustomText>
                  <CustomButton onPress={navigateToAllExpenses} style={styles.button} textStyle={styles.buttonText} >View All</CustomButton>
                </View>

                <CustomDivider />
              </>
            }
            renderItem={({ item }) => (
              <ExpenseItem
                date={item.date.replace(/^\d{4}-/, "")}
                title={item.category}
                amount={item.amount.toString()}
                currency={currency || ''}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={
              <CustomText style={[styles.text, { textAlign: 'center' }]}>
                No expenses
              </CustomText>
            }
          />
        </SafeAreaView>
      </BackgroundImageContainer>
    </BackgroundColorContainer>
  );
}


const styles = StyleSheet.create({
  nameContainer: {
    padding: 15,
    flexDirection: 'row',
    width: '100%',
  },
  nameText: {

    fontSize: 40,
    fontWeight: '600',
  },
  text: {
    fontSize: 18,
  },
  expensesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
  },
  button: {
    padding: tablet ? 12 : 8,
    ...(isSmallDevice && { padding: 5 }),
  },
  buttonText: {

    fontSize: tablet ? 25 : 16,
    ...(isSmallDevice && { fontSize: 14 }),
  },
});
