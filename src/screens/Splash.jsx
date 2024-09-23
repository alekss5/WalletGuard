import { StyleSheet, View,Text } from "react-native";

import splashAnimation from "../../assets/animations/splash.json";
import LottieView from "lottie-react-native";
import Animated, { ZoomOut } from "react-native-reanimated";

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

export default function Splash() {
  return (
    <View style={styles.animationFinisContainer}>
      
      <AnimatedLottieView
        exitAnimation={ZoomOut}
        source={splashAnimation}
        autoPlay
        loop={true}
        style={styles.animation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  animation:{

   width:'100%',
   height:'100%'
  },
  animationFinisContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:'#666666'
  },
});
