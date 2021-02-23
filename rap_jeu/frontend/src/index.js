import App from "./components/App";


// animation d'entrer
document.addEventListener('DOMContentLoaded', function() {
    // hide React
    const app = document.querySelector("#app");
    app.style.display = "none";
    
    // anim lancement
    const FaceSup = document.querySelector("#faceSup");
    const faceInfimg = document.querySelector('#jouerGauche');
    FaceSup.onclick = () => {
        FaceSup.style.display = "none";
        document.querySelector("#faceInf").style.display = "block";
        document.querySelector("#QSN").style.display = "none";
        document.querySelector("#navContact").style.display = "none";
        setTimeout(function() {
            $("#logoRapjeu").addClass("logoMovemiddle");
        }, 900);
        setTimeout(function() {
            document.querySelector("#nav").style.justifyContent = "center";
            $("#logoRapjeu").removeClass("logoMovemiddle");
        }, 1900);
        setTimeout(function() {
            document.querySelector("#faceInf").style.display = "none";
            app.style.display = "block";
        }, 2100);

    };
    

});

