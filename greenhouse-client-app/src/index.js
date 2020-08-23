import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom'
import Copyright from "./utils/footer";
import Box from "@material-ui/core/Box";

ReactDOM.render(
	<React.StrictMode className="asd">
		<BrowserRouter>
			<App/>
		</BrowserRouter>
		<Box mt={8}>
			<Copyright/>
		</Box>
	</React.StrictMode>,
	document.getElementById('root')

);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
