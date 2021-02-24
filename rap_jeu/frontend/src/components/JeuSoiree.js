import React, { Component } from "react";
import mehdiBase from "../../static/images/mehdi_main_dans_le_dos_neutre.svg"
import Button from "@material-ui/core/Button";

export default class JeuSoiree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            equipe1: "",
            equipe2: "",
            point1: 5,
            point2: 0,
            NbQuestion: 0,
        };
        this.roomCode = this.props.match.params.roomCode;
        this.getRoomDetails();
        // vider page pour Jeusoiree
        document.querySelector("#faceSup").style.display = "none";
        document.querySelector("#faceInf").style.display = "none";
        document.querySelector("#QSN").style.display = "none";
        document.querySelector("#navContact").style.display = "none";
        document.querySelector("#nav").style.justifyContent = "center";
        document.querySelector("#app").style.display = "block"; 
        setTimeout(function() {
            document.querySelector("#app").style.display = "block"; 
        }, 1000);
    }

    getRoomDetails() {
        fetch('/api/get-room' + '?code=' + this.roomCode).then((response) => 
        response.json()
        ).then((data) => {
            this.setState({
                equipe1: data.equipeA,
                equipe2: data.equipeB,
                point1: data.pointA,
                point2: data.pointB,
                NbQuestion: data.nbQuestion,
            })
        });
    }

    render() {
        return (
        <div id="JeuSoireeDivParent">
            <div id="Jauge">Jauge</div>
            <div id="Mehdi_button">
                <Button id="buttonSoireePointAttrib1">Point Equipe {this.state.equipe1}</Button>
                <img src={mehdiBase} width="250" height="200"/>
                <Button id="buttonSoireePointAttrib2">Point equipe {this.state.equipe2}</Button>
            </div>
            <div id="Text_Soiree">Text mehdi</div>
            <div id="Voir_repSoiree">Button Voir Rep</div>
            <div id="QuestionSoiree">Question</div>
        </div>
        );
    }
}