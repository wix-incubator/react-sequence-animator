import React from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';

export default class AnimationStory extends React.Component {
  static displayName = 'AnimationStory';

  static propTypes = {
    children: PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.node),
      React.PropTypes.node
    ]),
    showReset: PropTypes.bool,
    duration: PropTypes.number
  };

  constructor(props) {
    super(props);
    this.state = {
      duration: props.duration || 600,
      isRunning: true
    };
    autoBind(this);
  }

  render() {
    const {duration, isRunning} = this.state;
    const {children, showReset} = this.props;
    const btnText = isRunning ? 'Pause' : 'Play';

    return (
      <div>
        {React.cloneElement(React.Children.only(children), {ref: this._elemRef, duration: Number(duration)})}
        <div><label htmlFor="duration">Duration:</label><input type="number" value={duration} onChange={this._onDurationChange}/></div>
        <div><input style={{width: '120px'}} type="button" value={btnText} onClick={this._onStop}/></div>
        <div><input style={{width: '120px'}} type="button" value="Reset to start" disabled={!showReset && isRunning} onClick={this._onReset}/></div>
      </div>
    );
  }

  _elemRef(el) {
    this._elem = el;
  }

  _onStop() {
    const {isRunning} = this.state;

    if (this._elem) {
      if (isRunning) {
        this._elem.stop();
      } else {
        this._elem.start();
      }
    }

    this.setState({isRunning: !isRunning});
  }

  _onReset() {
    if (this._elem) {
      this._elem.reset();
    }
  }

  _onDurationChange(e) {
    const {target} = e;
    this.setState({duration: target.value});
  }
}
