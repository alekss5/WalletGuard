import { useState } from 'react';
import { StyleSheet, View, FlatList, Image,Alert } from 'react-native';
import {  useTheme } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { addSubscription, deleteSubscription, selectCurrency, selectSubscriptions } from '../../redux/budgetReducer';
import ImageSource from '../../utils/ImageSources';
import BackgroundColorContainer from '../../components/UI/BackgroundColorContainer';
import CustomText from '../../components/UI/CustomText';
import CustomButton from '../../components/UI/CustomButton';
import NumberPicker from '../../components/UI/NumberPicker';
import SubmitButton from '../../components/UI/SubmitButton';
import ExpenseItem from '../../components/ExpenseItem';
import CustomInput from '../../components/UI/CustomInput';
import DoneAnimation from '../../components/UI/DoneAnimation';

export default function Subscriptions({ navigation }) {
  const route = useRoute();
  const dispatch = useDispatch();
  const { item } = route.params || {};
  const currency = useSelector(selectCurrency);

  const { colors } = useTheme();
  const [day, setDay] = useState(1);
  const [tempDay, setTempDay] = useState(1);
  const [amount, setAmount] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);


  const subscriptions = useSelector(selectSubscriptions);
  
  const navigateToExpensesTypes = () => {
    navigation.navigate('ExpenseTypes',{back:'subscriptions'});
    if (showPicker === true) {
      setShowPicker(false);
    }
  };

  const handleSave = () => {
    if (!item) {
      Alert.alert('Error', 'Please select a subscription type.');
      return;
    }
    
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      Alert.alert('Error', 'Please enter a valid amount.');
      return;
    }

    dispatch(addSubscription({ day, type: item, amount }));
    
    setShowAnimation(true);
    setDay(1);
    setAmount('');
  };

  const handleDeleteSubscription = (item) => {
    dispatch(deleteSubscription(item));
  };

  const handlePickerCancel = () => {
    setShowPicker(false);
    setTempDay(day);
  };

  const handlePickerConfirm = () => {
    setDay(tempDay);
    setShowPicker(false);
  };

  return (
    <BackgroundColorContainer style={{ padding: 20, backgroundColor: colors.background }}>
      <FlatList
  ListHeaderComponent={
    <>
      <CustomText style={styles.label}>Day of the Month</CustomText>
      <CustomButton onPress={() => setShowPicker(true)}>
        {`Day ${day}`}
      </CustomButton>
      {showPicker && (
        <NumberPicker
          value={tempDay}
          onValueChange={setTempDay}
          onCancel={handlePickerCancel}
          onConfirm={handlePickerConfirm}
        />
      )}
      <CustomText style={styles.label}>Type of Subscription</CustomText>
      <CustomButton onPress={navigateToExpensesTypes} icon="right">
        {item ? (
          <>
            <Image source={ImageSource.getImageSource(item.icon)} style={styles.icon} />
            {item.description}
          </>
        ) : (
          'Select type'
        )}
      </CustomButton>
      <CustomText style={styles.label}>Amount</CustomText>
      <CustomInput
        mode="outlined"
        placeholder="Enter amount"
        value={amount}
        onChangeText={(text) => setAmount(text)}
        keyboardType="numeric"
        style={styles.input}
      />
      <SubmitButton onPress={handleSave}>Save</SubmitButton>
      <CustomText>{subscriptions.amount}</CustomText>
      {subscriptions.length > 0 && (
        <View>
          <CustomText style={{ fontSize: 20, alignSelf: 'center', marginVertical: 20 }}>
            Subscriptions
          </CustomText>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
            <View style={{ flexDirection: 'row' }}>
              <CustomText style={{ marginRight: 10 }}>DAY</CustomText>
              <CustomText>TYPE</CustomText>
            </View>
            <CustomText style={{ marginRight: 40 }}>AMOUNT</CustomText>
          </View>
        </View>
      )}
    </>
  }
  data={subscriptions}
  keyExtractor={(item, index) => index.toString()}
  renderItem={({ item }) => (
    <View style={{ flex: 1 }}>
      <ExpenseItem
        date={item.day}
        title={item.type}
        currency={currency}
        amount={item.amount}
        onDelete={() => handleDeleteSubscription(item)}
      />
    </View>
  )}
  ListFooterComponent={
    <CustomText style={{ alignSelf: 'center',paddingTop:10 }}>Set a repeating expenses</CustomText>
  }
/>
<DoneAnimation visible={showAnimation} onFinish={() => setShowAnimation(false)} />
</BackgroundColorContainer>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {

    marginBottom: 15,
  },
  icon: {
    width: 25,
    height: 20,
    marginLeft: 10, 
  },
});
