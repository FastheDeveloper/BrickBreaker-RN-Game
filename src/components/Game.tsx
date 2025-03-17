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

  return (
    <GameContext.Provider value={{ ball }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.board}>
          <Ball />
        </View>

        <Button title="Move Ball" onPress={() => {}} />
      </SafeAreaView>
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
