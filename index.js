import { createStore, combineReducers } from 'redux';
// import pageReducer from '../reducers/pageReducer';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {registerRootComponent} from 'expo'
import React from 'react';
import App from './App';
import {name} from './app.json'
import {Provider} from 'react-redux'

// const rootReducer = combineReducers(
//   { pageList: pageReducer }
// );

// const configureStore = () => {
//   return createStore(rootReducer, applyMiddleware(thunk));
// }



// const store = null;

const ReduxApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

registerRootComponent(App)