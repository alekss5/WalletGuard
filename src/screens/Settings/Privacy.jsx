import { Alert, StyleSheet, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import BackgroundColorContainer from '../../components/UI/BackgroundColorContainer';
import SettingsItem from '../../components/SettingsItem';
import {
  toggleHomeScreenVisibility
} from '../../redux/uiReducer';
import {
  selectVisibleTotalBalance, selectVisibleMonthlyBudget,
  selectVisibleMonthlyGoal,
} from '../../redux/selectors/ui';
import { selectBudget } from '../../redux/selectors/budget';

export default function Privacy({ navigation }) {
  const dispatch = useDispatch();
  const monthlyBudget = useSelector(selectBudget)

  const visibleTotalBalance = useSelector(selectVisibleTotalBalance);
  const visibleMonthlyBudget = useSelector(selectVisibleMonthlyBudget);
  const visibleMonthlyGoal = useSelector(selectVisibleMonthlyGoal);

  const handleToggle = (element) => {
    if (element === 'monthlyBudget') {


      if (monthlyBudget === '' || monthlyBudget === 0) {
        Alert.alert(
          "Monthly Budget Not Set",
          "Please set a monthly budget first.",
          [
            {
              text: "Cancel",
              style: "cancel"
            },
            {
              text: "Set Budget",
              onPress: () => navigation.navigate('Budget')
            }
          ]
        );
        return;
      }
    }
    dispatch(toggleHomeScreenVisibility({ element }));
  };

  return (
    <BackgroundColorContainer>
      <View style={styles.container}>
        <SettingsItem
          text="Hide total balance"
          icon="eye-off-outline"
          isSwitchOn={visibleTotalBalance}
          onToggleSwitch={() => handleToggle('totalBalance')}
        />
        <SettingsItem
          text="Monthly Budget"
          icon="wallet-outline"
          isSwitchOn={visibleMonthlyBudget}
          onToggleSwitch={() => handleToggle('monthlyBudget')}
        />
        <SettingsItem
          text="Monthly goal"
          icon="flag-outline"
          isSwitchOn={visibleMonthlyGoal}
          onToggleSwitch={() => handleToggle('monthlyGoal')}
        />
      </View>
    </BackgroundColorContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
    paddingTop: 10,
  },
});
