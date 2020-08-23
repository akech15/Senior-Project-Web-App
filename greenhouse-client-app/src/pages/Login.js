import React, {useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useHistory} from 'react-router-dom'
import axios from "axios";
import {SERVER_URL} from "../utils/Params";


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

export default function Login() {
	const classes = useStyles();
	const history = useHistory();


	useEffect(() => {
		const user = localStorage.getItem('user');

		if (user) {
			history.push('/home-page');
		}
	})

	const logIn = () => {
		const username = document.getElementById("username").value;
		const password = document.getElementById("password").value;


		axios.get(`${SERVER_URL}/get-user/${username}/${password}`).then(response => {
			const data = response.data;
			if (data) {
				localStorage.setItem("user", JSON.stringify(data))
				history.push('home-page')
			} else {
				document.getElementById("login").textContent = "User Login Or Password Incorrect";
			}
		}).catch(err => {
			alert("system error")
		})

	}

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline/>
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon/>
				</Avatar>
				<Typography component="h1" variant="h5" id="login">
					Sign in
				</Typography>
				<form className={classes.form} noValidate>
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
					<Button
						type="button"
						fullWidth
						variant="contained"
						color="primary"
						onClick={() => logIn()}
						className={classes.submit}
					>
						Sign In
					</Button>
					<Grid container>
						<Grid item onClick={() => history.push('Register')}>
							<Link variant="body2">
								{"Don't have an account? Sign Up"}
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>

		</Container>
	);
}