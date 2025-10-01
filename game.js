let currentPlayerCardStats = null;
let currentComputerCardStats = null;

const allCards = {
    monsters: [
        { name: "stygimoloch", hp: 5, attack: 3, points: 3 },
        { name: "triceratops", hp: 8, attack: 4, points: 5 },
        { name: "velociraptor", hp: 3, attack: 2, points: 2 },
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
        { name: "Health potion1", effect: "heal", value: 1 },
        { name: "Health potion2", effect: "heal", value: 2 },
        { name: "Health potion3", effect: "heal", value: 3 },
        { name: "Atk potion1", effect: "boost", value: 1 }
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
const start = document.getElementById("start");
const itemElem = document.getElementById("inventory");
const use = document.getElementById("use");
const cancel = document.getElementById("cancel");
let playerPoints = 0;
let computerPoints = 0;
let i = 0;
chosen = null;
count = 0;
ik = 0;


let itemdeck = [...allCards.supportitems];
let deck = [...allCards.monsters];

function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}
function shuffleDeckItems(itemdeck){
    for (let i = itemdeck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [itemdeck[i], itemdeck[j]] = [itemdeck[j], itemdeck[i]];
    }
    return itemdeck;
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
        cardDivs[o].style.scale = "1";
    }
    this.style.border = "2px solid #47EB50";
    this.style.scale = "1.2"
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
    count++;

    console.log(playerHp);
    console.log(playerAtk);
    console.log(playerPoints);

    removePlayerCardListeners();

    currentPlayerCardStats = { playerHp, playerAtk, playerPoints };

    console.log("started attack");
    lockInButton.disabled = true;
    testbutton.disabled = false;

}
resultEnemyHp = null;
resultPlayerHp = null;

function hideNonRand() {
    document.querySelectorAll("#computer-hand .cards").forEach(card => {
        if (card.id !== rand) {
            // card.style.display = "none";
            card.style.color = "grey";
            card.style.backgroundColor = "grey";
            // Ensure 'monster' is defined before this block

        }
        else{
            console.log("doodoo");
            document.getElementById(rand).style.display = "block";
            document.getElementById(rand).style.backgroundColor = "#8bc594";
            document.getElementById(rand).style.scale = "1.2";
            document.getElementById(rand).style.borderColor = "#47eb50";
            document.getElementById(rand).style.zIndex = "10";
            document.getElementById(rand).style.color = "black";
        }
    });
}

testbutton.addEventListener("click", startAttack);

