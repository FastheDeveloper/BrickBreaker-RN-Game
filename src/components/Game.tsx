import {
  ballRadius,
  ballSpeed,
  ballSpeedIncrement,
  boardHeight,
  increaseSpeedInterval,
} from "@/constants";
import { BallData } from "@/types";

import {
  SafeAreaView,
  View,
  StyleSheet,
  Button,
  useWindowDimensions,
} from "react-native";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useFrameCallback,
} from "react-native-reanimated";

export default function Game() {
  const { width } = useWindowDimensions();
  const ball = useSharedValue<BallData>({
    x: width / 2,
    y: boardHeight - ballRadius,
    r: ballRadius,
    dx: 1,
    dy: -1,
    speed: ballSpeed,
  });

  const lastIncreaseTime = useSharedValue(0); // Track the last time speed was increased

  useFrameCallback((frameInfo) => {
    const delta = (frameInfo.timeSincePreviousFrame || 0) / 1000;
    const timeSinceFirstFrame = frameInfo.timeSinceFirstFrame || 0;
    let { x, y, dx, dy, speed, r } = ball.value;
    console.log(speed);
    // Check if 5 seconds have passed since the last speed increase
    if (
      Math.floor(timeSinceFirstFrame / 1000) >
      lastIncreaseTime.value + increaseSpeedInterval
    ) {
      speed += ballSpeedIncrement; // Increase speed

      lastIncreaseTime.value = Math.floor(timeSinceFirstFrame / 1000); // Update last increase time
      console.log(speed, "fas", lastIncreaseTime.value);
    }

    // touched top wall
    if (y < r) {
      dy *= -1;
      y = r;
    }
    // touched bottom wall
    if (y > boardHeight - r) {
      dy *= -1;
      y = boardHeight - r;
      // onEndTurn();
      // return;
    }
    // touched left wall
    if (x < r) {
      dx *= -1;
      x = r;
    }
    // touched right wall
    if (x > width - r) {
      dx *= -1;
      x = width - r;
    }

    x += dx * delta * speed;
    y += dy * delta * speed;

    ball.value = {
      ...ball.value,
      x,
      y,
      speed,
      dy,
      dx,
    };
  });

  const ballStyles = useAnimatedStyle(() => {
    const { x, y, r } = ball.value;
    return {
      left: x - r,
      top: y - r,
      width: r * 2,
      aspectRatio: 1,
      backgroundColor: "white",
      borderRadius: r,
      position: "absolute",
    };
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.board}>
        <Animated.View style={[ballStyles]} />
      </View>

      <Button title="Move Ball" onPress={() => {}} />
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
