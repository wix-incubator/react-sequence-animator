import React from 'react';
import autoBind from 'react-autobind';
import SpriteAnimator from '../src/SpriteAnimator';
import AnimationStory from './AnimationStory';
import {storiesOf} from '@storybook/react';

const sprite = require('./statics/sprites-cat-running.png');

class SpriteAnimatorStory extends React.Component {
  constructor() {
    super();
    autoBind(this);
  }

  render() {
    return (
      <AnimationStory>
        <SpriteAnimator autoplay>
          <img src={sprite} alt="1"/>
        </SpriteAnimator>
      </AnimationStory>
    );
  }
}

storiesOf('Animations', module)
  .add('Sprite Animator', () => (
    <SpriteAnimatorStory/>
  ));
