import React from 'react';
import autoBind from 'react-autobind';
import SpriteAnimator from '../src/SpriteAnimator';
import AnimationStory from './AnimationStory';
import {storiesOf} from '@storybook/react';

const sprite = require('./statics/sprites-cat-running.png');
const WIDTH = 512;
const HEIGHT = 256;

class SpriteAnimatorStory extends React.Component {
  constructor() {
    super();
    autoBind(this);
    this._getPosition = this._getPosition.bind(this);
  }

  render() {
    return (
      <AnimationStory>
        <SpriteAnimator autoplay numOfFrames={8} getPosition={this._getPosition}>
          <img src={sprite} alt="1" width={WIDTH * 4} height={HEIGHT * 2}/>
        </SpriteAnimator>
      </AnimationStory>
    );
  }

  _getPosition(frame) {
    return {
      width: WIDTH,
      height: HEIGHT,
      top: (frame < 4) ? 0 : HEIGHT,
      left: (frame % 4) * WIDTH
    };
  }
}

storiesOf('Animations', module)
  .add('Sprite Animator', () => (
    <SpriteAnimatorStory/>
  ));
