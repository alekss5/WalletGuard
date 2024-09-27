import { StyleSheet, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { PieChart } from 'react-native-chart-kit';
import CustomText from './UI/CustomText';

export default function Chart({ chartData, title, text, amount,currency }) {

  const { colors } = useTheme()

  return (
    <View style={[styles.container, { backgroundColor: colors.elevation.level3 }]}>
      <CustomText style={{ marginLeft: 20, fontSize: 15, marginTop: 5 }}>{title}</CustomText>
      <View style={[styles.chartContainer, { backgroundColor: colors.elevation.level3 }]}>
        <PieChart
          data={chartData}
          width={120}
          height={70}
          chartConfig={{
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            barPercentage: 0.5,
          }}
          accessor="amount"
          backgroundColor="transparent"
          paddingLeft="0"
          absolute
          hasLegend={false}

        />
        <CustomText style={styles.text}>{text} {amount}{currency}</CustomText>
        
      </View>

    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    width: '100%',
    justifyContent: 'space-around',
    borderRadius: 10,
    marginTop: 15,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  chartContainer: {
    marginLeft: 15,
    marginBottom: 10,
    flexDirection: 'row',
  },
  text: {
    alignSelf: 'center',
    fontSize: 20,

  }
})