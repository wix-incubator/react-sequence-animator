import React from 'react';
import { SequenceAnimator } from '../src/SequenceAnimator';
import AnimationStory from './AnimationStory';
import cat1 from '../statics/cat1.png';
import cat2 from '../statics/cat2.png';
import cat3 from '../statics/cat3.png';
import cat4 from '../statics/cat4.png';
import cat5 from '../statics/cat5.png';
import cat6 from '../statics/cat6.png';
import cat7 from '../statics/cat7.png';
import cat8 from '../statics/cat8.png';

const Button = () => <button>Click Me</button>;

export default {
  component: Button,
  title: 'Sequence Animator',
};

export const SequenceAnimatorStory = () => (
  <AnimationStory>
    <SequenceAnimator autoplay>
      <img src={cat1} alt="1" />
      <img src={cat2} alt="2" />
      <img src={cat3} alt="3" />
      <img src={cat4} alt="4" />
      <img src={cat5} alt="5" />
      <img src={cat6} alt="6" />
      <img src={cat7} alt="7" />
      <img src={cat8} alt="8" />
    </SequenceAnimator>
  </AnimationStory>
);
