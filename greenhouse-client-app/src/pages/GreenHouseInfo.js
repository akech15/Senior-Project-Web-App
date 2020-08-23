import React, {useEffect} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import {useHistory} from 'react-router-dom'
import axios from "axios";
import {SERVER_URL} from "../utils/Params";

import "../styles/ghinfo.css"


export default function GreenHouseInfo() {
	const history = useHistory();

	useEffect(() => {
		const user = localStorage.getItem('user');

		if (!user) {
			history.push('/login');
		}
	})

	const user = JSON.parse(localStorage.getItem('user'));


	setTimeout(() => {
		axios.get(`${SERVER_URL}/get-green-house//${user.greenHouseId}`).then(response => {
			const data = response.data;
			if (data) {
				document.getElementById('az-1').innerText = data.temperature
				document.getElementById('az-2').innerText = data.humidity
				document.getElementById('az-3').innerText = data.moisture
				document.getElementById('az-4').innerText = data.light
			} else {
				document.getElementById('az-1').innerText = "no info"
				document.getElementById('az-2').innerText = "no info"
				document.getElementById('az-3').innerText = "no info"
				document.getElementById('az-4').innerText = "no info"
			}

		}).catch(err => {
			alert("System Error")
		})

	})


	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline/>
			<div className="checkbox-container">
				<strong>temperature</strong> : <strong id="az-1">waiting for server</strong><br/>
				<strong>humidity </strong> : <strong id="az-2">waiting for server</strong><br/>
				<strong> moisture </strong> : <strong id="az-3">waiting for server</strong><br/>
				<strong> light</strong> : <strong id="az-4">waiting for server</strong><br/>
			</div>

		</Container>
	);
}