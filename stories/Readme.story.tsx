import ProjectReadme from '../README.md';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { SequenceAnimator } from '../src/SequenceAnimator';
import ballImages from './ballImages';

export default {
  title: 'README',
};

export const Introduction = () => (
  <ReactMarkdown>{ProjectReadme}</ReactMarkdown>
);

const HEIGHT = 600;
const DURATION = 1200;

export const EasingStory = () => (
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

EasingStory.storyTitle = 'Easing';
