import React from "react";
import ReactDOM from "react-dom";
import "./i18n";
import "index.css";
import App from "components/App";
import * as serviceWorker from "serviceWorker";

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.register();

if (module.hot) module.hot.accept();
