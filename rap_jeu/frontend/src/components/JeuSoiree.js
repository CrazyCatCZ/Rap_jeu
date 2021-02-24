import React, { Component } from "react";
import mehdiBase from "../../static/images/mehdi_main_dans_le_dos_neutre.svg"
import jauge_droite from "../../static/images/jauge_droite.svg"
import jauge_gauche from "../../static/images/jauge_gauche.svg"
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
        document.querySelector("#app").style.width = "100%";
        document.querySelector("#app").style.height = "100%";
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
            <div id="Jauge">
                <div id="jauge_gauche">
                    <p id="NomEquip1">{this.state.equipe1.toUpperCase()}<br/><p id="point1Soiree">{this.state.point1.toString()} POINTS</p></p>
                </div>    
                <div id="jauge_droite">
                    yeah
                </div>
            </div>
            <div id="Mehdi_button">
                <Button id="buttonSoireePointAttrib1">Attribuer Point Equipe {this.state.equipe1}</Button>
                <img src={mehdiBase} width="200" height="210"/>
                <Button id="buttonSoireePointAttrib2">Attribuer Point equipe {this.state.equipe2}</Button>
            </div>
            <p id="Text_Soiree">Text mehdi</p>
            <Button id="Voir_repSoiree">Afficher Réponse</Button>
            <div id="QuestionSoiree">Question</div>
        </div>
        );
    }
}