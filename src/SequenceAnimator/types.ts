import { Easing } from '../common.types';

export type SequenceanimatorProps = {
  autoplay?: boolean;
  duration?: number;
  loop?: boolean;
  easing?: Easing;
  onSequenceEnd?: () => void;
  onAnimationStop?: () => void;
};

export type SequenceanimatorDefaultProps = {
  duration: number;
  autoplay: boolean;
  easing: Easing;
  loop: boolean;
};

export type SequenceanimatorState = {
  frame: number;
};
