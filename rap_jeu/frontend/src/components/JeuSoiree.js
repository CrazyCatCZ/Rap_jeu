import React, { Component } from "react";
import mehdiBase from "../../static/images/mehdi_main_dans_le_dos_neutre.svg"
import mehdiCarteNeutre from "../../static/images/mehdi_carte_main_neutre.svg"
import jauge_droite from "../../static/images/jauge_droite.svg"
import jauge_gauche from "../../static/images/jauge_gauche.svg"
import Button from "@material-ui/core/Button";

export default class JeuSoiree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // ROOM
            equipe1: "",
            equipe2: "",
            point1: 0,
            point2: 0,
            NbQuestion: 0,
            // QUESTIONS
            question: "",
            réponse: "",
            QuestionType: 0,
            explication: "",
            choix1: "",
            choix2: "",
            choix3: "",
            choix4: "",
            musique: "",
        };
        this.roomCode = this.props.match.params.roomCode;
        this.getRoomDetails();
        this.getQuestionDetails(); 
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

        // intro
        this.CheckIntroOutro = this.CheckIntroOutro.bind(this);
        this.Intro = this.Intro.bind(this);
        //Question
        this.DeclencheQuestions = this.DeclencheQuestions.bind(this);
        this.getQuestionDetails = this.getQuestionDetails.bind(this);
        this.DeclencheVoirRep = this.DeclencheVoirRep.bind(this);
        this.Point1Change = this.Point1Change.bind(this);
        this.Point2Change = this.Point2Change.bind(this);
        this.DeclencheAttribPoint = this.DeclencheAttribPoint.bind(this);
        this.DeclencheTimer = this.DeclencheTimer.bind(this);
        this.getQuestionDetailsGameVMystere = this.getQuestionDetailsGameVMystere.bind(this);
        this.getQuestionDetailsGameVPuriste = this.getQuestionDetailsGameVPuriste.bind(this);
        this.DeclencheQuestionVersionMystere = this.DeclencheQuestionVersionMystere.bind(this);
        this.DeclencheQuestionVersionPuriste = this.DeclencheQuestionVersionPuriste.bind(this);
        this.getQuestionDetailsGame = this.getQuestionDetailsGame.bind(this);
        this.Point1ChangeMystere = this.Point1ChangeMystere.bind(this);
        this.Point2ChangeMystere = this.Point2ChangeMystere.bind(this);
        this.Point1ChangeMystereMoins = this.Point1ChangeMystereMoins.bind(this);
        this.Point2ChangeMystereMoins = this.Point1ChangeMystereMoins.bind(this);
        this.NextMystereQuestion = this.NextMystereQuestion.bind(this);
        
    }

    CheckIntroOutro() {
        document.querySelector("#Lancer_Reprendre_Partie").style.display = "none";
        document.querySelector("#Mehdi_button").style.display = "flex";
        if (this.state.point1 === 0 && this.state.point2 === 0) {
            this.Intro();
        } else if (this.state.point1 === 20 || this.state.point2 === 20) {
            // a corriger 
            console.log("fini");
        } else {
            document.querySelector("#MehdiImg").src = `${mehdiCarteNeutre}`;
            this.DeclencheQuestions();
        }
    }

    Intro() {
        
        document.querySelector("#Text_Soiree").innerHTML = "BIENVENU DANS RAP JEU !";

        setTimeout(function() {
            document.querySelector("#Text_Soiree").innerHTML = "LE MEILLEUR JEU DE RAP AU MONDE JUSQU'A PREUVE DU CONTRAIRE"; 
        }, 3500);

        setTimeout(
            function() {
                document.querySelector("#Text_Soiree").innerHTML = `AJOURD'HUI LES ${this.state.equipe1.toUpperCase()} AFFRONTES LES ${this.state.equipe2.toUpperCase()}`;
            }
            .bind(this),
            7000
        );

        setTimeout(function() {
            document.querySelector("#MehdiImg").src = `${mehdiCarteNeutre}`;
        }, 11000);
        setTimeout(function() {
            document.querySelector("#Text_Soiree").innerHTML = "C'EST PARTIE PREMIERE QUESTIONS !"; 
        }, 11000);

        setTimeout(
            function() {
                this.DeclencheQuestions();
            }
            .bind(this),
            14000
        );
        
    }

    DeclencheQuestions() {
        if (this.state.QuestionType === 5 && this.state.point1 !== 8 && this.state.point2 !== 9) {
            console.log('enchere');
            $("#Text_Soiree").addClass("tracking-in-expand");
            $("#TextJaugeQuestionSoiree").addClass("swing-in-top-fwd");
            document.querySelector("#TextJaugeQuestionSoiree").innerHTML = `${this.state.question}`;
            document.querySelector("#Text_Soiree").innerHTML = `${this.state.explication}`;
            // aficher timer et pas affiche repsoiree
            document.querySelector("#Timer").style.display = "block";
            document.querySelector("#Timer").innerHTML = "Lancer Timer";
            setTimeout(function() {
                $("#Text_Soiree").removeClass("tracking-in-expand");
                $("#TextJaugeQuestionSoiree").removeClass("swing-in-top-fwd");
            }, 2000); 
        } else if (this.state.point1 === 8) {
            console.log("carte mystère");
            document.querySelector("#cartemystereblock").style.display = "block";
            document.querySelector("#cartepuristeblock").style.display = "block";
            document.querySelector("#Text_Soiree").innerHTML = `Carte Mystères pour l'équipe ${this.state.equipe1} choisissez entre la carte puriste ou mystère`;
            
        } else if (this.state.point2 === 9) {
            console.log("carte mystère");
            document.querySelector("#cartemystereblock").style.display = "block";
            document.querySelector("#cartepuristeblock").style.display = "block";
            document.querySelector("#Text_Soiree").innerHTML = `Carte Mystères pour l'équipe ${this.state.equipe2} choisissez entre la carte puriste ou mystère`;

        } else {
            $("#Text_Soiree").addClass("tracking-in-expand");
            $("#TextJaugeQuestionSoiree").addClass("swing-in-top-fwd");
            document.querySelector("#TextJaugeQuestionSoiree").innerHTML = `${this.state.question}`;
            document.querySelector("#Text_Soiree").innerHTML = `${this.state.explication}`;
            document.querySelector("#Voir_repSoiree").style.display = "block";
            setTimeout(function() {
                $("#Text_Soiree").removeClass("tracking-in-expand");
                $("#TextJaugeQuestionSoiree").removeClass("swing-in-top-fwd");
            }, 2000); 
        }
    }

    DeclencheQuestionVersionMystere() {
        $("#Text_Soiree").addClass("tracking-in-expand");
            $("#TextJaugeQuestionSoiree").addClass("swing-in-top-fwd");
            document.querySelector("#TextJaugeQuestionSoiree").innerHTML = `${this.state.question}`;
            document.querySelector("#Text_Soiree").innerHTML = `${this.state.explication}`;
            document.querySelector("#Next_Question").style.display = "block";
            setTimeout(function() {
                $("#Text_Soiree").removeClass("tracking-in-expand");
                $("#TextJaugeQuestionSoiree").removeClass("swing-in-top-fwd");
            }, 2000); 
    }


    NextMystereQuestion() {
        if (this.state.point1 === 8 && this.state.point2 !== 9) {
            if (this.state.choix1 === 'plus') {
                this.Point1ChangeMystere();
            } else {
                this.Point1ChangeMystereMoins();
            }
        } else {
            if (this.state.choix1 === 'plus') {
                this.Point2ChangeMystere();
            } else {
                this.Point2ChangeMystereMoins();
            }
        }
    }

    DeclencheQuestionVersionPuriste() {
        $("#Text_Soiree").addClass("tracking-in-expand");
            $("#TextJaugeQuestionSoiree").addClass("swing-in-top-fwd");
            document.querySelector("#TextJaugeQuestionSoiree").innerHTML = `${this.state.question}`;
            document.querySelector("#Text_Soiree").innerHTML = `${this.state.explication}`;
            document.querySelector("#Voir_repSoiree").style.display = "block";
            setTimeout(function() {
                $("#Text_Soiree").removeClass("tracking-in-expand");
                $("#TextJaugeQuestionSoiree").removeClass("swing-in-top-fwd");
            }, 2000); 
    }

    DeclencheVoirRep() {
        $("#TextJaugeQuestionSoiree").addClass("swing-in-top-fwd");
        document.querySelector("#Voir_repSoiree").style.display = "none"; 
        document.querySelector("#buttonSoireePointAttrib1").style.display = "block"; 
        document.querySelector("#buttonSoireePointAttrib2").style.display = "block"; 
        document.querySelector("#TextJaugeQuestionSoiree").innerHTML = `${this.state.réponse}`;
        setTimeout(function() {
            $("#TextJaugeQuestionSoiree").removeClass("swing-in-top-fwd");
        }, 2000);
    }

    DeclencheTimer() {
        $("#TextJaugeQuestionSoiree").addClass("swing-in-top-fwd");
        document.querySelector("#buttonSoireePointAttrib1").style.display = "block"; 
        document.querySelector("#buttonSoireePointAttrib2").style.display = "block"; 
        document.querySelector("#TextJaugeQuestionSoiree").innerHTML = `${this.state.question}`;
        setTimeout(function() {
            $("#TextJaugeQuestionSoiree").removeClass("swing-in-top-fwd");
        }, 2000);

        document.querySelector("#Timer").style.display = "none";
        document.querySelector("#p_timer").style.display = "block";
        
        // Timer func
        const startingMinutes = 1;
        let time = startingMinutes * 60;

        var StopTimer = setInterval(function() {
            const minutes = Math.floor(time / 60);
            let seconds = time % 60;

            if (document.querySelector("#Voir_repSoiree").style.display === "none") {
                //hide timer
                if (seconds > 0) {
                    document.querySelector("#PTimer_text").innerHTML = `${seconds}`;
                } else if (seconds < 0) {
                    document.querySelector("#Text_Soiree").innerHTML = "Temps écoulé !";
                } else if (seconds === 0) {
                    document.querySelector("#PTimer_text").innerHTML = "";
                }

            }

            if (seconds === -2 || document.querySelector("#Voir_repSoiree").style.display === "block" || document.querySelector("#buttonSoireePointAttrib1").style.display === "none") {
                //hide timer
                document.querySelector("#p_timer").style.display = "none";
                clearInterval(StopTimer);
            }
            time--;
          }, 1000);

    }

    Point1Change() {
        this.setState({
          point1: this.state.point1 + 1,
        });
        document.querySelector("#buttonSoireePointAttrib1").style.display = "none"; 
        document.querySelector("#buttonSoireePointAttrib2").style.display = "none";
        
        setTimeout(
            function() {
                this.DeclencheAttribPoint()
            }
            .bind(this),
            1000
        );

    }
    
    Point2Change() {
    this.setState({
        point2: this.state.point2 + 1,
    });
    document.querySelector("#buttonSoireePointAttrib1").style.display = "none"; 
    document.querySelector("#buttonSoireePointAttrib2").style.display = "none";

    setTimeout(
        function() {
            this.DeclencheAttribPoint()
        }
        .bind(this),
        1000
    );

    }


    Point1ChangeMystere() {
        this.setState({
          point1: this.state.point1 + 4,
        });
        document.querySelector("#buttonSoireePointAttrib1").style.display = "none"; 
        document.querySelector("#buttonSoireePointAttrib2").style.display = "none";
        
        setTimeout(
            function() {
                this.DeclencheAttribPoint()
            }
            .bind(this),
            1000
        );

    }

    Point2ChangeMystere() {
        this.setState({
          point2: this.state.point2 + 4,
        });
        document.querySelector("#buttonSoireePointAttrib1").style.display = "none"; 
        document.querySelector("#buttonSoireePointAttrib2").style.display = "none";
        
        setTimeout(
            function() {
                this.DeclencheAttribPoint()
            }
            .bind(this),
            1000
        );

    }


    Point1ChangeMystereMoins() {
        this.setState({
          point1: this.state.point1 - 4,
        });
        document.querySelector("#buttonSoireePointAttrib1").style.display = "none"; 
        document.querySelector("#buttonSoireePointAttrib2").style.display = "none";
        
        setTimeout(
            function() {
                this.DeclencheAttribPoint()
            }
            .bind(this),
            1000
        );

    }

    Point2ChangeMystereMoins() {
        this.setState({
          point2: this.state.point2 - 4,
        });
        document.querySelector("#buttonSoireePointAttrib1").style.display = "none"; 
        document.querySelector("#buttonSoireePointAttrib2").style.display = "none";
        
        setTimeout(
            function() {
                this.DeclencheAttribPoint()
            }
            .bind(this),
            1000
        );

    }


    DeclencheAttribPoint() {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                pointA: this.state.point1,
                pointB: this.state.point2,
            }),
          };
          fetch("/api/post-point", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    equipe1: data.equipeA,
                    equipe2: data.equipeB,
                    point1: data.pointA,
                    point2: data.pointB,
                    NbQuestion: data.nbQuestion,
                })
            });
            console.log("hererrere");
            this.getQuestionDetailsGame();
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

    getQuestionDetailsGame() {
        document.querySelector("#Next_Question").style.display = "none"; 
        fetch('/api/get-question').then((response) => 
        response.json()
        ).then((data) => {
            this.setState({
                question: data.question,
                réponse: data.réponse,
                QuestionType: data.QuestionType,
                explication: data.explication,
                choix1: data.choix1,
                choix2: data.choix2,
                choix3: data.choix3,
                choix4: data.choix4,
                musique: data.musique,
            }, () => {
                console.log(data.réponse);
                this.DeclencheQuestions();
            });
        });
    }

    getQuestionDetailsGameVMystere() {
        document.querySelector("#cartepuristeblock").style.display = "none";
        document.querySelector("#cartemystereblock").style.display = "none";
        fetch('/api/get-mystere').then((response) => 
        response.json()
        ).then((data) => {
            this.setState({
                question: data.question,
                réponse: data.réponse,
                QuestionType: data.QuestionType,
                explication: data.explication,
                choix1: data.choix1,
                choix2: data.choix2,
                choix3: data.choix3,
                choix4: data.choix4,
                musique: data.musique,
            }, () => {
                console.log(data.réponse);
                this.DeclencheQuestionVersionMystere();
            });
        });
    }

    getQuestionDetailsGameVPuriste() {
        document.querySelector("#cartepuristeblock").style.display = "none";
        document.querySelector("#cartemystereblock").style.display = "none";
        fetch('/api/get-puriste').then((response) => 
        response.json()
        ).then((data) => {
            this.setState({
                question: data.question,
                réponse: data.réponse,
                QuestionType: data.QuestionType,
                explication: data.explication,
                choix1: data.choix1,
                choix2: data.choix2,
                choix3: data.choix3,
                choix4: data.choix4,
                musique: data.musique,
            }, () => {
                console.log(data.réponse);
                this.DeclencheQuestionVersionPuriste();
            });
        });
    }

    getQuestionDetails() {
        fetch('/api/get-question').then((response) => 
        response.json()
        ).then((data) => {
            this.setState({
                question: data.question,
                réponse: data.réponse,
                QuestionType: data.QuestionType,
                explication: data.explication,
                choix1: data.choix1,
                choix2: data.choix2,
                choix3: data.choix3,
                choix4: data.choix4,
                musique: data.musique,
            })
        });
        
    }

    render() {
        return (
        <div id="JeuSoireeDivParent" class="puff-in-center">
            <div id="Jauge">
                <div id="jauge_gauche">
                    <p id="NomEquip1">{this.state.equipe1.toUpperCase()}<br/><p id="point1Soiree">{this.state.point1.toString()} POINTS</p></p>
                </div>    
                <div id="jauge_droite">
                    <p id="NomEquip2">{this.state.equipe2.toUpperCase()}<br/><p id="point2Soiree">{this.state.point2.toString()} POINTS</p></p>
                </div>
            </div>
            <Button id="Lancer_Reprendre_Partie" onClick={this.CheckIntroOutro}>Lancer/Reprendre Partie</Button>
            <div id="Mehdi_button">
                <div id="cartepuristeblock" onClick={this.getQuestionDetailsGameVPuriste}><div id="CartePuriste">Carte Puriste</div></div>
                <Button id="buttonSoireePointAttrib1" onClick={this.Point1Change}>+ 1 Equipe {this.state.equipe1}</Button>
                <img id="MehdiImg" src={mehdiBase} width="250" height="300"/>
                <Button id="buttonSoireePointAttrib2" onClick={this.Point2Change}>+ 1 Equipe {this.state.equipe2}</Button>
                <div id="cartemystereblock" onClick={this.getQuestionDetailsGameVMystere}><div id="CarteMystère">Carte Mystère</div></div>
            </div>
            <p id="Text_Soiree"></p>
            <Button id="Voir_repSoiree" onClick={this.DeclencheVoirRep}>Afficher Réponse</Button>
            <Button id="Next_Question" onClick={this.NextMystereQuestion}>Question Suivante</Button>
            <Button id="Timer" onClick={this.DeclencheTimer}>Lancer Timer</Button>
            <div id="p_timer"><p id="PTimer_text"></p></div>
            <div id="QuestionSoiree"><p id="TextJaugeQuestionSoiree"></p></div>
        </div>
        );
    }
}