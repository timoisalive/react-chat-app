import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { createStore } from "redux";
import Application from "./Application";
import { rootReducer } from "./reducers";
import registerServiceWorker from "./registerServiceWorker";
import 'semantic-ui-css/semantic.min.css';
import './styles.css';

ReactDOM.render(
	<Provider store={ createStore(rootReducer) } >
		<Application />
	</Provider>,
	document.getElementById("root"));

registerServiceWorker();
