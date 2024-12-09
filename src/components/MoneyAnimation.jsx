import { StyleSheet} from 'react-native'
import money from '../../assets/animations/money.json'
import LottieView from "lottie-react-native";
import { isTablet } from '../utils/deviceHelper';
export default function MoneyAnimation() {
  return (
    <LottieView
    source={money}
    autoPlay
    loop={true}
    style={styles.animation}
    speed={0.5}
/>
  )
}

const styles = StyleSheet.create({
    animation: {
        position: 'absolute',
        width: "100%",
        height:isTablet()? "130%":"100%",
    },
})