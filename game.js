// --------------
// 1 make cards. allCards contains all cards, 2 categories: monsters and supportitems
// 2 make game logic. this will handle hp losses, monster deaths, win/loss conditions
    // draw 3 random monsters, shuffle the deck and remove the monsters from the deck
// 3 make user interface. this will display cards, handle user input
// 4 make it pretty. 
// --------------
let currentPlayerCardStats = null; // Variable to store player's card stats
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
const enemyMonsters = ["computer-card-0", "computer-card-1", "computer-card-2", "computer-card-3"];
const rand = enemyMonsters[~~(Math.random() * enemyMonsters.length)];

const playerHandDiv = document.getElementById("player-hand");
const computerHandDiv = document.getElementById("computer-hand");
const drawButton = document.getElementById("draw-button");



let playerPoints = 0;
let computerPoints = 0;
let i = 0;






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
const testbutton = document.getElementById("testbutton");
testbutton.addEventListener("click", startAttack);

function startAttack() {
    if (currentPlayerCardStats == null){
        return console.log("no active selected");
    }
    else document.getElementById("selected-card").style.scale= "1.2";
    resultEnemyHp = currentComputerCardStats.hpNum - currentPlayerCardStats.playerAtk;
    console.log("remaining enemy hp " + resultEnemyHp);
    testbutton.disabled= "true";
    setTimeout(() => {
        document.getElementById(rand).style.scale = "1.4";
        document.querySelector("#" + rand +  " .hp").innerHTML = "HP: " + resultEnemyHp;
        setTimeout(() => {
            console.log("next round");

        }, 3000);
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
        const computerMonsters = drawMonsters(deck, 4);
        renderHand(computerHandDiv, computerMonsters);

        const computerCards = computerHandDiv.getElementsByClassName("cards");
        for (let i = 0; i < computerCards.length; i++) {
            computerCards[i].setAttribute("id", `computer-card-${i}`);
        }
        console.log(rand);

        setTimeout(() => {
        compActiveCard();
}, 1000)
    }, 500)
}

function compActiveCard(){
            const chosen = document.getElementById(rand);
        const hp = chosen.querySelector(".hp").innerHTML;
        const atk = chosen.querySelector(".atk").innerHTML;
        const points = chosen.querySelector(".points").innerHTML;
        chosen.style.scale= "1.2";
        const hpNum = parseInt(hp.replace(/\D/g, ''), 10);
        const atkNum = parseInt(atk.replace(/\D/g, ''), 10);
    const pointsNum = parseInt(points.replace(/\D/g, ''), 10);


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