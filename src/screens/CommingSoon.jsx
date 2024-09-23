import { StyleSheet, View, Dimensions } from 'react-native';
import LottieView from "lottie-react-native";
import commingSoon from '../../assets/animations/CommingSoon.json';
import SubmitButton from '../components/UI/SubmitButton';

export default function CommingSoon({navigation}) {
  const { width } = Dimensions.get('window');
  
  return (
    <View style={styles.container}>
      <LottieView
        source={commingSoon}
        autoPlay
        loop
        style={ { width: width * 0.9, height: width * 0.8 }}
      />
      <SubmitButton style={styles.button} onPress={()=>{navigation.navigate('BottomTabs')}}>Back</SubmitButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: "center",
    alignItems: "center",
  },
  button:{
    width:'90%'
  }
});
