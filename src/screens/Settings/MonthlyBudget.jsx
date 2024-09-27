import { useState } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import {  setSalary } from '../../redux/personalInfReducer';
import { setBudget } from '../../redux/budgetReducer';

import CustomInput from '../../components/UI/CustomInput';
import BackgroundColorContainer from '../../components/UI/BackgroundColorContainer';
import CustomText from '../../components/UI/CustomText';
import SubmitButton from '../../components/UI/SubmitButton';
import DoneAnimation from '../../components/UI/DoneAnimation';
import { selectSalary } from '../../redux/selectors/personalInf';
import { selectBudget } from '../../redux/selectors/budget';

export default function MonthlyBudget() {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const monthlySalary = useSelector(selectSalary)
  const monthlyBudget = useSelector(selectBudget)

  const [salary, setLocalSalary] = useState(monthlySalary);
  const [budget, setLocalBudget] = useState(String(monthlyBudget));
  const [showAnimation, setShowAnimation] = useState(false);

  const handleSave = () => {
    const prevSalary = monthlySalary

    const trimmedSalary = salary.trim();
    const selectedSalary = parseFloat(trimmedSalary);

    const salaryDifference = selectedSalary - prevSalary;

    const trimmedBudget = budget.trim();
    const selectedBudget = parseFloat(trimmedBudget);

    if (trimmedSalary.length === 0) {
      alert("Please enter your monthly income.");
      return;
    }

    if (isNaN(selectedSalary) || selectedSalary <= 0) {
      alert("Please enter a valid salary.");
      return;
    }

    if (trimmedBudget.length === 0) {
      alert("Please enter your monthly budget.");
      return;
    }

    if (isNaN(selectedBudget) || selectedBudget <= 1) {
      alert("Please enter a valid budget.");
      return;
    }
    setShowAnimation(true);
    dispatch(setSalary(selectedSalary));
    dispatch(setBudget({ budget: selectedBudget, salaryDifference }));
  };


  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1 }}>
        <BackgroundColorContainer>
          <View style={{ width: '90%', alignSelf: 'center' }}>
            <CustomText style={styles.label}>Monthly Salary</CustomText>
            <CustomInput
              placeholder="Enter amount"
              value={salary}
              onChangeText={setLocalSalary}
              keyboardType="numeric"
              style={styles.input}
            />

            <CustomText style={[styles.subHeaderText, { color: colors.subtext }]}>
              The salary changes will be applied to the total.
            </CustomText>

            <CustomText style={styles.label}>Monthly Budget</CustomText>
            <CustomInput
              placeholder="Enter amount"
              value={budget}
              onChangeText={setLocalBudget}
              keyboardType="numeric"
              style={styles.input}
            />
            <CustomText style={[styles.subHeaderText, { color: colors.subtext }]}>
              Money you want to spend through the month.
            </CustomText>

            <SubmitButton onPress={handleSave} style={{ marginTop: 15 }}>
              Save
            </SubmitButton>
          </View>
        </BackgroundColorContainer>
        <DoneAnimation visible={showAnimation} onFinish={() => setShowAnimation(false)} />

      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  label: {
    marginTop: 15,
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    marginBottom: 10,
  },
  subHeaderText: {
    alignSelf: 'center',
    fontSize: 15,
  },
});
