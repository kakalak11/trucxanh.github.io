import { Cover } from "./Cover.js";
import { Label } from "./Label.js";

let randomizedArray = shuffle();
function shuffle() {
    let imageArray = ["url(./Images/circle.png)",
        "url(./Images/diamond.png)",
        "url(./Images/halfsquare.png)",
        "url(./Images/heart.png)",
        "url(./Images/rectangle.png)",
        "url(./Images/shape.png)",
        "url(./Images/sixstar.png)",
        "url(./Images/square.png)",
        "url(./Images/star.png)",
        "url(./Images/triangle.png)",
        "url(./Images/triangle.png)",
        "url(./Images/circle.png)",
        "url(./Images/diamond.png)",
        "url(./Images/halfsquare.png)",
        "url(./Images/heart.png)",
        "url(./Images/rectangle.png)",
        "url(./Images/shape.png)",
        "url(./Images/sixstar.png)",
        "url(./Images/square.png)",
        "url(./Images/star.png)"];
    let currentIndex = imageArray.length, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [imageArray[currentIndex], imageArray[randomIndex]] = [
            imageArray[randomIndex], imageArray[currentIndex]];
    }

    return imageArray;
};

let cardList = [];
let winList = [];
let cardIndex = 0;
let temp = [];
let canClick = true;
let coin = 10000;

function startGame() {
    createScoreBoard(coin);
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 5; j++) {
            cardIndex++;
            var cover = new Cover(randomizedArray[cardIndex - 1]);
            cardList.push(cover);
            addElement(cover, i, j, cardIndex);
            document.body.appendChild(cover.view);
        }
    }
}

function addElement(cover, i, j, cardIndex) {
    let label = new Label(cardIndex);
    cover.addChild(label);
    cover.index = cardIndex - 1;
    cover.x = j * 90;
    cover.y = i * 90;
    let _onClickFunc = onClickFunction.bind(cover);
    cover.view.addEventListener("click", _onClickFunc);
}

let countWin = 0;

function onClickFunction() {
    if (canClick) {
        let index = this.index;
        temp.push(cardList[index]);
        this.children[0].hide();
        this.open();
        // console.log(temp);
        if (temp.length === 2 && canClick) {
            if (!temp[0].del && !temp[1].del) {
                canClick = false;
                let checkCard = function () {
                    if (temp[0].index !== temp[1].index) {
                        if (temp[0].image === temp[1].image) {
                            setTimeout(function () {
                                temp[0].delete();
                                temp[1].delete();
                                canClick = true;
                                temp = [];
                            }, 1000)
                            countWin++;
                            console.log(countWin);
                            if (countWin === 10) {
                                console.alert("you win");
                            }

                            return true;
                        }
                        else {
                            setTimeout(function () {
                                temp[0].close();
                                temp[0].children[0].open();
                                temp[1].close();
                                temp[1].children[0].open();
                                canClick = true;
                                temp = [];
                            }, 1000);

                            return false;
                        }
                    }
                    else if (temp[0].index === temp[1].index) {
                        setTimeout(function () {
                            temp[0].close();
                            temp[0].children[0].open();
                            temp[1].close();
                            temp[1].children[0].open();
                            temp = [];
                            canClick = true;

                        }, 1000);

                        return null;
                    }

                }

                update(checkCard());
            }
            else {
                temp = [];
            }
        }
    }
}


function update(checkCard) {
    if (checkCard) {
        console.log(`${coin} + 1000`);
        coin += 1000;
        console.log(`${coin}`);
        console.log("the cards are matched");
        createScoreBoard(coin, 1000);

    }
    else if (checkCard === null) {
        console.log("2 cards are the same");
        console.log(`${coin}`);
        createScoreBoard(coin, 0);
    }
    else if (!checkCard) {
        console.log(`${coin} - 500`);
        coin -= 500;
        console.log(`${coin}`);
        console.log("the cards are not matched");
        createScoreBoard(coin, 500);
    }
}

function coinChange(cover, diff) {
    let label = new Label();
    cover.addChild(label);
    label.x = 175;
    label.y = 25;
    label.view.style.visibility = "visible";
    if (diff === 1000) {
        label.string = "+" + diff;
    }
    else if (diff === 500) {
        label.string = "-" + diff;
    }
    else if (diff === 0) {
        label.string = " ";
    }
    setTimeout(function () {
        label.view.style.visibility = "hidden";
    }, 1000);

}

function createScoreBoard(coin, diff) {
    let cover = new Cover();

    document.body.appendChild(cover.view);
    cover.view.style.width = 90 * 5 + "px";
    cover.view.style.backgroundColor = "#00ffff";
    cover.y = 90 * 4;
    cover.x = -2;
    let label = new Label();
    cover.addChild(label);
    label.string = coin;

    coinChange(cover, diff);

    if (coin <= 0) {
        label.string = "GAME OVER...";
        label.view.style.fontSize = "50px";
        cardList.forEach(element => {
            element.delete();
        });
    }
    if (countWin === 10) {
        label.string = "VICTORY !!!";
        label.view.style.fontSize = "50px";
    }

}

startGame();