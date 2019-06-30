import React from 'react';
import SequenceAnimator from '../src/SequenceAnimator/index.js';
import AnimationStory from './AnimationStory';
import {storiesOf} from '@storybook/react';

const cat1 = require(/* webpackPrefetch: true */'./statics/cat1.png');
const cat2 = require(/* webpackPrefetch: true */'./statics/cat2.png');
const cat3 = require(/* webpackPrefetch: true */'./statics/cat3.png');
const cat4 = require(/* webpackPrefetch: true */'./statics/cat4.png');
const cat5 = require(/* webpackPrefetch: true */'./statics/cat5.png');
const cat6 = require(/* webpackPrefetch: true */'./statics/cat6.png');
const cat7 = require(/* webpackPrefetch: true */'./statics/cat7.png');
const cat8 = require(/* webpackPrefetch: true */'./statics/cat8.png');

class SequenceAnimatorStory extends React.Component {
  render() {
    return (
      <AnimationStory>
        <SequenceAnimator autoplay>
          <img src={cat1} alt="1"/>
          <img src={cat2} alt="2"/>
          <img src={cat3} alt="3"/>
          <img src={cat4} alt="4"/>
          <img src={cat5} alt="5"/>
          <img src={cat6} alt="6"/>
          <img src={cat7} alt="7"/>
          <img src={cat8} alt="8"/>
        </SequenceAnimator>
      </AnimationStory>
    );
  }
}

storiesOf('Animations', module)
  .add('Sequence Animator', () => (
    <SequenceAnimatorStory/>
  ));
