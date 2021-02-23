import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { Link } from "react-router-dom";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

export default class CreateRoomPage extends Component {
  defaultVotes = 2;

  constructor(props) {
    super(props);
    this.state = {
      guestCanPause: true,
      votesToSkip: this.defaultVotes,
    };

  }

  render() {
    return (
        <div id="SoireeCreateParent">
            <p id="SoireeCreateText">Bienvenue dans Rap jeu,
            Veuillez désignez celui votre animateur 
            ainsi que le noms des deux équipes
            </p>
            <FormControl>
                <TextField required={true} type="text"/>
                <FormHelperText>
                    <div id="Equi1" align="center">EQUIPE 1</div>
                </FormHelperText>
            </FormControl>
            <FormControl>
                <TextField required={true} type="text" />
                <FormHelperText>
                    <div id="Equi2" align="center">EQUIPE 2</div>
                </FormHelperText>
            </FormControl>
            <Button id="buttonSoireeCreate">LANCER</Button>
        </div> 
    );
  }
}