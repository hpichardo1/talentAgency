import { render } from 'react-dom';
import React from 'react';
import Main from './components/Main'
import { Provider } from 'react-redux'
import store from '../store'

render(
<Provider store={store}>
  <Main/>
</Provider>, document.querySelector('#root'));