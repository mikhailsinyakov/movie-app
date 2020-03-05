import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import { withLanguage } from "./components/Language";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(withLanguage(App), document.getElementById("root"));
serviceWorker.unregister();

if (module.hot) module.hot.accept();
