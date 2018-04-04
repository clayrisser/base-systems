import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import './style.scss';
import App from './app';

// eslint-disable-next-line no-undef
render(<App />, document.getElementById('app'));
