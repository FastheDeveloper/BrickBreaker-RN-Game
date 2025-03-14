import { boardHeight } from "@/constants";

import { SafeAreaView, View, StyleSheet, Button } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withDecay,
  withSequence,
  withRepeat,
  withDelay,
} from "react-native-reanimated";

export default function Game() {
  const x = useSharedValue(10);

  const moveBall = () => {
    // x.value = withTiming(x.value + 100, { duration: 5000 });
    // x.value = withSpring(x.value + 100);
    // x.value = withDecay({ velocity: 300 });

    // Shake the ball
    // x.value = withRepeat(
    //   withDelay(
    //     1000,
    //     withSequence(withTiming(15), withTiming(12), withTiming(18))
    //   ),
    //   3
    // );

    x.value = withRepeat(
      withSequence(withTiming(15), withTiming(12), withTiming(18)),
      3
    );
  };

  const ballStyles = useAnimatedStyle(() => {
    return {
      left: x.value,
    };
  });
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.board}>
        <Animated.View
          style={[
            {
              width: 50,
              height: 50,
              backgroundColor: "white",
              borderRadius: 50,
              position: "absolute",
              top: boardHeight / 2,
              // left: x,
            },
            ballStyles,
          ]}
        />
      </View>

      <Button title="Move Ball" onPress={moveBall} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#292929",
  },
  board: {
    backgroundColor: "#202020",
    height: boardHeight,
    marginVertical: "auto",
    overflow: "hidden",
  },
});
