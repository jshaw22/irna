var brd = document.createElement("DIV");
document.body.insertBefore(brd, document.getElementById("board"));
const duration = 3000;
const speed = 0.5;
const cursorXOffset = 0;
const cursorYOffset = -5;
var shapes = [];
imageClicked = false;


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function goClicked() {
    var goButton = document.getElementById("goButton");
    goButton.style.display = "none";
    //turn off yes/no buttons then turn them on once the text finishes rendering
    var yesNoButtons = document.getElementById("buttons");
    yesNoButtons.style.display = "none";
    var mainContent = document.getElementById("mainContent");
    mainContent.style.display = "block";
    var restOfWords = "will you officially be the cat lady to my cat man?".split(" ");
    var anriNameId = document.getElementById("name");
    var anriName = "Anri, ";

    setTimeout(() => {
        anriNameId.innerHTML = anriName;
    }, 400);

    await sleep(1000);
    await setTimeout(function () { loadWord(restOfWords, 0); }, 200);
    setTimeout(() => {
        yesNoButtons.style.display = "block";
    }, 2500);
    

}

function loadWord(word, index) {
    if (index == word.length) return;
    var restOfWords = document.getElementById("restOfWords");
    restOfWords.innerHTML = restOfWords.innerHTML + " " + word[index];

    setTimeout(function () { loadWord(word, index + 1); }, 200);
}

function yesClicked(x, y, xBound, xStart, scale) {
    if (!imageClicked) {
        var happyText = document.createElement("p");
        happyText.innerHTML = "woohoo, you've made me the luckiest guy in San Diego!";
        var imgElem = document.createElement("img");
        imgElem.setAttribute("src", "meandtina.jpg");
        document.getElementById('imageOfUs').appendChild(happyText);
        document.getElementById("imageOfUs").appendChild(imgElem);
        imageClicked = true;
        setInterval(check, 400);
    }

    var heart = document.createElement("DIV");
    heart.setAttribute('class', 'heart');
    brd.appendChild(heart);
    heart.time = duration;
    heart.x = x;
    heart.y = y;
    heart.bound = xBound;
    heart.direction = xStart;
    heart.style.left = heart.x + "px";
    heart.style.top = heart.y + "px";
    heart.scale = scale;
    heart.style.transform = "scale(" + scale + "," + scale + ")";
    if (shapes == null)
        shapes = [];
    shapes.push(heart);
    return heart;
}

var before = Date.now();
var id = setInterval(frame, 5);

function frame() {
    var current = Date.now();
    var deltaTime = current - before;
    before = current;
    for (i in shapes) {
        var heart = shapes[i];
        heart.time -= deltaTime;
        if (heart.time > 0) {
            heart.y -= speed;
            heart.style.top = heart.y + "px";
            heart.style.left = heart.x + heart.direction * heart.bound * Math.sin(heart.y * heart.scale / 30) + "px";
        }
        else {
            heart.parentNode.removeChild(heart);
            shapes.splice(i, 1);
        }
    }
}

function check() {
    var picture = document.getElementById("imageOfUs");
    var rect = picture.getBoundingClientRect();
    if (true) {
        var start = 1 - Math.round(Math.random()) * 2;
        var scale = Math.random() * Math.random() * 0.8 + 0.2;
        var bound = 100 + Math.random() * 100;
        yesClicked(rect.width / 3, rect.bottom, bound, start, scale);
    }
}

function noClicked() {
    if (imageClicked)
        alert("Too late; no takesies backsies!");
    else {
        var rejectionText = document.createElement("p");
        rejectionText.className = "rejectionText";
        rejectionText.innerHTML = "Well... this is awkward...try again? :|";
        document.getElementById("imageOfUs").appendChild(rejectionText);
        setTimeout(() => {
            location.reload();
        }, 2000);
    }

}