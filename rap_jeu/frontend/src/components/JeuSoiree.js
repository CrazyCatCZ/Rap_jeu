import React, { Component } from "react";

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
        <div>
            <p>Equipe: {this.state.equipe1}</p>
            <p>Equipe: {this.state.equipe2}</p>
            <p>point1: {this.state.point1}</p>
            <p>point2: {this.state.point2}</p>
            <p>NbQuestion: {this.state.NbQuestion}</p>
        </div>
        );
    }
}