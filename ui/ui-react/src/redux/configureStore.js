import {applyMiddleware, compose, createStore } from "redux";
import rootReducer from "./reducers/";
import thunkMiddleware from "redux-thunk";
import { loadInitialState as loadSessionInitialState } from "./reducers/session";
import { composeWithDevTools } from 'redux-devtools-extension'
export default function configureStore() {
  const middlewares = [
    thunkMiddleware
  ];

  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];

  if(process.env.NODE_ENV === "development"){
    enhancers.push(composeWithDevTools());
  }
  //const enhancers = [middlewareEnhancer, composeWithDevTools()];
  const composedEnhancers = compose(...enhancers);

  const initialState = {session:loadSessionInitialState()}

  const store = createStore(rootReducer, initialState, composedEnhancers, );

  return store;
}
