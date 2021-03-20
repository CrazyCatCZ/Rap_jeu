import React, { Component } from "react";
import mehdiBase from "../../static/images/mehdi_main_dans_le_dos_neutre.svg"
import mehdiCarteNeutre from "../../static/images/mehdi_carte_main_neutre.svg"
import mehdiEtonne from "../../static/images/mehdi_étonné.svg"
import mehdiRigole from "../../static/images/mehdi_rigole.svg"
import jauge_droite from "../../static/images/jauge_droite.svg"
import jauge_gauche from "../../static/images/jauge_gauche.svg"
import sablier from "../../static/images/sablier_eclaire.svg"

import question from "../../static/images/Question_mark.svg"
import play from "../../static/images/Play_button.svg"
import passer from "../../static/images/pass.svg"
import plus_droite from "../../static/images/brique_point_plusone.svg"
import plus_gauche from "../../static/images/cote_gauche_plusone.svg"
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
        this.getQuestionDetailsGameEnchere = this.getQuestionDetailsGameEnchere.bind(this);
        this.NbQuestionPasser = this.NbQuestionPasser.bind(this);
        this.getQuestionDetailsGameRolandGamos = this.getQuestionDetailsGameRolandGamos.bind(this);
    }

    CheckIntroOutro() {
        document.querySelector("#Lancer_Reprendre_Partie").style.display = "none";
        document.querySelector("#Text_Soiree").style.display = "block";
        document.querySelector("#Mehdi_button").style.display = "flex";
        document.querySelector("#MehdiImg").style.width = "40%";
        document.querySelector("#MehdiImg").style.height = "65%";
        if (this.state.point1 === 0 && this.state.point2 === 0) {
            this.Intro();
        } else if (this.state.point1 > 19 || this.state.point2 > 19) {
            document.querySelector("#Voir_repSoiree").style.display = "none";
            document.querySelector("#MehdiImg").style.width = "0%";
            document.querySelector("#MehdiImg").style.height = "0%";
            console.log("fini");
            document.querySelector("#Mehdi_button").style.display = "none";
            // anime Trophy
            var animDataTimer = bodymovin.loadAnimation ({
                container: document.getElementById('backgroundEndReel'),
                renderer: 'svg',
                loop: true,
                autoplay: true,
                path: '../../static/images/29063-trophy.json'
            })
            document.querySelector("#backgroundEndReel").style.width = "100%";
            document.querySelector("#backgroundEndReel").style.height = "70%";
            if (this.state.point1 > 19) {
                document.querySelector("#Text_Soiree").innerHTML = `L'équipe ${this.state.equipe1.toUpperCase()} remporte la partie !`
            } else {
                document.querySelector("#Text_Soiree").innerHTML = `L'équipe ${this.state.equipe2.toUpperCase()} remporte la partie !`
            }
        } else {
            document.querySelector("#MehdiImg").src = `${mehdiCarteNeutre}`;
            this.DeclencheQuestions();
        }
    }

    Intro() {
        
        document.querySelector("#Text_Soiree").innerHTML = "BIENVENU DANS RAP JEU !";
        document.querySelector("#backgroundEndReel").style.width = "0%";
        document.querySelector("#backgroundEndReel").style.height = "0%";

        setTimeout(
            function() {
                document.querySelector("#Text_Soiree").innerHTML = `AUJOURD'HUI LES ${this.state.equipe1.toUpperCase()} AFFRONTES LES ${this.state.equipe2.toUpperCase()}`;
            }
            .bind(this),
            3500
        );

        setTimeout(function() {
            document.querySelector("#MehdiImg").src = `${mehdiCarteNeutre}`;
        }, 7000);
        setTimeout(function() {
            document.querySelector("#Text_Soiree").innerHTML = "C'EST PARTI PREMIERE QUESTION !"; 
        }, 7000);

        setTimeout(
            function() {
                this.DeclencheQuestions();
            }
            .bind(this),
            9500
        );
        
    }

    componentDidMount() {
        document.querySelector("#Boomerang").style.display = "none";
        // anime background
        var animDataBackground = bodymovin.loadAnimation ({
            container: document.getElementById('backgroundJeuReel'),
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: '../../static/images/backzer.json',
            rendererSettings: {
                preserveAspectRatio: 'none'
            }
        })


        // anime Timer
        var animDataTimer = bodymovin.loadAnimation ({
            container: document.getElementById('backgroundTimerReel'),
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: '../../static/images/9690-hour-glass-egg-timer.json'
        })
    }

    DeclencheQuestions() {
        document.querySelector("#MehdiImg").src = `${mehdiCarteNeutre}`;
        if (this.state.point1 > 19 || this.state.point2 > 19) {
            document.querySelector("#MehdiImg").style.width = "0%";
            document.querySelector("#MehdiImg").style.height = "0%";
            document.querySelector("#Voir_repSoiree").style.display = "none";
            console.log("fini");
            document.querySelector("#Mehdi_button").style.display = "none";
            // anime Trophy
            var animDataTimer = bodymovin.loadAnimation ({
                container: document.getElementById('backgroundEndReel'),
                renderer: 'svg',
                loop: true,
                autoplay: true,
                path: '../../static/images/29063-trophy.json'
            })
            document.querySelector("#backgroundEndReel").style.width = "100%";
            document.querySelector("#backgroundEndReel").style.height = "70%";
            if (this.state.point1 > 2) {
                document.querySelector("#Text_Soiree").innerHTML = `L'équipe ${this.state.equipe1.toUpperCase()} remporte la partie !`
            } else {
                document.querySelector("#Text_Soiree").innerHTML = `L'équipe ${this.state.equipe2.toUpperCase()} remporte la partie !`
            }
            return console.log('terminado');
        }


        if (this.state.NbQuestion === 5) {
            console.log("carte mystère");
            document.querySelector("#cartemystereblock").style.display = "block";
            document.querySelector("#cartepuristeblock").style.display = "block";
            document.querySelector("#TextJaugeQuestionSoiree").innerHTML = "";
            document.querySelector("#Text_Soiree").innerHTML = `Carte Mystères pour l'équipe ${this.state.equipe1} choisissez entre la carte puriste ou mystère`;
            
        } else if (this.state.NbQuestion === 9) {
            console.log("carte mystère");
            document.querySelector("#cartemystereblock").style.display = "block";
            document.querySelector("#cartepuristeblock").style.display = "block";
            document.querySelector("#TextJaugeQuestionSoiree").innerHTML = "";
            document.querySelector("#Text_Soiree").innerHTML = `Carte Mystères pour l'équipe ${this.state.equipe2} choisissez entre la carte puriste ou mystère`;

        } else if (this.state.NbQuestion === 19) {
            console.log("carte mystère");
            document.querySelector("#cartemystereblock").style.display = "block";
            document.querySelector("#cartepuristeblock").style.display = "block";
            document.querySelector("#TextJaugeQuestionSoiree").innerHTML = "";
            document.querySelector("#Text_Soiree").innerHTML = `Carte Mystères pour l'équipe ${this.state.equipe1} choisissez entre la carte puriste ou mystère`;
        } else if (this.state.NbQuestion === 15) {
            console.log("carte mystère");
            document.querySelector("#cartemystereblock").style.display = "block";
            document.querySelector("#cartepuristeblock").style.display = "block";
            document.querySelector("#TextJaugeQuestionSoiree").innerHTML = "";
            document.querySelector("#Text_Soiree").innerHTML = `Carte Mystères pour l'équipe ${this.state.equipe2} choisissez entre la carte puriste ou mystère`;
        } else if (this.state.QuestionType === 55) {
            console.log('enchere');
            $("#Text_Soiree").addClass("tracking-in-expand");
            $("#TextJaugeQuestionSoiree").addClass("swing-in-top-fwd");
            document.querySelector("#TextJaugeQuestionSoiree").innerHTML = `${this.state.question}`;
            document.querySelector("#Text_Soiree").innerHTML = `${this.state.explication}`;
            // aficher timer et pas affiche repsoiree
            document.querySelector("#Timer").style.display = "flex";
            setTimeout(function() {
                $("#Text_Soiree").removeClass("tracking-in-expand");
                $("#TextJaugeQuestionSoiree").removeClass("swing-in-top-fwd");
            }, 2000); 
        } else if (this.state.NbQuestion === 10 || this.state.NbQuestion === 20) {
            this.getQuestionDetailsGameEnchere();
        } else if(this.state.QuestionType === 22) {
            $("#Text_Soiree").addClass("tracking-in-expand");
            $("#TextJaugeQuestionSoiree").addClass("swing-in-top-fwd");
            document.querySelector("#TextJaugeQuestionSoiree").innerHTML = `${this.state.question}`;
            document.querySelector("#Text_Soiree").innerHTML = `${this.state.explication}`;
            document.querySelector("#Voir_repSoiree").style.display = "flex";
            setTimeout(function() {
                $("#Text_Soiree").removeClass("tracking-in-expand");
                $("#TextJaugeQuestionSoiree").removeClass("swing-in-top-fwd");
            }, 2000); 
        } else if(this.state.NbQuestion === 12 || this.state.NbQuestion === 25) {
            this.getQuestionDetailsGameRolandGamos();
        } else {
            $("#Text_Soiree").addClass("tracking-in-expand");
            $("#TextJaugeQuestionSoiree").addClass("swing-in-top-fwd");
            document.querySelector("#TextJaugeQuestionSoiree").innerHTML = `${this.state.question}`;
            document.querySelector("#Text_Soiree").innerHTML = `${this.state.explication}`;
            document.querySelector("#Voir_repSoiree").style.display = "flex";
            setTimeout(function() {
                $("#Text_Soiree").removeClass("tracking-in-expand");
                $("#TextJaugeQuestionSoiree").removeClass("swing-in-top-fwd");
            }, 2000); 
        }
    }

    DeclencheQuestionVersionMystere() {
        if (this.state.choix1 === 'plus') {
            document.querySelector("#MehdiImg").src = `${mehdiEtonne}`;
            document.querySelector("#TextJaugeQuestionSoiree").innerHTML = "+4 points";
        } else {
            document.querySelector("#MehdiImg").src = `${mehdiRigole}`;
            document.querySelector("#TextJaugeQuestionSoiree").innerHTML = "-4 points";
        }

        $("#Text_Soiree").addClass("tracking-in-expand");
            $("#TextJaugeQuestionSoiree").addClass("swing-in-top-fwd");
            document.querySelector("#Text_Soiree").innerHTML = `${this.state.question}`;
            document.querySelector("#Next_Question").style.display = "flex";
            setTimeout(function() {
                $("#Text_Soiree").removeClass("tracking-in-expand");
                $("#TextJaugeQuestionSoiree").removeClass("swing-in-top-fwd");
            }, 2000); 
    }


    NextMystereQuestion() {
        if (this.state.NbQuestion === 5 || this.state.NbQuestion === 15) {
            if (this.state.choix1 === 'plus') {
                this.Point1ChangeMystere();
            } else {
                this.Point1ChangeMystereMoins();
            }
        } else {
            if (this.state.choix1 === 'plus') {
                console.log('fonctionne mais bug');
                this.Point2ChangeMystere();
            } else {
                console.log('fonctionne mais bug');
                this.Point2ChangeMystereMoins();
            }
        }
    }

    DeclencheQuestionVersionPuriste() {
        $("#Text_Soiree").addClass("tracking-in-expand");
            $("#TextJaugeQuestionSoiree").addClass("swing-in-top-fwd");
            document.querySelector("#TextJaugeQuestionSoiree").innerHTML = `${this.state.question}`;
            document.querySelector("#Text_Soiree").innerHTML = `${this.state.explication}`;
            document.querySelector("#Voir_repSoiree").style.display = "flex";
            setTimeout(function() {
                $("#Text_Soiree").removeClass("tracking-in-expand");
                $("#TextJaugeQuestionSoiree").removeClass("swing-in-top-fwd");
            }, 2000); 
    }

    DeclencheVoirRep() {
        document.querySelector("#MehdiImg").src = `${mehdiBase}`;
        document.querySelector("#Passer_Question").style.display = "flex";
        $("#TextJaugeQuestionSoiree").addClass("swing-in-top-fwd");
        document.querySelector("#Voir_repSoiree").style.display = "none"; 
        document.querySelector("#buttonSoireePointAttrib1").style.display = "flex"; 
        document.querySelector("#buttonSoireePointAttrib2").style.display = "flex"; 
        document.querySelector("#TextJaugeQuestionSoiree").innerHTML = `${this.state.réponse}`;
        setTimeout(function() {
            $("#TextJaugeQuestionSoiree").removeClass("swing-in-top-fwd");
        }, 2000);
    }

    DeclencheTimer() {
        $("#TextJaugeQuestionSoiree").addClass("swing-in-top-fwd");
        document.querySelector("#buttonSoireePointAttrib1").style.display = "flex"; 
        document.querySelector("#buttonSoireePointAttrib2").style.display = "flex"; 
        document.querySelector("#TextJaugeQuestionSoiree").innerHTML = `${this.state.question}`;
        setTimeout(function() {
            $("#TextJaugeQuestionSoiree").removeClass("swing-in-top-fwd");
        }, 2000);

        document.querySelector("#Timer").style.display = "none";
        document.querySelector("#p_timer").style.display = "flex";
        
        // Timer func
        const startingMinutes = 1;
        let time = startingMinutes * 60;

        var StopTimer = setInterval(function() {
            const minutes = Math.floor(time / 60);
            let seconds = time % 60;

            console.log("ca part pas");
            document.querySelector("#p_timer").style.display = "flex";
            document.querySelector('#backgroundTimerReel').style.width = "50px"
            document.querySelector('#backgroundTimerReel').style.height = "50px"
           

            if (seconds > 0) {
                document.querySelector("#PTimer_text").innerHTML = `${seconds}`;
            }

            if (seconds < 0) {
                document.querySelector("#Text_Soiree").innerHTML = "Temps écoulé !";
            }
            

            if (seconds === -2 || document.querySelector("#Voir_repSoiree").style.display === "flex" || document.querySelector("#buttonSoireePointAttrib1").style.display === "none") {
                //hide timer
                console.log("ca cahceh come u ne eutberere");
                document.querySelector("#p_timer").style.display = "none";
                document.querySelector('#backgroundTimerReel').style.width = "0px"
                document.querySelector('#backgroundTimerReel').style.height = "0px"
                clearInterval(StopTimer);
            }
            time--;
          }, 1000);

    }

    Point1Change() {

        this.setState({
          point1: this.state.point1 + 1,
          NbQuestion: this.state.NbQuestion + 1,
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
        NbQuestion: this.state.NbQuestion + 1,
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
          NbQuestion: this.state.NbQuestion + 1,
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
          NbQuestion: this.state.NbQuestion + 1,
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
          NbQuestion: this.state.NbQuestion + 1,
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
          NbQuestion: this.state.NbQuestion + 1,
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

    NbQuestionPasser() {
        this.setState({
          NbQuestion: this.state.NbQuestion + 1,
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
                nbQuestion: this.state.NbQuestion,
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
        document.querySelector("#buttonSoireePointAttrib1").style.display = "none"; 
        document.querySelector("#buttonSoireePointAttrib2").style.display = "none";
        document.querySelector("#Next_Question").style.display = "none";
        document.querySelector("#Passer_Question").style.display = "none";
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

    getQuestionDetailsGameEnchere() {
        document.querySelector("#cartepuristeblock").style.display = "none";
        document.querySelector("#cartemystereblock").style.display = "none";
        fetch('/api/get-enchere').then((response) => 
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

    getQuestionDetailsGameRolandGamos() {
        document.querySelector("#cartepuristeblock").style.display = "none";
        document.querySelector("#cartemystereblock").style.display = "none";
        fetch('/api/get-roland').then((response) => 
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
            <div id="backgroundJeuReel"></div>
            <div id="rebull"></div>
            <div id="backgroundEndReel"></div>
            <img id="MehdiImg" src={mehdiCarteNeutre}/>
            <div id="Jauge">
                <div id="jauge_gauche" preserveAspectRatio="none">
                    <p id="NomEquip1">{this.state.equipe1.toUpperCase()}<br/><p id="point1Soiree">{this.state.point1.toString()} POINTS</p></p>
                </div>    
                <div id="jauge_droite" preserveAspectRatio="none">
                    <p id="NomEquip2">{this.state.equipe2.toUpperCase()}<br/><p id="point2Soiree">{this.state.point2.toString()} POINTS</p></p>
                </div>
            </div>
            <Button id="Lancer_Reprendre_Partie" onClick={this.CheckIntroOutro}><img src={play} id="playbutton" /></Button>
            <div id="Mehdi_button">
                <div id="cartepuristeblock" onClick={this.getQuestionDetailsGameVPuriste}><div id="CartePuriste">Carte Puriste</div></div>
                <Button id="buttonSoireePointAttrib1" onClick={this.Point1Change}><img id="plus_ungauche" src={plus_gauche}></img><p id="text_lancerTimer">Equipe {this.state.equipe1}</p></Button>
                <div id="BlockSepareMehdiImg"></div>
                <Button id="buttonSoireePointAttrib2" onClick={this.Point2Change}><p id="text_lancerTimer">Equipe {this.state.equipe2}</p><img id="plus_undroite" src={plus_droite}></img></Button>
                <div id="cartemystereblock" onClick={this.getQuestionDetailsGameVMystere}><div id="CarteMystère">Carte Mystère</div></div>
            </div>
            <p id="Text_Soiree"></p>
            <Button id="Voir_repSoiree" onClick={this.DeclencheVoirRep}><img id="Sablier" src={question}></img><p id="text_lancerTimer">Afficher Réponse</p></Button>
            <Button id="Next_Question" onClick={this.NextMystereQuestion}><img id="Sablier" src={passer}></img><p id="text_lancerTimer">Question Suivante</p></Button>
            <Button id="Passer_Question" onClick={this.NbQuestionPasser}><img id="Sablier" src={passer}></img><p id="text_lancerTimer">Passer Question</p></Button>
            <div id="Timer" onClick={this.DeclencheTimer}><img id="Sablier" src={sablier}></img><p id="text_lancerTimer">Lancer Timer</p></div>
            <div id="p_timer"><p id="PTimer_text"></p><div id="backgroundTimerReel"></div></div>
            <div id="QuestionSoiree"><p id="TextJaugeQuestionSoiree"></p></div>
        </div>
        );
    }
}