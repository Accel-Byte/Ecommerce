import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { GlobalState } from './state/provider';
import reducer, { initialState } from './state/reducer';

ReactDOM.render(
  <GlobalState initialState={initialState} reducer={reducer}>
    <App />
  </GlobalState>,
  document.getElementById('root')
);
