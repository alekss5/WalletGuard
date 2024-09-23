import React, { useCallback, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import done from '../../../assets/animations/done.json'; 

const DoneAnimation = ({ visible, onFinish }) => {
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handleAnimationFinish = useCallback(() => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      if (onFinish) onFinish();
      fadeAnim.setValue(1);
    });
  }, [fadeAnim, onFinish]);

  return (
    visible && (
      <Animated.View style={[styles.animationContainer, { opacity: fadeAnim }]}>
        <LottieView
          source={done}
          autoPlay
          loop={false}
          style={styles.lottie}
          onAnimationFinish={handleAnimationFinish}
        />
      </Animated.View>
    )
  );
};

const styles = StyleSheet.create({
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

export default DoneAnimation;
