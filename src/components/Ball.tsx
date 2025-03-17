import {
  increaseSpeedInterval,
  ballSpeedIncrement,
  boardHeight,
} from "@/constants";
import { useGameContext } from "@/GameContext";
import { useWindowDimensions } from "react-native";
import Animated, {
  useAnimatedStyle,
  useFrameCallback,
  useSharedValue,
} from "react-native-reanimated";

export default function Ball() {
  const { ball } = useGameContext();
  const lastIncreaseTime = useSharedValue(0); // Track the last time speed was increased
  const { width } = useWindowDimensions();

  useFrameCallback((frameInfo) => {
    const delta = (frameInfo.timeSincePreviousFrame || 0) / 1000;
    const timeSinceFirstFrame = frameInfo.timeSinceFirstFrame || 0;
    let { x, y, dx, dy, speed, r } = ball!.value;
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

    ball!.value = {
      ...ball!.value,
      x,
      y,
      speed,
      dy,
      dx,
    };
  });
  const ballStyles = useAnimatedStyle(() => {
    const { x, y, r } = ball!.value;
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

  return <Animated.View style={[ballStyles]} />;
}
