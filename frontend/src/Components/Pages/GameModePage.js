import imgAaroonSprite from "../../img/aaronSprite.png";
import imgTraineersSprite from "../../img/traineers.png";
import Navigate from '../Router/Navigate';


const GameModePage = () => {
    renderGameModePage();

    
};

function renderGameModePage(){
    const body = document.querySelector("body");
    body.classList.add('bg-dark');

    const main = document.querySelector("main");
    main.innerHTML = `
        <h1 class="text-center text-light " >Choisis ton mode de jeu</h1>
        <div class="computer_mode">
            <a id="soloButton" href="#" class="the_link">
                <span class="span1"></span>
                <span class="span2"></span>
                <span class="span3"></span>
                <span class="span4"></span>
                Jeu contre ordinateur
            </a>
            
        </div>
        <img class="aaronTrainer" src='${imgAaroonSprite}'>
        <div class="one_mode">
            <a href="#" class="the_link">
                <span class="span1"></span>
                <span class="span2"></span>
                <span class="span3"></span>
                <span class="span4"></span>
                Jeu en ligne
            </a>
        </div>
        <img class="traineers" src='${imgTraineersSprite}'>
        
    `;
    const submit = document.querySelector('#soloButton');
    submit.addEventListener('click', () => {
      Navigate('/evoRumble');
    });
}


export default GameModePage;