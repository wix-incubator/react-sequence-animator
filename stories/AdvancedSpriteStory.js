/* eslint-disable */
import React from 'react';
import autoBind from 'react-autobind';
import SpriteAnimator from '../src/SpriteAnimator';
import {storiesOf} from '@storybook/react';

const sprite = require('./statics/CSV_Export_Sprite.png');
const WIDTH = 300;
const HEIGHT = 150;
const ANIMATION_TYPES = {
  EXPORT: 'export',
  ERROR: 'error',
  SUCCESS: 'success'
};

class AdvancedSpriteStory extends React.Component {
  constructor() {
    super();
    autoBind(this);
    this.state = {
      type: ANIMATION_TYPES.EXPORT,
      updateTo: null
    };
  }

  render() {
    const {type} = this.state;

    return (
      <div>
        <SpriteAnimator
          autoplay
          duration={800}
          numOfFrames={24}
          getPosition={this._getPosition}
          loop={type === ANIMATION_TYPES.EXPORT}
          onSequenceEnd={this._onSequenceEnd}
          ref={this._elRef}
          >
          <img src={sprite} alt="1" width={WIDTH * 3} height={HEIGHT * 24}/>
        </SpriteAnimator>
        <div><button onClick={this._onError} disabled={type !== ANIMATION_TYPES.EXPORT}>Error</button></div>
        <div><button onClick={this._onSuccess} disabled={type !== ANIMATION_TYPES.EXPORT}>Success</button></div>
        <div><button onClick={this._reset} disabled={type === ANIMATION_TYPES.EXPORT}>Reset</button></div>
      </div>
    );
  }

  _elRef(el) {
    this._elem = el;
  }

  _getPosition(frame) {
    const {type} = this.state;
    const top = (frame % 24) * HEIGHT;
    let left = 0;

    switch (type) {
      case ANIMATION_TYPES.ERROR:
        left = 2 * WIDTH;
        break;
      case ANIMATION_TYPES.SUCCESS:
        left = WIDTH;
        break;
    }

    return {
      width: WIDTH,
      height: HEIGHT,
      top,
      left
    };
  }

  _onSequenceEnd() {
    const {updateTo} = this.state;

    if (updateTo) {
      this.setState({type: updateTo, updateTo: null});
    }
  }

  _onError() {
    this.setState({updateTo: ANIMATION_TYPES.ERROR});
  }

  _onSuccess() {
    this.setState({updateTo: ANIMATION_TYPES.SUCCESS});
  }

  _reset() {
    if (this._elem) {
      this._elem.stop();
      this._elem.reset();
    }
    this.setState({type: ANIMATION_TYPES.EXPORT}, () => {
      if (this._elem) {
        this._elem.start();
      }
    });
  }
}

storiesOf('Animations', module)
  .add('Advanced Sprite Animator', () => (
    <AdvancedSpriteStory/>
  ));
/* eslint-enable */
