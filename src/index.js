import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(<App password='pass' quitKey='Escape'>
  //TODO: to be removed script below
  <script src='http://localhost/src/phasTest.js' />
</App>, document.getElementById('root')); // eslint-disable-line react/jsx-closing-tag-location

registerServiceWorker();
