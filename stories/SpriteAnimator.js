import React from 'react';
import SpriteAnimator from '../src/SpriteAnimator';
import AnimationStory from './AnimationStory';
import {storiesOf} from '@storybook/react';

const sprite = require('./statics/sprites-cat-running.png');
const WIDTH = 512;
const HEIGHT = 256;

class SpriteAnimatorStory extends React.Component {
  render() {
    return (
      <AnimationStory>
        <SpriteAnimator autoplay numOfFrames={8} getPosition={this._getPosition}>
          <img src={sprite} alt="1" width={WIDTH * 4} height={HEIGHT * 2}/>
        </SpriteAnimator>
      </AnimationStory>
    );
  }

  _getPosition = frame => {
    return {
      width: WIDTH,
      height: HEIGHT,
      top: (frame < 4) ? 0 : HEIGHT,
      left: (frame % 4) * WIDTH
    };
  };
}

storiesOf('Animations', module)
  .add('Sprite Animator', () => (
    <SpriteAnimatorStory/>
  ));
