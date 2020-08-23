import React, {useEffect} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import {useHistory} from 'react-router-dom'
import axios from "axios";
import {SERVER_URL} from "../utils/Params";
import "../styles/turnonof.css"


export default function HomePage() {
	const history = useHistory();

	useEffect(() => {
		const user = localStorage.getItem('user');

		if (!user) {
			history.push('/login');
		}
	})

	const user = JSON.parse(localStorage.getItem('user'));


	setTimeout(() => {
		axios.get(`${SERVER_URL}/get-systemInf/${user.greenHouseId}`).then(response => {
			const data = response.data;
			if (data) {
				document.getElementById('condition').checked = data.conditioningOn === 1
				document.getElementById('lighting').checked = data.lightOn === 1
				document.getElementById('irrigation').checked = data.irrigationSystemOn === 1
			}

		}).catch(err => {
			alert("System Error")
		})

	})

	const onValueChange = () => {
		const condition = document.getElementById('condition').checked ? 1 : 0
		const lighting = document.getElementById('lighting').checked ? 1 : 0
		const irrigation = document.getElementById('irrigation').checked ? 1 : 0

		axios.put(`${SERVER_URL}/systemInf/${user.greenHouseId}`, {
			lightOn: lighting,
			conditioningOn: condition,
			irrigationSystemOn: irrigation,
			greenHouseId: user.greenHouseId
		}).catch(err => {
			alert("System Error")
		})
	}

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline/>
			<div className="checkbox-container">
				<div>
					<input type="checkbox" id="condition" name="condition" onChange={() => onValueChange()}/>
					<label htmlFor="scales">Condition System</label>
				</div>
				<div>
					<input type="checkbox" id="lighting" name="lighting" onChange={() => onValueChange()}/>
					<label htmlFor="scales">Lighting System</label>
				</div>
				<div>
					<input type="checkbox" id="irrigation" name="irrigation" onChange={() => onValueChange()}/>
					<label htmlFor="scales">Irrigation System</label>
				</div>
			</div>

		</Container>
	);
}