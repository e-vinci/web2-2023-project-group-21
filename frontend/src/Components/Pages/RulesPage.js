import Navigate from '../Router/Navigate';

const RulePage = () => {
    const main = document.querySelector('main');
    main.innerHTML = `<div class="container mt-5">
                            <div class="card mt-5 mx-auto text-center row">
                                <div class="card-body col-12"  id="myCard">
                                    <h1 class="card-title">Règles du jeu</h1>
                                    <p class="card-text" id="rules">Présence du texte avec les différents types, leurs avantages et inconvénients, la 
                                    présentation du jeu en lieu même (comment se passe une partie) </p>
                                </div>
                            </div>
                      </div>`;    
    const description = document.createElement('p');
    description.innerHTML = `"evoRumble" offre une expérience de duel élémentaire unique, où huit monstres élémentaires se disputent la gloire dans des affrontements en un contre un. Dans ce jeu de stratégie intense, chaque joueur compose une équipe de quatre monstres, mais seul un monstre peut être envoyé dans l'arène à la fois.`
    
    const features = document.createElement('div');
    const featuresH1 = document.createElement('h2');
    featuresH1.innerHTML = `Caractéristiques du Jeu : <br><br>`;
    
    const tacticalSelectionH2 = document.createElement('h3');
    tacticalSelectionH2.innerHTML=`Sélection Tactique :<br>`
    const tacticalSelectionText = document.createElement('p');
    tacticalSelectionText.innerHTML = `Les joueurs choisissent soigneusement leur monstre pour chaque round, en tenant compte des forces et des faiblesses élémentaires. La clé de la victoire réside dans la stratégie de sélection, car chaque monstre a son propre style de combat.<br>`
    
    const elementaryStrategyH2 = document.createElement('h3');
    elementaryStrategyH2.innerHTML =`Stratégie Élémentaire :<br>`
    const elementaryStrategyText = document.createElement('p');
    elementaryStrategyText.innerHTML ='Les affrontements sont intenses, car les éléments jouent un rôle crucial. Les joueurs doivent anticiper et réagir aux choix de leurs adversaires pour maximiser les avantages élémentaires de leur équipe.<br>'
    const elementaryStrategyDiv = document.createElement('div');
    elementaryStrategyDiv.className ='col-md-4 mx-auto';
    const elementaryStrategyTable = document.createElement('table');
    elementaryStrategyTable.className = 'table border p-0';
    elementaryStrategyTable.innerHTML =`
        <tr>
            <th class="pt-4">en attaque / en défence</th>
            <th class="p-0 rotate-90">Normal</th>
            <th class="p-0 rotate-90">Feu</th>
            <th class="p-0 rotate-90">Eau</th>
            <th class="p-0 rotate-90">Plante</th>
            <th class="p-0 rotate-90">Terre</th>
            <th class="p-0 rotate-90">Vol</th>
            <th class="p-0 rotate-90">Eletrique</th>
        </tr>
        <tr>
            <th class="p-0">Normal</th>
            <td class=" p-0">1</td>
            <td class=" p-0">1</td>
            <td class=" p-0">1</td>
            <td class=" p-0">1</td>
            <td class=" p-0">1</td>
            <td class="p-0">1</td>
            <td class="p-0">1</td>
        </tr>
        <tr>
            <th class="p-0">Feu</th>
            <td class=" p-0">1</td>
            <td class="bg-danger p-0">1/2</td>
            <td class="bg-danger p-0">1/2</td>
            <td class="bg-success p-0">2</td>
            <td class=" p-0">1</td>
            <td class="p-0">1</td>
            <td class="p-0">1</td>
        </tr>
        <tr>
            <th class="p-0">Eau</th>
            <td class=" p-0">1</td>
            <td class="bg-success p-0">2</td>
            <td class="bg-danger p-0">1/2</td>
            <td class="bg-danger p-0">1/2</td>
            <td class="bg-success p-0">2</td>
            <td class="p-0">1</td>
            <td class="p-0">1</td>
        </tr>
        <tr>
            <th class="p-0">Plante</th>
            <td class=" p-0">1</td>
            <td class="bg-danger p-0">1/2</td>
            <td class="bg-success p-0">2</td>
            <td class="bg-danger p-0">1/2</td>
            <td class="bg-success p-0">2</td>
            <td class="bg-danger p-0">1/2</td>
            <td class="p-0">1</td>
        </tr>
        <tr>
            <th class="p-0">Terre</th>
            <td class=" p-0">1</td>
            <td class="bg-success p-0">2</td>
            <td class="p-0">1</td>
            <td class="bg-danger p-0">1/2</td>
            <td class="p-0">1</td>
            <td class="bg-secondary p-0">0</td>
            <td class="bg-success p-0">2</td>
        </tr>
        <tr>
            <th class="p-0">Vol</th>
            <td class=" p-0">1</td>
            <td class="p-0">1</td>
            <td class="p-0">1</td>
            <td class="bg-success p-0">2</td>
            <td class="p-0">1</td>
            <td class="p-0">1</td>
            <td class="bg-danger p-0">1/2</td>
        </tr>
        <tr>
            <th class="p-0">Electrique</th>
            <td class=" p-0">1</td>
            <td class="p-0">1</td>
            <td class="bg-success p-0">2</td>
            <td class="bg-danger p-0">1/2</td>
            <td class="bg-secondary p-0">0</td>
            <td class="bg-success p-0">2</td>
            <td class="bg-danger p-0">1/2</td>
        </tr>
    `
    elementaryStrategyDiv.appendChild(elementaryStrategyTable);
    const uniqueMonstersH2 = document.createElement('h3');
    uniqueMonstersH2.innerHTML =`Monstres Uniques :<br>`;
    const uniqueMonstersText = document.createElement('p');
    uniqueMonstersText.innerHTML=`Chaque monstre a ses propres compétences et statistiques distinctes, mais contrairement à l'évolution, ils ne changent pas au fil du temps. La diversité des monstres permet aux joueurs de personnaliser leur équipe en fonction de leur style de jeu.<br>`
    features.appendChild(featuresH1)
    features.appendChild(tacticalSelectionH2)
    features.appendChild(tacticalSelectionText)
    features.appendChild(elementaryStrategyH2)
    features.appendChild(elementaryStrategyText)
    features.appendChild(elementaryStrategyDiv)
    features.appendChild(uniqueMonstersH2)
    features.appendChild(uniqueMonstersText)
    const rules = document.querySelector("#rules");
    rules.appendChild(description)
    rules.appendChild(features);
    const submit = document.createElement('input');
    submit.value = 'Compris !';
    submit.className = 'btn btn-secondary bg-success';
    submit.addEventListener('click', () => {
        Navigate('/');
    });
    const div = main.querySelector("#myCard");
    div.appendChild(submit);

}

export default RulePage;