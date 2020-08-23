import React from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom'
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./pages/HomePage";
import EntryPage from "./pages/EntryPage";
import TurnOnOff from "./pages/TurnOnOf";
import GreenHouseInfo from "./pages/GreenHouseInfo";
import ChangeInformation from "./pages/ChangeInformation";

function App() {

	return (
		<Switch>
			<Route path="/register">
				<Register/>
			</Route>
			<Route path="/login">
				<Login/>
			</Route>
			<Route path="/home-page">
				<HomePage/>
			</Route>
			<Route path="/turn-on-off">
				<TurnOnOff/>
			</Route>
			<Route path="/green-house-info">
				<GreenHouseInfo/>
			</Route>
			<Route path="/green-house-change">
				<ChangeInformation/>
			</Route>
			<Route path="/" exact>
				<EntryPage/>
			</Route>
		</Switch>

	);
}

export default App;
