import { ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectStartDate, setStartDate } from '../../redux/budgetReducer';
import CustomText from '../../components/UI/CustomText';
import BackgroundColorContainer from '../../components/UI/BackgroundColorContainer';
import { useTheme } from 'react-native-paper';

const useDays = (startDate, handlePress, colors) => {
  return useMemo(() => {
    const days = [];
    for (let i = 1; i <= 30; i++) {
      days.push(
        <View key={i} style={styles.dayContainer}>
          <TouchableOpacity
            onPress={() => handlePress(i)}
            style={[
              styles.dayButton,
              startDate === i && { backgroundColor: colors.accent },
            ]}
          >
            <CustomText
              style={[
                styles.dayText,
                startDate === i && { color: colors.text },
              ]}
            >
              {i}
            </CustomText>
          </TouchableOpacity>
          {i < 30 && (
            <View style={[styles.separator, { backgroundColor: colors.text }]} />
          )}
        </View>
      );
    }
    return days;
  }, [startDate, handlePress, colors]);
};

export default function StartDate({ navigation }) {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const startDate = useSelector(selectStartDate);

  const handlePress = useCallback(
    (day) => {
      dispatch(setStartDate(day));
      navigation.goBack();
    },
    [dispatch, navigation]
  );

  const days = useDays(startDate, handlePress, colors);

  return (
    <BackgroundColorContainer>
      <View style={styles.headerContainer}>
        <CustomText style={[styles.subHeaderText,{color:colors.subtext}]}>
          Example: The day you receive your salary.
        </CustomText>
        <CustomText style={[styles.subHeaderText,{color:colors.subtext}]}>
          In this day total balance will refresh.
        </CustomText>
        
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {days}
      </ScrollView>
    </BackgroundColorContainer>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'center',
    paddingVertical: 15,
  },
  headerText: {
    fontSize: 19,
    alignSelf: 'center',
    fontWeight: '500',
  },
  subHeaderText: {
    alignSelf: 'center',
    fontSize: 16,
  },
  container: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  dayContainer: {
    alignItems: 'center',
  },
  dayButton: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '98%',
    borderRadius: 5,
  },
  dayText: {
    fontSize: 18,
  },
  separator: {
    height: 1,
    width: '98%',
  },
});
