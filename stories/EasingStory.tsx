import React from 'react';
import { SequenceAnimator } from '../src/SequenceAnimator';
import { storiesOf } from '@storybook/react';
import ballImages from './ballImages';

const HEIGHT = 600;
const DURATION = 1200;

class EasingStory extends React.Component {
  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <SequenceAnimator autoplay duration={DURATION} easing="easeOutBounce">
          {ballImages.map((src) => (
            <img key={src} height={HEIGHT} src={src} alt={src} />
          ))}
        </SequenceAnimator>
        <SequenceAnimator autoplay duration={DURATION}>
          {ballImages.map((src) => (
            <img key={src} height={HEIGHT} src={src} alt={src} />
          ))}
        </SequenceAnimator>
      </div>
    );
  }
}

storiesOf('README').add('Easing', () => <EasingStory />);
