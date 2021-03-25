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
import buzzer from "../../static/images/buzzer_jaune.svg";
import mircro from "../../static/images/micro_gris.svg";

export default class CreateRoomPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
        Equipe1: "",
        Equipe2: "",
        error: "",
    };

    this.HandleRoomButtonPressed = this.HandleRoomButtonPressed.bind(this);
    this.BeforeHandleRoomButtonPressed = this.BeforeHandleRoomButtonPressed.bind(this);
    this.ReprendrePartie = this.ReprendrePartie.bind(this);
    this.Equipe1Change = this.Equipe1Change.bind(this);
    this.Equipe2Change = this.Equipe2Change.bind(this);
    // init page accueil
    document.querySelector("#app").style.width = "";
    document.querySelector("#app").style.height = "";
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

  // anime de passage au jeu 

  BeforeHandleRoomButtonPressed() {
    if (this.state.Equipe1 === "" || this.state.Equipe2 === "") {
      document.querySelector("#texterrorMess").innerHTML = "Invalide: Les Noms d'équipes ne doivent pas être trop grands";
      console.log('error');
      return;
    }

    if (this.state.Equipe1.length > 12 || this.state.Equipe2.length > 12) {
      document.querySelector("#texterrorMess").innerHTML = "Invalide: Les Noms d'équipes ne doivent pas être trop grands";
      console.log('error');
      return;
    }

    $("#SoireeCreateParent").removeClass("swing-in-top-fwd");
    $("#SoireeCreateParent").addClass("puff-out-center");

    setTimeout(
        function() {
            this.HandleRoomButtonPressed()
        }
        .bind(this),
        1000
    );

  }



  HandleRoomButtonPressed() {
    if (this.state.Equipe1 === "" || this.state.Equipe2 === "") {
      document.querySelector("#texterrorMess").innerHTML = "Les noms d'équipes sont soient trop grands soit inexistants, fait un effort frrrr";
      console.log('error');
      return;
    }

    if (this.state.Equipe1.length > 25 || this.state.Equipe2.length > 25) {
      document.querySelector("#texterrorMess").innerHTML = "Les noms d'équipes sont soient trop grands soit inexistants, fait un effort frrrr";
      console.log('error');
      return;
    }

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
          equipeA: this.state.Equipe1,
          equipeB: this.state.Equipe2,
      }),
    };
    fetch("/api/create-room", requestOptions)
      .then((response) => response.json())
      .then((data) => this.props.history.push("/Soiree/" + data.code));
  }

  ReprendrePartie() {

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
      }),
    };
    fetch("/api/reprendre-room", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.code === undefined) {
          console.log("erreurzer");
          document.querySelector("#texterrorMess").innerHTML = "Aucune Partie En Cours";
        } else {
          document.querySelector("#SoireeCreateParent").style.animation = "Disapear 1s";
          document.querySelector("#SoireeCreateParent").style.animationFillMode = "forwards";
          console.log("ok");
          this.props.history.push("/Soiree/" + data.code);
        }
      });
  }

  render() {
    return (
        <div id="SoireeCreateParent">
            <div id="Contain_text_buzzer_micro">
              <div id="SoireeCreateText">
                <h2 id="blockRed"></h2>
                <p id="basblockRed">Ce mode se joue à la manière d'un picolo:<br/> choisissez un animateur et formez deux équipes
                </p>
              </div>
            </div>
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
            <Button id="buttonSoireeCreate" onClick={this.BeforeHandleRoomButtonPressed} >Nouvelle Partie</Button>
            <Button id="buttonSoireeReprendre" onClick={this.ReprendrePartie} >Reprendre Partie En Cours</Button>
            <div id="errorMess"><p id="texterrorMess"></p></div>
        </div> 
    );
  }
}