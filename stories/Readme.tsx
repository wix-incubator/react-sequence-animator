import { storiesOf } from '@storybook/react';
import { doc } from 'storybook-readme';
import ProjectReadme from '../README.md';

storiesOf('README').add('Default', doc(ProjectReadme));
