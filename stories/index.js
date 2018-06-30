import React from 'react';
import {storiesOf} from '@storybook/react';
import Animation from './Animation';

storiesOf('Hello', module)
  .add('default view', () => (
    <Animation/>
  ));
