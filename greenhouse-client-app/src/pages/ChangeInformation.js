import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom'
import Button from "@material-ui/core/Button";
import {SERVER_URL} from "../utils/Params";
import * as axios from "axios";
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import '../styles/changeinfo.css'

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

export default function ChangeInformation() {
    const classes = useStyles();
    const history = useHistory();

    const [sendRequestCount, setSentRequestCount] = useState(0)

    const [temperatureFrom, setTemperatureFrom] = useState('');
    const [temperatureTo, setTemperatureTo] = useState('');

    const [moistureFrom, setMoistureFrom] = useState('');
    const [moistureTo, setMoistureTo] = useState('');

    const [lightFrom, setLightFrom] = useState('');
    const [lightTo, setLightTo] = useState('');

    useEffect(() => {
        const user = localStorage.getItem('user');

        if (!user) {
            history.push('/login');
        }
    })

    const user = JSON.parse(localStorage.getItem('user'));
    const saveInfo = event => {
        event.preventDefault();
        let data = {
            greenHouseId: user.greenHouseId,
            downTemperatureLimit: document.getElementById('downTemperatureLimit').value,
            upTemperatureLimit: document.getElementById('upTemperatureLimit').value,
            downMoistureLimit: document.getElementById('downMoistureLimit').value,
            upMoistureLimit: document.getElementById('upMoistureLimit').value,
            downLightLimit: document.getElementById('downLightLimit').value,
            upLightLimit: document.getElementById('upLightLimit').value,
        };

        axios.put(`${SERVER_URL}/limits/${user.greenHouseId}`, data).catch(err => {
            alert("System Error")
        })
    };

    setTimeout(() => {
        if (sendRequestCount !== 0) {
            return
        }
        axios.get(`${SERVER_URL}/get-limits/${user.greenHouseId}`).then(response => {
                const data = response.data;
                if (data) {
                    setTemperatureFrom(data.downTemperatureLimit);
                    setTemperatureTo(data.upTemperatureLimit);
                    setMoistureFrom(data.downMoistureLimit);
                    setMoistureTo(data.upMoistureLimit);
                    setLightFrom(data.downLightLimit);
                    setLightTo(data.upLightLimit);
                }
            }
        ).catch(err => {
            alert("System Error")
        }).finally(() => setSentRequestCount(1))
    })

    return (
        <form className={classes.root} noValidate autoComplete="off" onSubmit={saveInfo}>
            <div id="change_info_wrapper">
                <Typography component="h1" variant="h5" id="change_info_page_name">
                    Green House Limits
                </Typography>
                <div id="change_info_content">
                    <div id="bla">
                        <TextField

                            variant="outlined"
                            id="downTemperatureLimit"
                            label="Temperature From"
                            name="downTemperatureLimit"
                            type="number"
                            onChange={(event) => setTemperatureFrom(event.target.value)}
                            value={temperatureFrom}
                        />
                        <TextField
                            variant="outlined"
                            id="upTemperatureLimit"
                            type="number"
                            value={temperatureTo}
                            name="upTemperatureLimit"
                            onChange={(event) => setTemperatureTo(event.target.value)}
                            label="Temperature To"/>
                    </div>
                    <div>
                        <TextField
                            variant="outlined"
                            id="downMoistureLimit"
                            label="Moisture From"
                            type="number"
                            value={moistureFrom}
                            onChange={(event) => setMoistureFrom(event.target.value)}/>
                        <TextField
                            variant="outlined"
                            id="upMoistureLimit"
                            type="number"
                            value={moistureTo}
                            onChange={(event) => setMoistureTo(event.target.value)}
                            label="Moisture To"/>
                    </div>
                    <div>
                        <TextField
                            id="downLightLimit"
                            label="Light From"
                            variant="outlined"
                            type="number"
                            value={lightFrom}
                            onChange={(event) => setLightFrom(event.target.value)}
                        />
                        <TextField
                            type="number"
                            variant="outlined"
                            value={lightTo}
                            id="upLightLimit"
                            label="Light To"
                            onChange={(event) => setLightTo(event.target.value)}
                        />
                    </div>
                    <Button
                        id="change_info_apply"
                        type="submit"
                        variant="outlined"
                        fullWidth
                        color="primary">
                        Apply Changes
                    </Button>
                </div>
            </div>
        </form>
    );
}
