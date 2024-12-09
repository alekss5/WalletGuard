import React,{ useState, useCallback } from 'react';
import { StyleSheet, Image, Platform, View, TouchableOpacity, TouchableWithoutFeedback, Keyboard,Alert } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { addExpense, addIncome } from '../redux/budgetReducer';
import ImageSource from '../utils/ImageSources';
import BackgroundColorContainer from '../components/UI/BackgroundColorContainer';
import BackgroundImageContainer from '../components/UI/BackgroundImageContainer';
import CustomText from '../components/UI/CustomText';
import CustomButton from '../components/UI/CustomButton';
import SubmitButton from '../components/UI/SubmitButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import { lightVibration } from '../utils/vibrationPaterns';
import CustomInput from '../components/UI/CustomInput';
import { selectSubscriptions } from '../redux/selectors/budget';
import { toggleDoneAnumation } from '../redux/uiNoRealmReducer';
import { isTablet } from '../utils/deviceHelper';

const tablet = isTablet()

const MemoizedCustomText = React.memo(CustomText);
const MemoizedCustomButton = React.memo(CustomButton);
const MemoizedSubmitButton = React.memo(SubmitButton);

export default function AddTransaction({ navigation }) {
  const route = useRoute();
  const dispatch = useDispatch();
  const { colors } = useTheme();

  const [date, setDate] = useState(new Date());
  const [amount, setAmount] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const subscriptions = useSelector(selectSubscriptions);
  const { item } = route.params || {};

  const handleSave = useCallback(() => {
    lightVibration();
    Keyboard.dismiss();
  
    const amountValue = parseFloat(amount);
    if (isNaN(amountValue) || amountValue <= 0) {
      Alert.alert('Invalid Input', 'Please enter a valid amount greater than 0.');
      return;
    }
    if (!item) {
      Alert.alert(
        'Missing Type',
        'Please select a type of transaction.',
        [
          {
            text: 'Cancel',
            style: 'cancel', 
          },
          {
            text: 'Add Type',
            onPress: () => navigation.navigate('ExpenseTypes', { back: 'addTransaction' }), 
          },
        ]
      );
      return;
    }
    const formattedDate = date.toISOString().split('T')[0];
  
    const amountString = amountValue.toString();

  
    if (item?.description === 'Income') {
      dispatch(addIncome({ date: formattedDate, category: item, amount: amountString }));
    } else {
      dispatch(addExpense({ date: formattedDate, category: item, amount: amountString }));
    }
  
    dispatch(toggleDoneAnumation())
    setDate(new Date());
    setAmount('');
  }, [date, amount, item, dispatch]);

  const onDateChange = useCallback((event, selectedDate) => {
    setDate(selectedDate || date);
    if (Platform.OS === 'android') setShowDatePicker(false);
  }, [date]);

  const showDatePickerHandler = useCallback(() => {
    setShowDatePicker(true);
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
      <View style={styles.container}>
        <BackgroundColorContainer>
          <BackgroundImageContainer>
            <SafeAreaView style={styles.safeArea}>
              <MemoizedCustomText style={styles.headerText}>Add new Transaction</MemoizedCustomText>

              <MemoizedCustomText style={styles.label}>Date</MemoizedCustomText>
              {Platform.OS === 'ios' ? (
                <View style={styles.datePicker}>
                  <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={onDateChange}
                    themeVariant={colors.text === "#000000" ? "light" : "dark"}
                  />
                </View>
              ) : (
                <TouchableOpacity onPress={showDatePickerHandler}>
                  <MemoizedCustomText style={styles.dateDisplay}>{date.toDateString()}</MemoizedCustomText>
                  {showDatePicker && (
                    <DateTimePicker
                    themeVariant=''
                      value={date}
                      mode="date"
                      display="default"
                      onChange={onDateChange}
                      
                    />
                  )}
                </TouchableOpacity>
              )}

              <MemoizedCustomText style={styles.label}>Type of Transaction</MemoizedCustomText>
              <MemoizedCustomButton onPress={() => navigation.navigate('ExpenseTypes', { back: 'addTransaction' })} icon="right">
                {item ? (
                  <>
                    <Image source={ImageSource.getImageSource(item.icon)} style={styles.icon} />
                    {item.description}
                  </>
                ) : (
                  'Select type'
                )}
              </MemoizedCustomButton>

              <MemoizedCustomText style={styles.label}>Amount</MemoizedCustomText>
              <CustomInput
                placeholder="Enter amount"
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
                style={styles.input}
              />

              <MemoizedSubmitButton onPress={handleSave}>Save</MemoizedSubmitButton>
              <MemoizedCustomText>{subscriptions.amount}</MemoizedCustomText>
            </SafeAreaView>
          </BackgroundImageContainer>
        </BackgroundColorContainer>

      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    alignSelf: 'center',
    width:tablet?'80%':'100%',
    marginTop:tablet?'5%':'0%',
    padding: 20,
  },
  headerText: {
    alignSelf: 'center',
    fontSize: 22,
    marginBottom: 15,
    fontWeight: '600',
  },
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
  datePicker: {
    width: '30%',
    alignSelf: 'flex-start',
    marginBottom: 15,
  },
  dateDisplay: {
    fontSize: 16,
    paddingVertical: 10,
   
  },
  animationContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  lottie: {
    width: 150,
    height: 150,
  },
});
