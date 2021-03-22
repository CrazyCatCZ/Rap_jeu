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
        $("#logoRapjeu").addClass("logoMovemiddle");
        setTimeout(function() {
            document.querySelector("#nav").style.justifyContent = "center";
            $("#logoRapjeu").removeClass("logoMovemiddle");
        }, 900);
        setTimeout(function() {
            document.querySelector("#faceInf").style.display = "none";
            app.style.display = "block";
        }, 900);

    };

    // Boomerang
    if (window.innerWidth > 700) {
        console.log("versionnormal");
        var animDataBackground = bodymovin.loadAnimation ({
            container: document.getElementById('Boomerang'),
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: '../../static/images/blockboomerang.json',
            rendererSettings: {
                preserveAspectRatio: 'none'
            }
        })
    } else {
        console.log("versionmobile");
        var animDataBackground = bodymovin.loadAnimation ({
            container: document.getElementById('Boomerang'),
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: '../../static/images/boomerangMobile.json',
            rendererSettings: {
                preserveAspectRatio: 'none'
            }
        })
    }
});



