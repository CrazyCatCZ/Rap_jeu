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
        Equipe1: "",
        Equipe2: "",
    };

    this.HandleRoomButtonPressed = this.HandleRoomButtonPressed.bind(this);
    this.Equipe1Change = this.Equipe1Change.bind(this);
    this.Equipe2Change = this.Equipe2Change.bind(this);
  }

  Equipe1Change(e) {
    this.setState({
      Equipe1: e.target.value,
    });
  }

  Equipe2Change(e) {
    this.setState({
      Equipe2: e.target.value,
    });
  }

  HandleRoomButtonPressed() {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
          equipeA: this.state.Equipe1,
          equipeB: this.state.Equipe2,
      }),
    };
    fetch('/api/create-room', requestOptions).then((response) => 
    response.json()
    ).then((data) => this.props.history.push("/Soiree/" + data.code));
  }

  render() {
    return (
        <div id="SoireeCreateParent">
            <p id="SoireeCreateText">Mode Soirée<br/> Choisissez votre Mehdi Maizi puis insérez le nom des deux équipes
            </p>
            <FormControl>
                <TextField required={true} type="text" onChange={this.Equipe1Change} />
                <FormHelperText>
                    <div id="Equi1" align="center">EQUIPE 1</div>
                </FormHelperText>
            </FormControl>
            <FormControl>
                <TextField required={true} type="text" onChange={this.Equipe2Change} />
                <FormHelperText>
                    <div id="Equi2" align="center">EQUIPE 2</div>
                </FormHelperText>
            </FormControl>
            <Button id="buttonSoireeCreate" onClick={this.HandleRoomButtonPressed} >LANCER</Button>
        </div> 
    );
  }
}