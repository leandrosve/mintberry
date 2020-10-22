import {applyMiddleware, compose, createStore } from "redux";
import rootReducer from "./reducers/";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";

export default function configureStore() {
  const middlewares = [
    thunkMiddleware
  ];

  const middlewareEnhancer = applyMiddleware(...middlewares);

  //const enhancers = [middlewareEnhancer];
  const enhancers = [middlewareEnhancer, composeWithDevTools()];
  const composedEnhancers = compose(...enhancers);

  const store = createStore(rootReducer, composedEnhancers, );

  return store;
}
