import { Provider } from 'react-redux'
import { createStore } from 'redux';
import reducer from '../../reducers/index';
import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../components/App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={createStore(reducer)}>
      <App />
    </Provider>, div);
});
