import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as Easings from 'easing-utils';

function doEase(pos, start, end) {
  return start + ((end - start) * pos);
}

export const ease = easeName => (t, start, end, duration) => doEase(Easings[easeName](t / duration), start, end);

export default class SequenceAnimator extends Component {
  static displayName = 'SequenceAnimator';

  static propTypes = {
    autoplay: PropTypes.bool,
    duration: PropTypes.number,
    loop: PropTypes.bool,
    easing: PropTypes.oneOf(Object.keys(Easings)),
    onSequenceEnd: PropTypes.func,
    onAnimationStop: PropTypes.func,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ])
  };

  static defaultProps = {
    duration: 1000,
    autoplay: true,
    easing: 'linear',
    loop: true,
    children: [],
    onSequenceEnd: () => {},
    onAnimationStop: () => {}
  };

  constructor() {
    super();
    this.state = {
      frame: 0
    };
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
    const frame = this._getFrame();
    return (
      <div>{frame}</div>
    );
  }

  _getFrame = () => {
    const {frame} = this.state;
    const {children} = this.props;
    const childrenArr = React.Children.toArray(children);

    return (childrenArr.length >= frame) ? childrenArr[frame] : null;
  };

  _playAnimation = () => {
    this._animationFrame = requestAnimationFrame(this._onAnimate);
  };

  _onAnimate = timestamp => {
    const {onSequenceEnd, onAnimationStop, children, loop, easing, duration} = this.props;
    const childrenArr = React.Children.toArray(children);

    if (!this._animationStart) {
      this._animationStart = timestamp;
    }

    let nextFrame = Math.floor(ease(easing)(timestamp - this._animationStart, 0, childrenArr.length, duration));

    if (nextFrame > childrenArr.length - 1) {
      onSequenceEnd();

      if (loop) {
        nextFrame %= childrenArr.length;
        this._animationStart = timestamp;
      } else {
        nextFrame = -1;
      }
    }

    if (nextFrame > -1) {
      this.setState({frame: nextFrame}, () => {
        this._playAnimation();
      });
    } else {
      onAnimationStop();
    }
  }
}
