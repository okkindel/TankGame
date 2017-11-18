import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(<App password='pass' quitKey='Escape' reset='q'>
  <script src='http://localhost/src/phasTest.js' />
</App>, document.getElementById('root')); // eslint-disable-line react/jsx-closing-tag-location

registerServiceWorker();
