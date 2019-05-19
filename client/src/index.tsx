import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import rootSaga from "./redux/sagas";
import App from "./App";
import reducer from "./redux/reducers";
import * as serviceWorker from "./serviceWorker";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);

const Tree = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(<Tree />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
