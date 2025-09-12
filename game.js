
let currentPlayerCardStats = null;
let currentComputerCardStats = null;

const allCards = {
   monsters:  [
    { name: "stygimoloch", hp: 5, attack: 3, points: 3 },
    { name: "triceratops", hp: 8, attack: 4, points: 5 },
    { name: "velociraptor", hp: 3, attack:2, points: 2 },
    { name: "tyrannosaurus rex", hp: 10, attack: 5, points: 8 },
    { name: "pteranodon", hp: 4, attack: 2, points: 3 },
    { name: "spinosaurus", hp: 9, attack: 4, points: 7 },
    { name: "ankylosaurus", hp: 10, attack: 3, points: 6 },
    { name: "dilophosaurus", hp: 6, attack: 3, points: 4 },
    { name: "baryonyx", hp: 8, attack: 4, points: 5 },
    { name: "carnotaurus", hp: 7, attack: 4, points: 5 },
    { name: "allosaurus", hp: 8, attack: 4, points: 6 },
    { name: "giganotosaurus", hp: 12, attack: 5, points: 9 },
    { name: "protocerato", hp: 5, attack: 3, points: 4 },
    { name: "dreadnoughtus", hp: 15, attack: 7, points: 11 },
    { name: "tupandactylus", hp: 4, attack: 2, points: 3 },
    { name: "monolophosaurus", hp: 6, attack: 3, points: 4 },
   ],
   supportitems: [
    { name: "Health potion", effect: "heal", value: 2 },
   ]
};
// ------------------------------
monscount = 0;
enemyMonsters = ["computer-card-0", "computer-card-1", "computer-card-2", "computer-card-3"];
rand = enemyMonsters[~~(Math.random() * enemyMonsters.length)];
const testbutton = document.getElementById("testbutton");
const playerHandDiv = document.getElementById("player-hand");
const computerHandDiv = document.getElementById("computer-hand");
const drawButton = document.getElementById("draw-button");
const playerPointsElem = document.getElementById("player-points");
const computerPointsElem = document.getElementById("computer-points");
testbutton.disabled = true;
let playerPoints = 0;
let computerPoints = 0;
let i = 0;
chosen = null;





let deck = [...allCards.monsters];

function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

function drawMonsters(deck, count) {
    return deck.splice(0, count);
}

function renderHand(handDiv, monsters) {
    handDiv.innerHTML += monsters.map(monster => `
        <div class="cards">
            <h3>${monster.name}</h3>
            <p class="hp">HP: ${monster.hp}</p>
            <p class="atk">Attack: ${monster.attack}</p>
            <p class="points">Points: ${monster.points}</p>
        </div>
    `).join("");
}

function handlePlayerCardClick() {
    const cardDivs = playerHandDiv.getElementsByClassName("cards");
    for (let o = 0; o < cardDivs.length; o++) {
        cardDivs[o].style.border = "";
        cardDivs[o].id = "";
    }
    this.style.border = "2px solid blue";
    this.setAttribute("id", "selected-card");
}

function activeCard(handDiv) {
    const cards = handDiv.getElementsByClassName("cards");
    for (let c = 0; c < cards.length; c++) {
        // 2. Add the named function as the listener
        cards[c].addEventListener("click", handlePlayerCardClick);
    }
}
const lockInButton = document.getElementById("lock-in")
function removePlayerCardListeners() {
    const cards = playerHandDiv.getElementsByClassName("cards");
    for (let c = 0; c < cards.length; c++) {
        // Remove the named function as the listener
        cards[c].removeEventListener("click", handlePlayerCardClick);
    }
}
lockInButton.addEventListener("click", lockIn)
round = 0;
function lockIn() {
    const hp = document.querySelector("#selected-card .hp").textContent;
    const atk = document.querySelector("#selected-card .atk").textContent;
    const points = document.querySelector("#selected-card .points").textContent;
    const playerHp = parseInt(hp.replace(/\D/g, ''), 10);
    const playerAtk = parseInt(atk.replace(/\D/g, ''), 10);
    const playerPoints = parseInt(points.replace(/\D/g, ''), 10);


    console.log(playerHp);
    console.log(playerAtk);
    console.log(playerPoints);

    removePlayerCardListeners();

    currentPlayerCardStats = { playerHp, playerAtk, playerPoints };
    
    console.log("started attack");
    lockInButton.disabled = true;

}
resultEnemyHp = null;
resultPlayerHp = null;

