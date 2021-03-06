import * as serviceWorker from "./serviceWorker";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom";
import rootSaga from "./redux/sagas";
import reducer from "./redux/reducers";
import createSagaMiddleware from "redux-saga";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);

const Tree = () => (
  <Provider store={store}>
    <App dispatch={store.dispatch} />
  </Provider>
);

ReactDOM.render(<Tree />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
