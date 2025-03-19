import { Dimensions } from 'react-native';
const width = Dimensions.get('window').width;

export const ballRadius = 15;
export const ballSpeed = 500;
export const boardHeight = 500;
export const blocksPerRow = 7;
export const blockW = width / blocksPerRow - 10;
export const ballSpeedIncrement = 10; // Amount to increase speed
export const increaseSpeedInterval = 50; // Time in seconds