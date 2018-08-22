import React from 'react';
import ReactDOM from 'react-dom';

import './styles/index.css';

import App from './App';

import state from './state';


const context = {
  state,
};

ReactDOM.render(
  <App context={context} />,
  document.getElementById('root')
);
