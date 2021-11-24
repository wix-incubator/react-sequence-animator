import { Easing } from '../common.types';

export type SequenceAnimatorProps = {
  autoplay?: boolean;
  duration?: number;
  loop?: boolean;
  easing?: Easing;
  onSequenceEnd?: () => void;
  onAnimationStop?: () => void;
};

export type SequenceAnimatorDefaultProps = {
  duration: number;
  autoplay: boolean;
  easing: Easing;
  loop: boolean;
};

export type SequenceAnimatorState = {
  frame: number;
};
