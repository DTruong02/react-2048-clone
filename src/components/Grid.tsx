import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {runOnJS} from 'react-native-reanimated';
import Tile from './Tile';
import {GRID_SIZE, POSITIONS} from './utils/contants';
import {TBoxState, BoxState, TDirection} from './utils/types';
import {sortBoxes, calcNewPositions, mergeTiles} from './utils/utils';

const INITIAL_SETUP = {
  '1': {id: 1, hide: true},
  '2': {id: 2, hide: true},
  '3': {id: 3, hide: true},
  '4': {id: 4, hide: true},
  '5': {id: 5, hide: true},
  '6': {id: 6, hide: true},
  '7': {id: 7, hide: true},
  '8': {id: 8, hide: true},
  '9': {id: 9, hide: true},
  '10': {id: 10, hide: true},
  '11': {id: 11, hide: true},
  '12': {id: 12, hide: true},
  '13': {id: 13, hide: true},
  '14': {id: 14, hide: true},
  '15': {id: 15, hide: true},
  '16': {id: 16, hide: true},
};

const Grid = () => {
  const [boxes, setBoxes] = useState<TBoxState>(INITIAL_SETUP);
  const [boxesPosition, setBoxesPosition] = useState<BoxState[]>([]);

  useEffect(() => {
    setNewTile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setNewTile = () => {
    const possibleIds = Object.keys(boxes).filter(id => boxes[id].hide);
    const chosenTile =
      possibleIds[Math.floor(Math.random() * possibleIds.length)];

    setBoxesPosition(prev => {
      const availablePositions: string[] = [];
      // Run over 16 positions in grid and return the ones available
      for (let i = 0; i < POSITIONS.length; i++) {
        for (let j = 0; j < POSITIONS.length; j++) {
          const found = prev.find(b => b.x === i && b.y === j);
          if (!found) {
            availablePositions.push(`${i}${j}`);
          }
        }
      }
      const chosenPosition =
        availablePositions[
          Math.floor(Math.random() * availablePositions.length)
        ];
      return [
        ...prev,
        {
          id: parseInt(chosenTile, 10),
          x: parseInt(chosenPosition.charAt(0), 10),
          y: parseInt(chosenPosition.charAt(1), 10),
          color: 0,
        },
      ];
    });

    setBoxes(prev => ({
      ...prev,
      [chosenTile]: {...prev[chosenTile], hide: false},
    }));
  };

  const sortedPositions = boxesPosition
    .sort(sortBoxes)
    .filter(b => !boxes[`${b.id}`]?.hide);

  const handleDirection = (velocityX: number, velocityY: number) => {
    const DIRECTION: TDirection =
      Math.abs(velocityX) > Math.abs(velocityY)
        ? velocityX > 0
          ? 'RIGHT'
          : 'LEFT'
        : velocityY > 0
        ? 'DOWN'
        : 'UP';

    //cal positions
    const newPositions = calcNewPositions(DIRECTION, sortedPositions);
    //merge them
    const {result: mergedPositions, idsToUpdate} = mergeTiles(
      newPositions,
      DIRECTION,
    );

    const newBoxes = {...boxes};
    idsToUpdate.forEach(id => {
      newBoxes[id].hide = true;
    });
    //calc positions again
    setBoxesPosition(calcNewPositions(DIRECTION, mergedPositions));

    setBoxes(newBoxes);
    setNewTile();
  };

  const gesture = Gesture.Pan().onFinalize(({velocityX, velocityY}) => {
    runOnJS(handleDirection)(velocityX, velocityY);
  });

  return (
    <GestureDetector gesture={gesture}>
      <View style={styles.grid}>
        {Object.keys(boxes).map(key => {
          const boxPosition = boxesPosition.find(b => b.id === boxes[key].id);
          return <Tile {...boxPosition} {...boxes[key]} key={key} />;
        })}
      </View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  grid: {
    borderWidth: 4,
    borderColor: '#03071e',
    width: GRID_SIZE,
    height: GRID_SIZE,
    borderRadius: 4,
  },
});

export default Grid;
