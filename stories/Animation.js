import React from 'react';
import autoBind from 'react-autobind';
import SequenceAnimator from '../src/SequenceAnimator';

const cat1 = require('./statics/cat1.png');
const cat2 = require('./statics/cat2.png');
const cat3 = require('./statics/cat3.png');
const cat4 = require('./statics/cat4.png');
const cat5 = require('./statics/cat5.png');
const cat6 = require('./statics/cat6.png');
const cat7 = require('./statics/cat7.png');
const cat8 = require('./statics/cat8.png');

export default class Animation extends React.Component {
  constructor() {
    super();
    this.state = {
      duration: 1000
    };
    autoBind(this);
  }

  render() {
    const {duration} = this.state;
    return (
      <div>
        <SequenceAnimator autoplay duration={duration}>
          <img src={cat1} alt="1"/>
          <img src={cat2} alt="2"/>
          <img src={cat3} alt="3"/>
          <img src={cat4} alt="4"/>
          <img src={cat5} alt="5"/>
          <img src={cat6} alt="6"/>
          <img src={cat7} alt="7"/>
          <img src={cat8} alt="8"/>
        </SequenceAnimator>
        <div><label htmlFor="duration">Duration:</label><input type="number" value={duration} onChange={this._onDurationChange}/></div>
      </div>
    );
  }

  _onDurationChange(e) {
    const {target} = e;
    this.setState({duration: target.value});
  }
}
