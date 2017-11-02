import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from "redux";
import Application from './src/Application';
import { rootReducer } from "./src/reducers";

export default class App extends React.Component {
	render() {
		return (
			<Provider store={ createStore(rootReducer) } >
				<Application />
			</Provider>
		);
	}
}
