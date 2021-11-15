import React from 'react';
import styles from './SpriteAnimator.scss';
import { ease } from '../common';
import {
  Position,
  SpriteAnimatorDefaultProps,
  SpriteAnimatorProps,
  SpriteAnimatorState,
} from './types';

const DEFAULT_POSITION: Position = {
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
};

export class SpriteAnimator extends React.Component<
  SpriteAnimatorProps,
  SpriteAnimatorState
> {
  static displayName = 'SpriteAnimator';
  static defaultProps: SpriteAnimatorDefaultProps = {
    autoplay: true,
    easing: 'linear',
    loop: true,
    numOfFrames: 0,
    getPosition: () => DEFAULT_POSITION,
  };
  state = {
    frame: 0,
  };
  private _animationFrame: ReturnType<typeof requestAnimationFrame>;
  private _animationStart: number | null;

  componentDidMount() {
    const { autoplay } = this.props;

    if (autoplay) {
      this.start();
    }
  }

  componentDidUpdate(nextProps: SpriteAnimatorProps) {
    if (nextProps.numOfFrames !== this.props.numOfFrames) {
      this.start();
    }
  }

  componentWillUnmount() {
    cancelAnimationFrame(this._animationFrame);
  }

  start() {
    this._animationStart = null;
    this._playAnimation();
  }

  stop() {
    const { onAnimationStop } = this.props;
    cancelAnimationFrame(this._animationFrame);

    if (onAnimationStop) {
      onAnimationStop();
    }
  }

  reset() {
    this.setState({ frame: 0 });
  }

  _playAnimation = () => {
    this._animationFrame = requestAnimationFrame(this._onAnimate);
  };

  _onAnimate = (timestamp: number) => {
    const {
      numOfFrames,
      loop,
      easing,
      duration,
      onSequenceEnd,
      onAnimationStop,
    } = this.props;

    if (!this._animationStart) {
      this._animationStart = timestamp;
    }

    let nextFrame = Math.floor(
      ease(easing)(timestamp - this._animationStart, 0, numOfFrames, duration),
    );

    if (nextFrame > numOfFrames - 1) {
      if (onSequenceEnd) {
        onSequenceEnd();
      }

      if (loop) {
        nextFrame %= numOfFrames;
        this._animationStart = timestamp;
      } else {
        nextFrame = -1;
      }
    }

    if (nextFrame > -1) {
      this.setState({ frame: nextFrame }, () => {
        this._playAnimation();
      });
    } else if (onAnimationStop) {
      onAnimationStop();
    }
  };

  render() {
    const { frame } = this.state;
    const { getPosition, children } = this.props;
    const { width, height, top, left } = getPosition(frame);

    return (
      <div className={styles.wrapper} style={{ width, height }}>
        <div className={styles.innerWrapper} style={{ top: -top, left: -left }}>
          {React.Children.only(children)}
        </div>
      </div>
    );
  }
}
