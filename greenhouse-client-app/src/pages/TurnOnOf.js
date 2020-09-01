import React, {useEffect} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import {useHistory} from 'react-router-dom'
import axios from "axios";
import {SERVER_URL} from "../utils/Params";
import "../styles/turnonof.css"
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";

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
                let conditionElement = document.getElementById('condition');
                let irrigationElement = document.getElementById('irrigation');
                let lightingElement = document.getElementById('lighting');

                conditionElement.checked = data.conditioningOn === 0
                lightingElement.checked = data.lightOn === 0
                irrigationElement.checked = data.irrigationSystemOn === 0

                conditionElement.click();
                irrigationElement.click();
                lightingElement.click();

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
    };

    return (
        <Container component="main" maxWidth="xs" id="controller_container">
            <CssBaseline/>
            <div id="turn_on_off_wrapper">
                <Typography component="h1" variant="h5" id="trun_on_off_page_name">
                    Green House System Controller
                </Typography>
                <CssBaseline/>
                <div id="form-control-wrapper2">
                    <div id="form-control-wrapper">
                        <FormControl component="fieldset" id="form-controller">
                            <FormGroup id="turn-on-off-form">
                                <FormControlLabel className="kukuri"
                                                  control={<Switch id="condition"/>}
                                                  label="Condition System"
                                />
                                <CssBaseline/>
                                <FormControlLabel className="kukuri"
                                                  control={<Switch id="lighting"/>}
                                                  label="Lighting System"
                                />
                                <FormControlLabel className="kukuri"
                                                  control={<Switch id="irrigation"/>}
                                                  label="Irrigation System"
                                />
                                <Button
                                    type="button"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    onClick={() => onValueChange()}>
                                    Apply Changes
                                </Button>
                            </FormGroup>
                        </FormControl>
                    </div>
                </div>
            </div>
        </Container>
    );
}

