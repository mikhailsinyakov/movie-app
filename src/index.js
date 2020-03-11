import React from "react";
import ReactDOM from "react-dom";
import "index.css";
import App from "components/App";
import withLanguage from "components/Language";
import * as serviceWorker from "serviceWorker";

const AppWithLanguage = withLanguage(App);
ReactDOM.render(<AppWithLanguage />, document.getElementById("root"));
serviceWorker.unregister();

if (module.hot) module.hot.accept();
