import React, {useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from "axios";
import {SERVER_URL} from "../utils/Params";
import {useHistory} from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function Register() {

	const history = useHistory();
	const classes = useStyles();

	useEffect(() => {
		const user = localStorage.getItem('user');

		if (user) {
			history.push('/home-page');
		}
	})

	const register = () => {
		const greenHouseId = document.getElementById("greenHouseId").value;
		const username = document.getElementById("username").value;
		const password = document.getElementById("password").value;
		const repeatPassword = document.getElementById("repeatPassword").value;

		console.log(greenHouseId, username, password, repeatPassword)

		if (password !== repeatPassword) {
			console.log("ASD")
			document.getElementById("id_ra").textContent = 'Passwords do not match'

		} else {


			axios.put(`${SERVER_URL}/userInf/${greenHouseId}`, {
				userName: username,
				password: password
			}).then(response => {
				const data = response.data;
				console.log(data)
				if (!data.userAdded) {
					if (data.userAlreadyExists) {
						document.getElementById("id_ra").textContent = "User Name Already Exists"
					} else if (data.greenHouseIdInUse) {
						document.getElementById("id_ra").textContent = "GreenHouse Id Is Already In Use"
					} else {
						document.getElementById("id_ra").textContent = "GreenHouse Id Does Not Exists"
					}
				} else {
					console.log("aqavas")
					localStorage.setItem('user', JSON.stringify(data.user));
					history.push('home-page')
				}
			}).catch(err => {
				alert("system error")
			})
		}
	}

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline/>
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon/>
				</Avatar>
				<Typography component="h1" variant="h5" id={"id_ra"}>
					Register
				</Typography>
				<form className={classes.form} noValidate>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="greenHouseId"
						label="Green House Id"
						name="greenHouse"
						autoFocus
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="username"
						label="Username"
						name="username"
						autoFocus
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="repeatPassword"
						label="Repeat Password"
						type="password"
						id="repeatPassword"
						autoComplete="current-password"
					/>
					<Button
						type="button"
						fullWidth
						variant="contained"
						color="primary"
						onClick={() => register()}
						className={classes.submit}
					>
						Register
					</Button>
				</form>
			</div>

		</Container>
	);
}
