import { Provider } from 'react-redux'
import { createStore } from 'redux';
import reducer from './reducers/index';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';;


ReactDOM.render(
  <Provider store={createStore(reducer)}>
    <App />
  </Provider>, document.getElementById('app-root'));
registerServiceWorker();
