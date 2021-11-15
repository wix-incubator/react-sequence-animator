import * as Easings from 'easing-utils';
import { Easing } from './common.types';

function doEase(pos: number, start: number, end: number) {
  return start + (end - start) * pos;
}

export const ease = (easeName: Easing) => (
  t: number,
  start: number,
  end: number,
  duration: number,
) => doEase(Easings[easeName](t / duration), start, end);
