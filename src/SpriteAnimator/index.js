import React from 'react';
import * as Easings from 'easing-utils';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import styles from './SpriteAnimator.scss';
import {ease} from '../SequenceAnimator';

export default class SpriteAnimator extends React.Component {
  static displayName = 'SpriteAnimator';

  static propTypes = {
    autoplay: PropTypes.bool,
    duration: PropTypes.number,
    delay: PropTypes.number,
    loop: PropTypes.bool,
    easing: PropTypes.oneOf(Object.keys(Easings)),
    children: PropTypes.node,
    getPosition: PropTypes.func,
    numOfFrames: PropTypes.number,
    onSequenceEnd: PropTypes.func
  };

  static defaultProps = {
    autoplay: true,
    easing: 'linear',
    loop: true,
    children: [],
    numOfFrames: 0,
    getPosition: () => ({}),
    onSequenceEnd: () => {}
  };

  constructor() {
    super();
    this.state = {
      frame: 0
    };
    autoBind(this);
  }

  componentDidMount() {
    const {autoplay} = this.props;

    if (autoplay) {
      this.start();
    }
  }

  componentWillUnmount() {
    cancelAnimationFrame(this._animationFrame);
  }

  start() {
    this._playAnimation();
  }

  stop() {
    cancelAnimationFrame(this._animationFrame);
  }

  reset() {
    this.setState({frame: 0});
  }

  render() {
    const {frame} = this.state;
    const {getPosition, children} = this.props;
    const {width, height, top, left} = getPosition(frame);

    return (
      <div className={styles.wrapper} style={{width, height}}>
        <div className={styles.innerWrapper} style={{top: -top, left: -left}}>{React.Children.only(children)}</div>
      </div>
    );
  }

  _playAnimation() {
    this._animationFrame = requestAnimationFrame(this._onAnimate);
  }

  _onAnimate(timestamp) {
    const {numOfFrames, loop, easing, duration, onSequenceEnd} = this.props;

    if (!this._animationStart) {
      this._animationStart = timestamp;
    }

    let nextFrame = Math.floor(ease(easing)(timestamp - this._animationStart, 0, numOfFrames, duration));

    if (nextFrame > numOfFrames - 1) {
      onSequenceEnd();

      if (loop) {
        nextFrame %= numOfFrames;
        this._animationStart = timestamp;
      } else {
        nextFrame = -1;
      }
    }

    if (nextFrame > -1) {
      this.setState({frame: nextFrame}, () => {
        this._playAnimation();
      });
    }
  }
}
