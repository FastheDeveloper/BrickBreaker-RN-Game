import { Dimensions } from 'react-native';
const width = Dimensions.get('window').width;

export const ballRadius = 15;
export const ballSpeed = 100;
export const boardHeight = 500;
export const blocksPerRow = 7;
export const blockW = width / blocksPerRow - 10;
export const ballSpeedIncrement = 5; // Amount to increase speed
export const increaseSpeedInterval = 10; // Time in seconds