function startAttack() {
    if (currentPlayerCardStats == null) {
        return console.log("no active selected");
    }
    else 
    changeStyle();    
    // document.getElementById("selected-card").style.scale = "1.2";
    resultEnemyHp = currentComputerCardStats.hpNum - currentPlayerCardStats.playerAtk;
    resultPlayerHp = currentPlayerCardStats.playerHp - currentComputerCardStats.atkNum;
    console.log("remaining enemy hp " + resultEnemyHp);
    currentComputerCardStats.hpNum = resultEnemyHp;
    currentPlayerCardStats.playerHp = resultPlayerHp;
    testbutton.disabled = true;
    setTimeout(() => {
        // document.getElementById(rand).style.scale = "1.4";
        document.querySelector("#" + rand + " .hp").innerHTML = "HP: " + resultEnemyHp;
        document.querySelector("#selected-card .hp").innerHTML = "HP: " + resultPlayerHp;
        setTimeout(() => {

            if (resultEnemyHp <= 0) {
                playerPoints = playerPoints + currentComputerCardStats.pointsNum;
                playerPointsElem.innerHTML = playerPoints;
                console.log("added " + currentComputerCardStats.pointsNum + " to playerpoints")
                testbutton.disabled = true;
                document.getElementById(rand).remove();
                const indexToRemove = enemyMonsters.indexOf(rand);
                monscount = monscount - 1;
                console.log(monscount + " count")
                testbutton.disabled = true;
                itemAdd(allCards.supportitems);
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
            if (resultPlayerHp <= 0) {
                computerPoints = computerPoints + currentPlayerCardStats.playerPoints;
                computerPointsElem.innerHTML = computerPoints;
                testbutton.disabled = true;
                lockInButton.disabled = false;
                document.getElementById("selected-card").remove();
                currentPlayerCardStats = null;
                x = x + 1;
                if (x == 4 && deck.length < 4) {
                    gameEnd();
                }


                checkX();
                activeCard(playerHandDiv)
            }
            else {
                console.log("peekaboo");
                setTimeout(() => {
                    testbutton.disabled = false;
                }, 300);
            }
            console.log("next round");
        }, 1000);
    }, 1000);

}


let x = 0;
function checkX() {
    if (x === 0) drawButton.disabled = true;
    else if (x === 4) drawButton.disabled = false;
    else return;
}
function drawPlayerCards() {
    lockInButton.disabled = false;
    if (deck.length < 4) return;
    const playerMonsters = drawMonsters(deck, 4);
    renderHand(playerHandDiv, playerMonsters);
    activeCard(playerHandDiv);
    x = 0;
    checkX();
    itemAdd(allCards.supportitems);


}

function computerCardsGenerated() {

        if (deck.length < 4) {

            gameEnd();
        }
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


            compActiveCard();
        setTimeout(() => {
        document.getElementById(rand).style.scale = "1.2";
            document.getElementById(rand).style.borderColor = "#47eb50";
        document.getElementById(rand).style.zIndex = "10";

            
        }, 500);

}

function compActiveCard() {
    chosen = document.getElementById(rand);
    hideNonRand();
    const hp = chosen.querySelector(".hp").innerHTML;
    const atk = chosen.querySelector(".atk").innerHTML;
    const points = chosen.querySelector(".points").innerHTML;
    // chosen.style.scale = "1.2";
    const hpNum = parseInt(hp.replace(/\D/g, ''), 10);
    const atkNum = parseInt(atk.replace(/\D/g, ''), 10);
    const pointsNum = parseInt(points.replace(/\D/g, ''), 10);


    console.log(hpNum);
    console.log(atkNum);
    console.log(pointsNum);
    currentComputerCardStats = { hpNum, atkNum, pointsNum };
    console.log(this);
    if (count >= 1)
    testbutton.disabled = false;

}

function gameRound() {
    if (deck.length < 4) {
        console.log("out of cards")
        return;
    } // Not enough cards left
    shuffleDeck(deck);
    drawPlayerCards();


}




drawButton.addEventListener("click", gameRound);



// -------------------------------

const gameContainer = document.querySelector(".game-container");
const info = document.querySelector(".info");


function hide() {
    gameContainer.style.display = "none";

}


function gameEnd() {
    if (playerPoints > computerPoints) {
        victory();
        hide();
    }
    else if (computerPoints > playerPoints) {
        defeat();
        hide();
    }
    else if (computerPoints == playerPoints) {
        draw();
        hide();
    }

}


const createDiv = document.createElement("div");


function victory() {
    createDiv
    createDiv.setAttribute("id", "victory");
    createDiv.innerHTML = "<p>victory!!</p>"
    document.body.appendChild(createDiv);
}

function defeat() {
    createDiv
    createDiv.setAttribute("id", "defeat");
    createDiv.innerHTML = "<p>defeat!!</p>"
    document.body.appendChild(createDiv);
}

function draw() {
    createDiv
    createDiv.setAttribute("id", "draw");
    createDiv.innerHTML = "<p>draw!!</p>"
    document.body.appendChild(createDiv);
}


function changeStyle() {
    document.getElementById("selected-card").style.scale = "1.4";
    document.getElementById(rand).style.scale = "1.4";
    setTimeout(() => {
        document.getElementById(rand).style.scale = "1.2";
        document.getElementById("selected-card").style.scale = "1.2";
    }, 500);
}


start.addEventListener("click", fancy)


// ---------------------------------------

function fancy(){
    document.getElementById("start-game").style.display = "none";
    document.querySelector("footer").style.display = "none";
    document.querySelector("header").style.display = "none";



}

// ------------loading stuff------------------------------
const container = document.getElementById("loading-contain");
const barEl = document.querySelector(".loading-front");
const counter = document.querySelector(".counter");
let idx = 0;
start.addEventListener("click", loading);

function loading() {

container.style.display = "block";
counter.innerText = idx + "%";
barEl.style.width = idx + "%";
idx++
if (idx < 101){
    setTimeout(loading, 20);
}

if (counter.innerText == "100%"){
    setTimeout(loaded, 1000);
    console.log("peekaboo");
}

}


function loaded(){
    console.log("peekaboo");
    container.style.display = "none";
    gameContainer.style.display = "block";
    cancel.style.display = "none";
    // document.querySelector("footer").style.display = "block";
    // document.querySelector("footer").style.backgroundColor = "#CEB5A7";
    // document.querySelector("header").style.display = "block";
    document.body.style.marginTop = "0";
    document.body.style.marginBottom = "0";
 
    console.log("test");
    computerCardsGenerated();
}

// -----------------------------------

function itemAdd(supportitems) {
    shuffleDeckItems(itemdeck);
    if (Math.random() < 90 / 100) {
        console.log("lucky");
        let itemName = "item" + ik;
        let createIt = document.createElement("div");
        createIt.setAttribute("class", "itemclass");
        createIt.setAttribute("id", itemName);

        // Draw only one support item
        const item = supportitems[Math.floor(Math.random() * supportitems.length)];
        createIt.innerHTML = `
            <h3>${item.name}</h3>
            <p class="effect">Effect: ${item.effect}</p>
            <p class="value">Value: ${item.value}</p>
        
        `;
        itemElem.appendChild(createIt);


        if (document.querySelector("#" + itemName + " .effect").innerHTML === "Effect: heal"){
            console.log("yes");
            document.querySelector("#" + itemName).style.backgroundColor = "green";
            document.querySelector("#" + itemName).style.border = "15px solid #003e00";
        }
        else if (document.querySelector("#" + itemName + " .effect").innerHTML === "Effect: boost") {
            console.log("yes b");
            document.querySelector("#" + itemName).style.backgroundColor = "purple";
        }

    } else {
        console.log("no luck");
    }
        ik++;

}
use.addEventListener("click", useButton);

function useButton() {
    if (currentPlayerCardStats == null) {
        return console.log("no active selected");
    }


    if (document.querySelector(".itemclass") == null){
    console.log("no items in inventory!");
        return;
    } else if (document.querySelector(".itemclass") !== null){
    cancel.style.display = "block";     
        use.style.display = "none";   
    }

    const these = document.querySelectorAll(".itemclass");
    for (let ok = 0; ok < these.length; ok++) {
        these[ok].addEventListener("click", goof);
        these[ok].addEventListener("mouseenter", handleItemMouseEnter);
        these[ok].addEventListener("mouseleave", handleItemMouseLeave);
    }
    use.style.backgroundColor = "yellow";
}

function goof() {

    console.log("success");
    use.style.backgroundColor = "#59981a";
    this.style.backgroundColor = "yellow";
    const effect = this.querySelector(".effect").innerHTML;
    const value = this.querySelector(".value").innerHTML;
    const valNum = parseInt(value.replace(/\D/g, ''), 10);
    cancel.style.display = "none";
    use.style.display = "block";

    this.remove();



    if(effect === "Effect: heal") {
    currentPlayerCardStats.playerHp = currentPlayerCardStats.playerHp + valNum;
    document.querySelector("#selected-card .hp").innerHTML = "HP: " + currentPlayerCardStats.playerHp;    
    console.log("healed");
    }
    else if(effect === "Effect: boost") {
        currentPlayerCardStats.playerAtk = currentPlayerCardStats.playerAtk + valNum;
        document.querySelector("#selected-card .atk").innerHTML = "Atk: " + currentPlayerCardStats.playerAtk;    
    console.log("boosted");
    }



    removeItemListeners();
}

function handleItemMouseEnter() {
    this.style.backgroundColor = "yellow";
}

function handleItemMouseLeave() {
    this.style.backgroundColor = "green";
}

function removeItemListeners() {
    const these = document.querySelectorAll(".itemclass");
    for (let ok = 0; ok < these.length; ok++) {
        these[ok].removeEventListener("click", goof);
        these[ok].removeEventListener("mouseenter", handleItemMouseEnter);
        these[ok].removeEventListener("mouseleave", handleItemMouseLeave);
    }
}

// ------------------------------

document.getElementById("create-item").addEventListener("click", function(){
    itemAdd(allCards.supportitems);
})