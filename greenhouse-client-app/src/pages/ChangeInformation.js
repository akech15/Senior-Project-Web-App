import React, {useEffect} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import {useHistory} from 'react-router-dom'
import Button from "@material-ui/core/Button";
import {SERVER_URL} from "../utils/Params";
import * as axios from "axios";


export default function ChangeInformation() {
	const history = useHistory();

	useEffect(() => {
		const user = localStorage.getItem('user');

		if (!user) {
			history.push('/login');
		}
	})

	const user = JSON.parse(localStorage.getItem('user'));
	const saveInfo = () => {
		let data = {
			greenHouseId: user.greenHouseId,
			downTemperatureLimit: document.getElementById('downTemperatureLimit').value,
			upTemperatureLimit: document.getElementById('upTemperatureLimit').value,
			downMoistureLimit: document.getElementById('downMoistureLimit').value,
			upMoistureLimit: document.getElementById('upMoistureLimit').value,
			downLightLimit: document.getElementById('downLightLimit').value,
			upLightLimit: document.getElementById('upLightLimit').value,
		};

		console.log(data)

		axios.put(`${SERVER_URL}/limits/${user.greenHouseId}`, data).catch(err => {
			alert("System Error")
		})
	}


	setTimeout(() => {
		axios.get(`${SERVER_URL}/get-limits/${user.greenHouseId}`).then(response => {
			const data = response.data;
			if (data) {
				document.getElementById('downTemperatureLimit').value = data.downTemperatureLimit
				document.getElementById('upTemperatureLimit').value = data.upTemperatureLimit
				document.getElementById('downMoistureLimit').value = data.downMoistureLimit
				document.getElementById('upMoistureLimit').value = data.upMoistureLimit
				document.getElementById('downLightLimit').value = data.downLightLimit
				document.getElementById('upLightLimit').value = data.upLightLimit
			}

		}).catch(err => {
			alert("System Error")
		})
	})


	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline/>
			<div className="checkbox-container">
				<div>
					<strong>Temperature</strong><br/>
					<div>from: <input id="downTemperatureLimit" width="10px" type="number"/></div>
					<div>to: <input id="upTemperatureLimit" width="10px" type="number"/></div>
				</div>
				<div>
					<strong>Moisture</strong><br/>
					<div>from: <input id="downMoistureLimit" width="10px" type="number"/></div>
					<div>to: <input id="upMoistureLimit" width="10px" type="number"/></div>
				</div>
				<div>
					<strong>Light</strong><br/>
					<div>from: <input id="downLightLimit" width="10px" type="number"/></div>
					<div>to: <input id="upLightLimit" width="10px" type="number"/></div>
				</div>
				<br/>
				<Button
					type="button"
					fullWidth
					variant="contained"
					color="primary"
					onClick={() => saveInfo()}>
					Apply Changes
				</Button>
			</div>
		</Container>
	);
}