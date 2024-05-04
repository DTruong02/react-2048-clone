export type TDirection = 'DOWN' | 'LEFT' | 'RIGHT' | 'UP';

export type BoxState = {
  id: number;
  x: number;
  y: number;
  color: number;
};
export type TBoxState = Record<string, {id: number; hide: boolean}>;