testbutton.addEventListener("click", startAttack);

function startAttack() {
    if (currentPlayerCardStats == null){
        return console.log("no active selected");
    }
    else document.getElementById("selected-card").style.scale= "1.2";
    resultEnemyHp = currentComputerCardStats.hpNum - currentPlayerCardStats.playerAtk;
    resultPlayerHp = currentPlayerCardStats.playerHp - currentComputerCardStats.atkNum;
    console.log("remaining enemy hp " + resultEnemyHp);
    currentComputerCardStats.hpNum = resultEnemyHp;
    currentPlayerCardStats.playerHp = resultPlayerHp;
    testbutton.disabled= true;
    setTimeout(() => {
        document.getElementById(rand).style.scale = "1.4";
        document.querySelector("#" + rand +  " .hp").innerHTML = "HP: " + resultEnemyHp;
        document.querySelector("#selected-card .hp").innerHTML = "HP: " + resultPlayerHp;
        setTimeout(() => {
           
            if (resultEnemyHp <= 0) {
            playerPoints = playerPoints + currentComputerCardStats.pointsNum;
            playerPointsElem.innerHTML = playerPoints;
            console.log("added " + currentComputerCardStats.pointsNum + " to playerpoints")
                     testbutton.disabled= true;
                     document.getElementById(rand).remove();
                     const indexToRemove = enemyMonsters.indexOf(rand);
                    monscount = monscount - 1;
                    console.log(monscount + " count")
                setTimeout(() => {
                    if (monscount == 0) {
                    enemyMonsters = ["computer-card-0", "computer-card-1", "computer-card-2", "computer-card-3"];
                    rand = enemyMonsters[~~(Math.random() * enemyMonsters.length)];

                        computerCardsGenerated();
                    }
                }, 2000);

                if (indexToRemove > -1) {
                    enemyMonsters.splice(indexToRemove, 1);
                }   
                    setTimeout(() => {
                        rand = enemyMonsters[~~(Math.random() * enemyMonsters.length)];
                        compActiveCard(); 
                    }, 1000);

        }   
        else if (resultPlayerHp <=0) {
            computerPoints = computerPoints + currentPlayerCardStats.playerPoints;
            computerPointsElem.innerHTML = computerPoints;
                     testbutton.disabled= false; 
        }
        else {
                    testbutton.disabled= false;
}                    
             console.log("next round");
        }, 1000);
    }, 1000);
    
}


let x = 0;
function checkX() {
    if (x === 0) drawButton.disabled = true;
    else return;
}
function drawPlayerCards() {
    if (deck.length < 2) return;
    const playerMonsters = drawMonsters(deck, 4);
    renderHand(playerHandDiv, playerMonsters);
    activeCard(playerHandDiv);
    checkX();
}

function computerCardsGenerated() {
    setTimeout(() => { 
        if (deck.length < 2) return;
        shuffleDeck(deck);        
        const computerMonsters = drawMonsters(deck, 4);
        renderHand(computerHandDiv, computerMonsters);

        const computerCards = computerHandDiv.getElementsByClassName("cards");
        for (let i = 0; i < computerCards.length; i++) {
            computerCards[i].setAttribute("id", `computer-card-${i}`);
            monscount++;
            console.log(monscount + " count");
        }
        console.log(rand);

        setTimeout(() => {
        compActiveCard();
}, 1000)
    }, 500)
}

function compActiveCard(){
        chosen = document.getElementById(rand);

        const hp = chosen.querySelector(".hp").innerHTML;
        const atk = chosen.querySelector(".atk").innerHTML;
        const points = chosen.querySelector(".points").innerHTML;
        chosen.style.scale= "1.2";
        const hpNum = parseInt(hp.replace(/\D/g, ''), 10);
        const atkNum = parseInt(atk.replace(/\D/g, ''), 10);
    const pointsNum = parseInt(points.replace(/\D/g, ''), 10);
testbutton.disabled = false;

        console.log(hpNum);
        console.log(atkNum);
        console.log(pointsNum);
    currentComputerCardStats = { hpNum, atkNum, pointsNum };
        

}

function gameRound() {
    if (deck.length < 4) return; // Not enough cards left
    shuffleDeck(deck);
    drawPlayerCards();
    x++;

}




drawButton.addEventListener("click", gameRound);

document.addEventListener("DOMContentLoaded", computerCardsGenerated);