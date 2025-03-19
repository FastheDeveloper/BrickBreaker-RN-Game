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
import Ball from "./Ball";
import { GameContext } from "@/GameContext";

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

  const isUserTurn = useSharedValue(true);
  const isPanActive = useSharedValue(false); // Track pan activity

  const onEndTurn = () => {
    "worklet";
    if (isUserTurn.value) {
      return;
    }
    isUserTurn.value = true;
  };

  const pan = Gesture.Pan()
    .onBegin(() => {
      isPanActive.value = true; // Set to true when pan starts
    })
    .onUpdate((e) => {
      if (!isUserTurn.value) {
        return;
      }
      const x = e.translationX;
      const y = e.translationY;

      const mag = Math.sqrt(x * x + y * y);
      console.log(mag);
      ball.value = {
        ...ball.value,
        dx: -x / mag,
        dy: -y / mag,
      };
    })
    .onEnd(() => {
      isPanActive.value = false;
      if (ball!.value.dy < 0) {
        isUserTurn.value = false;
      }
    });

  const pathStyle = useAnimatedStyle(() => {
    const { x, y, dy, dx } = ball.value;
    const angle = Math.atan2(-dx, dy);

    return {
      display: isUserTurn.value ? "flex" : "none",
      top: y,
      left: x,
      transform: [
        {
          rotate: `${angle}rads`,
        },
      ],
    };
  });

  return (
    <GameContext.Provider value={{ ball, isUserTurn, onEndTurn }}>
      <GestureDetector gesture={pan}>
        <SafeAreaView style={styles.container}>
          <View style={styles.board}>
            <Ball />
            <Animated.View
              style={[
                {
                  width: 0,
                  height: 1000,
                  borderWidth: 1,
                  borderColor: "#ffffff80",
                  left: 50,
                  borderStyle: "dotted",
                  transformOrigin: "top-center",
                  position: "absolute",
                },
                pathStyle,
              ]}
            />
          </View>

          <Button
            title="Move Ball"
            onPress={() => (isUserTurn.value = false)}
          />
        </SafeAreaView>
      </GestureDetector>
    </GameContext.Provider>
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
