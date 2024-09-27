import { StyleSheet, Text, Dimensions, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LineChart, PieChart, BarChart } from 'react-native-chart-kit'
import { useSelector } from 'react-redux'
import BackgroundColorContainer from '../components/UI/BackgroundColorContainer'
import BackgroundImageContainer from '../components/UI/BackgroundImageContainer'
import { useTheme } from 'react-native-paper'
import CustomText from '../components/UI/CustomText'
import { categoryColors,getWeekNumber,isCurrentMonth } from '../utils/GlobalFunctions'
import { selectExpensesArray, selectMonthlyIncome } from '../redux/selectors/budget'

const Analytics = () => {
  const expenses = useSelector(selectExpensesArray)
  const incomeArray = useSelector(selectMonthlyIncome)

  const currentMonthExpenses = expenses.filter((expense) => isCurrentMonth(expense.date))
  const currentMonthIncome = incomeArray.filter((income) => isCurrentMonth(income.date))

  const { colors } = useTheme()
  const chartConfig = {
    backgroundColor: colors.background,
    backgroundGradientFrom: colors.surface,
    backgroundGradientTo: colors.elevation.level1,
    color: (opacity = 1) => colors.success,
    labelColor: (opacity = 1) => colors.text,
    style: {
      borderRadius: 16
    },
    propsForBackgroundLines: {
      stroke: colors.shadow
    }
  }

  // Prepare Pie Chart Data for the current month expenses
  const categoryTotals = currentMonthExpenses.reduce((acc, expense) => {
    const { category, amount } = expense
    acc[category.description] = (acc[category.description] || 0) + parseFloat(amount)
    return acc
  }, {})

  // Convert to array and sort by spending amount
  const sortedCategories = Object.entries(categoryTotals)
    .sort((a, b) => b[1] - a[1])

  // Check if there are more than 5 categories
  const hasMoreThanFiveCategories = sortedCategories.length > 5

  // Prepare Pie Chart Data
  const pieChartData = hasMoreThanFiveCategories
    ? [
        ...sortedCategories.slice(0, 5).map(([category, amount]) => ({
          name: category,
          population: amount,
          color: categoryColors[category] || colors.elevation.level3, // Use custom color or fallback
          legendFontColor: colors.subtext,
          legendFontSize: 15
        })),
        {
          name: "Other",
          population: sortedCategories.slice(5).reduce((sum, [, amount]) => sum + amount, 0),
          color: colors.elevation.level3,
          legendFontColor: colors.subtext,
          legendFontSize: 15
        }
      ]
    : sortedCategories.map(([category, amount]) => ({
        name: category,
        population: amount,
        color: categoryColors[category] || colors.elevation.level3, // Use custom color or fallback
        legendFontColor: colors.subtext,
        legendFontSize: 15
      }))

  // Prepare Line Chart Data for the current month expenses
  const expensesByDate = currentMonthExpenses.reduce((acc, expense) => {
    const { date, amount } = expense
    acc[date] = (acc[date] || 0) + parseFloat(amount)
    return acc
  }, {})

  
  // Sort the dates in ascending order
  const sortedExpensesByDate = Object.keys(expensesByDate)
    .sort((a, b) => new Date(a) - new Date(b))
  
    const lineChartData = {
      labels: sortedExpensesByDate.length 
        ? sortedExpensesByDate.map(date => {
            const formattedDate = new Date(date);
            return `${formattedDate.getDate()}/${formattedDate.getMonth() + 1}`; // or `${formattedDate.getMonth() + 1}/${formattedDate.getDate()}`
          }) 
        : ["No Data"],
      datasets: [
        {
          data: sortedExpensesByDate.length 
            ? sortedExpensesByDate.map(date => expensesByDate[date]) 
            : [0],
          color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
          strokeWidth: 2
        }
      ],
      legend: ["Expenses Over Time"]
    }
    

  // Prepare Bar Chart Data for weekly income
  const incomeByWeek = currentMonthIncome.reduce((acc, income) => {
    const weekNumber = getWeekNumber(income.date)
    acc[weekNumber] = (acc[weekNumber] || 0) + parseFloat(income.amount)
    return acc
  }, {})

  const barChartData = {
    labels: Object.keys(incomeByWeek).map((week) => `W: ${week}`),
    datasets: [
      {
        data: Object.values(incomeByWeek).length ? Object.values(incomeByWeek) : [0],
        color: (opacity = 1) => colors.accent,
        strokeWidth: 2
      }
    ],
    legend: ["Income by Week"]
  }

  const screenWidth = Dimensions.get('window').width - 50
  const screenHeight = Dimensions.get('window').height / 4

  return (
    <BackgroundColorContainer>
      <BackgroundImageContainer>
        <SafeAreaView style={styles.container}>
          <Text style={[styles.title, { color: colors.text }]}>Analytics</Text>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <CustomText style={[styles.chartTitle,{color:colors.subtext}]}>Monthly spendings</CustomText>
            <LineChart
              data={lineChartData}
              width={screenWidth}
              height={screenHeight}
              chartConfig={chartConfig}
              bezier
              style={styles.chartStyle}
            />

            <CustomText style={[styles.chartTitle,{color:colors.subtext}]}>Category spendings</CustomText>
            <PieChart
              data={pieChartData}
              width={screenWidth}
              height={screenHeight}
              chartConfig={chartConfig}
              accessor={"population"}
              backgroundColor={"transparent"}
              paddingLeft={"15"}
              absolute
              style={styles.chartStyle}
            />
            {Object.keys(incomeByWeek).length > 0 ? (
              <>
              <CustomText style={[styles.chartTitle,{color:colors.subtext}]}>Monthly Income</CustomText>
              <BarChart
                data={barChartData}
                width={screenWidth}
                height={screenHeight}
                chartConfig={chartConfig}
                style={styles.chartStyle}
              />
              </>
            ) : (
              <Text style={[styles.noDataText, { color: colors.text }]}>No Income Data</Text>
            )}
          </ScrollView>
        </SafeAreaView>
      </BackgroundImageContainer>
    </BackgroundColorContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom:100
  },
  title: {
    paddingTop:20,
    textAlign:'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  chartStyle: {
    marginVertical: 8,
    borderRadius: 16
  },
  noDataText: {
    fontSize: 18,
    marginTop: 20
  },
  chartTitle:{
    fontSize:19,
    fontWeight:'500'
  }
})

export default Analytics
