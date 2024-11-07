import { SafeAreaView, StyleSheet, View, Alert } from 'react-native'
import { useState, useEffect } from 'react'
import { StripeProvider, useStripe } from '@stripe/stripe-react-native';
import { selectEmail, selectJsonToken } from '../redux/selectors/personalInf';
import { useSelector } from 'react-redux';
import { stripePayment, stripeSubscription, stripeCancelSubscription } from '../utils/https';
import CustomButton from '../components/UI/CustomButton';
import CustomText from '../components/UI/CustomText';
import { useTheme } from 'react-native-paper';
import SubmitButton from '../components/UI/SubmitButton';
import { Ionicons } from '@expo/vector-icons';

const Upgrade = ({ navigation }) => {
  const { colors } = useTheme()
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const token = useSelector(selectJsonToken);
  const email = useSelector(selectEmail)
  console.log(email);

  const cancelSubscription = async () => {
    try {
      // Assuming stripeCancelSubscription is an API call returning the result
      const cancel = await stripeCancelSubscription({ token, email: 'aleksandarg305@gmail.com' });

      // Check if the cancellation was successful
      if (cancel && cancel.success) {  // Adjust based on the response structure
        Alert.alert('Success', 'You canceled the subscription.');
      } else {
        Alert.alert('Error', 'Failed to cancel the subscription.');
      }
    } catch (error) {
      console.log('Error canceling subscription:', error);
      Alert.alert('Error', 'An error occurred while canceling the subscription.');
    }
  };

  const fetchPaymentSheetParams = async () => {
    const { paymentIntent, ephemeralKey, customer } = await stripeSubscription({ token, email: 'aleksandarg305@gmail.com' })
    console.log('Fetched payment sheet params:', { paymentIntent, ephemeralKey, customer });
    return { paymentIntent, ephemeralKey, customer };
  };

  const initializePaymentSheet = async () => {
    const {
      paymentIntent,
      ephemeralKey,
      customer,
    } = await fetchPaymentSheetParams();

    if (!paymentIntent) {
      console.error('paymentIntent is missing client_secret');
      return;
    }

    const { error } = await initPaymentSheet({
      merchantDisplayName: "Example, Inc.",
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: 'Jane Doe',
      },
      returnURL: 'yourapp://payment-complete',  // Replace this with your app's deep link
    });

    if (error) {
      console.error('Error initializing payment sheet:', error.message);
    } else {
      console.log('Payment sheet initialized successfully');
      setLoading(true);
    }
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert('Success', 'Your order is confirmed!');
    }
  };

  useEffect(() => {
    // initializePaymentSheet();
  }, []);

  const goBack = () => {
    navigation.goBack();
  }
  return (

    <StripeProvider publishableKey={process.env.STRIPE_PUBLISHABLE_KEY} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>

          <CustomText style={styles.headerText}>Premium</CustomText>
          <View style={{
            flexDirection: 'row',
            justifyContent:'center',
          }}>
            <Ionicons name='checkmark-circle-outline' size={40} color={colors.text} style={styles.icon} testID="settings-icon" />

            <CustomText style={styles.featureText}>Make subscriptions </CustomText>
            <Ionicons name='calendar-outline' size={40} color={colors.text} style={styles.icon} testID="settings-icon" />

          </View>

          <CustomText style={styles.featureText}>Privacy features </CustomText>
          <CustomText style={styles.featureText}>View Previous months expences</CustomText>
          <SubmitButton disabled={!loading} onPress={openPaymentSheet}>{loading ? "Subscribe for one Year" : "Loading..."}</SubmitButton>


          <SubmitButton disabled={!loading} onPress={openPaymentSheet}>{loading ? "Checkout" : "Loading..."}</SubmitButton>

          <CustomButton onPress={goBack}>Cancel</CustomButton>
        </View>
      </SafeAreaView>

    </StripeProvider>

  );
}

export default Upgrade

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '90%',
    marginLeft: '5%',

    justifyContent: 'space-between',
  },
  headerText: {
    fontWeight: 600,
    fontSize: 27,
    textAlign: 'center',
  },
  featureText:{
    padding:6,
    fontSize:20,
  }

})
