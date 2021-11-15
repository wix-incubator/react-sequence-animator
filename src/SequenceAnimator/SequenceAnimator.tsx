import React from 'react';
import { ease } from '../common';
import {
  SequenceanimatorProps,
  SequenceanimatorState,
  SequenceanimatorDefaultProps,
} from './types';

export class SequenceAnimator extends React.Component<
  SequenceanimatorProps,
  SequenceanimatorState
> {
  static displayName = 'SequenceAnimator';
  static defaultProps: SequenceanimatorDefaultProps = {
    duration: 1000,
    autoplay: true,
    easing: 'linear',
    loop: true,
  };
  private _animationFrame: ReturnType<typeof requestAnimationFrame>;
  private _animationStart: number | null;

  state = {
    frame: 0,
  };

  componentDidMount() {
    const { autoplay } = this.props;

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
    this.setState({ frame: 0 });
  }

  render() {
    const frame = this._getFrame();
    return <div>{frame}</div>;
  }

  _getChildrenArray() {
    const { children } = this.props;
    return React.Children.toArray(children || []);
  }

  _getFrame = () => {
    const { frame } = this.state;
    const childrenArr = this._getChildrenArray();

    return childrenArr.length >= frame ? childrenArr[frame] : null;
  };

  _playAnimation = () => {
    this._animationFrame = requestAnimationFrame(this._onAnimate);
  };

  _onAnimate = (timestamp: number) => {
    const {
      onSequenceEnd,
      onAnimationStop,
      loop,
      easing,
      duration,
    } = this.props;
    const childrenArr = this._getChildrenArray();

    if (!this._animationStart) {
      this._animationStart = timestamp;
    }

    let nextFrame = Math.floor(
      ease(easing)(
        timestamp - this._animationStart,
        0,
        childrenArr.length,
        duration,
      ),
    );

    if (nextFrame > childrenArr.length - 1) {
      if (onSequenceEnd) {
        onSequenceEnd();
      }

      if (loop) {
        nextFrame %= childrenArr.length;
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
}
