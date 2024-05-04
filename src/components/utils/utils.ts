import {BoxState, TDirection} from './types';

export const hasOtherBox = (
  isColumn: boolean,
  isUpOrLeft: boolean,
  acc: BoxState[],
  curr: BoxState,
  position: number,
) => {
  const value = isUpOrLeft ? -position : position;

  const found = isColumn
    ? acc.find(b => b.x === curr.x && b.y === curr.y + value)
    : acc.find(b => b.y === curr.y && b.x === curr.x + value);

  return found ? false : true;
};

export const isColumn = (direction: TDirection) =>
  ['DOWN', 'UP'].includes(direction);
export const isUpOrLeft = (direction: TDirection) =>
  ['LEFT', 'UP'].includes(direction);

export const getResult = (
  acc: BoxState[],
  curr: BoxState,
  biggerThanZero: boolean,
  currValue: number,
  direction: TDirection,
) => {
  const possibleMoves = [1, 2, 3];
  return possibleMoves.reduce((value, row) => {
    const condition = biggerThanZero
      ? currValue - row >= 0
      : currValue + row < 4;
    if (
      hasOtherBox(isColumn(direction), isUpOrLeft(direction), acc, curr, row) &&
      condition
    ) {
      return row;
    }
    return value;
  }, 0);
};

export const calcNewPositions = (
  direction: TDirection,
  positions: BoxState[],
) => {
  return (isUpOrLeft(direction) ? positions.reverse() : positions).reduce(
    (acc, curr) => {
      if (direction === 'DOWN') {
        const result = getResult(acc, curr, false, curr.y, direction);
        return [...acc, {...curr, y: curr.y + result}];
      }
      if (direction === 'RIGHT') {
        const result = getResult(acc, curr, false, curr.x, direction);
        return [...acc, {...curr, x: curr.x + result}];
      }
      if (direction === 'UP') {
        const result = getResult(acc, curr, true, curr.y, direction);
        return [...acc, {...curr, y: curr.y - result}];
      }
      if (direction === 'LEFT') {
        const result = getResult(acc, curr, true, curr.x, direction);
        return [...acc, {...curr, x: curr.x - result}];
      }
      return acc;
    },
    [] as BoxState[],
  );
};

export const sortBoxes = (a: BoxState, b: BoxState) => {
  const aPos = a.x * 10 + a.y;
  const bPos = b.x * 10 + b.y;
  return bPos - aPos;
};

export const hasTileToMerge = (
  array: BoxState[],
  currentTile: BoxState,
  dir: TDirection,
) => {
  const equalKey: keyof BoxState = ['DOWN', 'UP'].includes(dir) ? 'x' : 'y';
  const keyToMerge: keyof BoxState = equalKey === 'x' ? 'y' : 'x';
  const value: number = ['DOWN', 'RIGHT'].includes(dir) ? 1 : -1;

  return array.find(b => {
    return (
      b.color === currentTile.color &&
      b[equalKey] === currentTile[equalKey] &&
      b[keyToMerge] === currentTile[keyToMerge] + value
    );
  });
};

export const mergeTiles = (positions: BoxState[], dir: TDirection) => {
  const idsToUpdate: string[] = [];
  const result = positions
    .reduce((acc, curr) => {
      const condition = {
        DOWN: curr.y < 3,
        RIGHT: curr.x < 3,
        UP: curr.y > 0,
        LEFT: curr.x > 0,
      };
      if (condition[dir]) {
        const found = hasTileToMerge(acc, curr, dir);
        if (found) {
          idsToUpdate.push(`${curr.id}`);
          return acc.map(b =>
            b.id === found.id ? {...b, color: b.color + 1} : b,
          );
        }
      }
      return [...acc, curr];
    }, [] as BoxState[])
    .sort(sortBoxes);

  return {result, idsToUpdate};
};
