import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import {height} from './utils/contants';

const GameOver = ({
  show,
  playAgain,
}: {
  show: boolean;
  playAgain: () => void;
}) => {
  const DURATION = 500;
  const opacity = show ? 0.98 : 0;
  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: withTiming(opacity, {duration: DURATION}),
      top: withTiming(show ? 0 : height, {duration: DURATION}),
      transform: [
        {translateX: withTiming(0, {duration: DURATION})},
        {translateY: withTiming(0, {duration: DURATION})},
      ],
    };
  });

  return (
    <Animated.View style={[styles.gameOverContainer, animatedStyles]}>
      <Text style={styles.text}>GAME OVER</Text>
      <TouchableOpacity style={styles.button} onPress={playAgain}>
        <Text style={styles.buttonTitle}>Play Again</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default GameOver;

const styles = StyleSheet.create({
  gameOverContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: height,
    width: '100%',
    zIndex: 10,
    position: 'absolute',
    backgroundColor: '#FFF',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  buttonTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  button: {
    padding: 16,
    borderRadius: 4,
    backgroundColor: '#95d5b2',
    opacity: 1,
    marginTop: 4,
  },
});
