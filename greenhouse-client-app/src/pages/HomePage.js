import React, {useEffect} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
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

export default function HomePage() {
	const classes = useStyles();
	const history = useHistory();

	useEffect(() => {
		const user = localStorage.getItem('user');

		if (!user) {
			history.push('/login');
		}
	})


	return (

		<Container component="main" maxWidth="xs">
			<Button
				type="button"
				fullWidth
				variant="contained"
				color="primary"
				onClick={() => {
					localStorage.removeItem('user')
					history.push('login')
				}}
				className={classes.submit}
			>
				LOGOUT
			</Button>
			<CssBaseline/>
			<div className={classes.paper}>
				<form className={classes.form} noValidate>
					<Button
						type="button"
						fullWidth
						variant="contained"
						color="primary"
						onClick={() => history.push('green-house-info')}
						className={classes.submit}
					>
						Green House Information
					</Button>
					<Button
						type="button"
						fullWidth
						variant="contained"
						onClick={() => history.push('green-house-change')}
						color="primary"
						className={classes.submit}
					>
						Change Green House Parameters
					</Button>
					<Button
						type="button"
						fullWidth
						variant="contained"
						color="primary"
						onClick={() => history.push('turn-on-off')}
						className={classes.submit}
					>
						Turn On/Off
					</Button>

				</form>
			</div>

		</Container>
	);
}