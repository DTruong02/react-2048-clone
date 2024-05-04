import {Dimensions} from 'react-native';

export const width = Dimensions.get('screen').width;
export const height = Dimensions.get('screen').height;
export const GRID_SIZE = width - 10;
export const BOX_SIZE = GRID_SIZE / 4 - 2; // Container divided by 4 (max boxes per row / column ) minus  8

export const POSITIONS = [0, BOX_SIZE, BOX_SIZE * 2, BOX_SIZE * 3];

export const Colors = [
  '#FFFFFF',
  '#d8f3dc',
  '#95c5b2',
  '#52b788',
  '#2d6a4f',
  '#faa307',
  '#e85d04',
  '#d00000',
  '#9d0208',
  '#081c15',
  '#000000',
];
