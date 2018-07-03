import React from 'react';
import * as Easings from "easing-utils";
import autoBind from "react-autobind";
import PropTypes from "prop-types";

export default class SpriteAnimator extends React.Component {
  static displayName = 'SpriteAnimator';

  static propTypes = {
    autoplay: PropTypes.bool,
    duration: PropTypes.number,
    delay: PropTypes.number,
    loop: PropTypes.bool,
    easing: PropTypes.oneOf(Object.keys(Easings)),
    children: React.PropTypes.node
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

  render() {
    const {children} = this.props;

    return (
      <div>{React.Children.only(children)}</div>
    );
  }
}