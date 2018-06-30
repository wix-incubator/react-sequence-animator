import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as Easings from 'easing-utils';
import autoBind from 'react-autobind';

export default class SequenceAnimator extends Component {
    static displayName = 'SequenceAnimator';

    static propTypes = {
      autoplay: PropTypes.bool,
      duration: PropTypes.number,
      delay: PropTypes.number,
      loop: PropTypes.bool,
      easing: PropTypes.oneOf(Object.keys(Easings)),
      children: PropTypes.oneOfType([
        React.PropTypes.arrayOf(React.PropTypes.node),
        React.PropTypes.node
      ])
    };

    static defaultProps = {
      autoplay: true,
      easing: 'linear',
      loop: true,
      children: []
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

    render() {
      const frame = this._getFrame();
      return (
        <div>{frame}</div>
      );
    }

    _getFrame() {
      const {frame} = this.state;
      const {children} = this.props;

      return (children.length >= frame) ? children[frame] : null;
    }

    start() {
      this._playAnimation();
    }

    stop() {
      cancelAnimationFrame(this._animationFrame);
    }

    _playAnimation() {
      this._animationFrame = requestAnimationFrame(this._onAnimate);
    }

    _onAnimate() {
      const {frame} = this.state;
      const {children, loop} = this.props;
      let nextFrame = frame + 1;

      if (nextFrame > children.length - 1) {
        if (loop) {
          nextFrame %= children.length;
        } else {
          nextFrame = -1;
        }
      }

      if (nextFrame > -1) {
        this.setState({frame: ((frame + 1) % (children ? children.length : 1))}, () => {
          this._playAnimation();
        });
      }
    }
}

function doEase(pos, start, end) {
  return start + ((end - start) * pos);
}

export const ease = easeName => (t, start, end, duration) => doEase(Easings[easeName](t / duration), start, end);
