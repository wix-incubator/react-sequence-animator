import React from 'react';
import { Position, SpriteAnimator } from '../src/SpriteAnimator';
import AnimationStory from './AnimationStory';
import sprite from '../statics/sprites-cat-running.png';

const WIDTH = 512;
const HEIGHT = 256;

export default {
  component: SpriteAnimator,
  title: 'Sprite Animator',
};

export const SpriteAnimatorStory = () => {
  const getPosition = (frame: number): Position => {
    return {
      width: WIDTH,
      height: HEIGHT,
      top: frame < 4 ? 0 : HEIGHT,
      left: (frame % 4) * WIDTH,
    };
  };
  return (
    <AnimationStory>
      <SpriteAnimator autoplay numOfFrames={8} getPosition={getPosition}>
        <img src={sprite} alt="1" width={WIDTH * 4} height={HEIGHT * 2} />
      </SpriteAnimator>
    </AnimationStory>
  );
};
