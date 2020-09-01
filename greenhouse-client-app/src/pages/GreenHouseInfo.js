import React, {useEffect} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import {useHistory} from 'react-router-dom'
import axios from "axios";
import {SERVER_URL} from "../utils/Params";

import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";


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

export default function GreenHouseInfo() {
    const classes = useStyles();
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
                document.getElementById('az-1').value = data.temperature
                document.getElementById('az-2').value = data.humidity
                document.getElementById('az-3').value = data.moisture
                document.getElementById('az-4').value = data.light
            } else {
                document.getElementById('az-1').value = "no info"
                document.getElementById('az-2').value = "no info"
                document.getElementById('az-3').value = "no info"
                document.getElementById('az-4').value = "no info"
            }

        }).catch(err => {
            alert("System Error")
        })

    })


    return (

        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Typography component="h1" variant="h5" id="login">
                    Green House State
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        inputProps={{
                            readOnly: true,
							disabled: true
                        }}
                        defaultValue="Fetching Data"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="az-1"
                        label="Temperature"
                    />
                    <TextField
                        inputProps={{
                            readOnly: true,
							disabled: true
						}}
                        defaultValue="Fetching Data"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="az-2"
                        label="Humidity"
                    />
                    <TextField
                        inputProps={{
                            readOnly: true,
							disabled: true
						}}
                        defaultValue="Fetching Data"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="az-3"
                        label="Moisture"
                    />
                    <TextField
                        inputProps={{
                            readOnly: true,
							disabled: true
						}}
                        defaultValue="Fetching Data"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="az-4"
                        label="Light"
                    />
                </form>
            </div>

        </Container>



        // <Container component="main" maxWidth="xs">
        // 	<CssBaseline/>
        // 	<div className="checkbox-container">
        // 		<strong>temperature</strong> : <strong id="az-1">waiting for server</strong><br/>
        // 		<strong>humidity </strong> : <strong id="az-2">waiting for server</strong><br/>
        // 		<strong> moisture </strong> : <strong id="az-3">waiting for server</strong><br/>
        // 		<strong> light</strong> : <strong id="az-4">waiting for server</strong><br/>
        // 	</div>
        //
        // </Container>
    );
}
