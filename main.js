var canvas = document.getElementById("canvas");
var width = 64;
var height = 64;
var canvasBtn = document.getElementById("makecanvas");
var colour = document.getElementById("colourpicked").value;
var bgColour = document.getElementById("bgcolourpicked").value;
var savedGrid = [];
var save = document.getElementById("save");
var body = document.getElementById("body");

function openSidebar() {
    document.getElementById("sidebar").style.left = "0";
}
function closeSidebar() {
    document.getElementById("sidebar").style.left = "-300px";
}

function updateColour() {
    colour = document.getElementById("colourpicked").value;
}

function updateBG() {
    bgColour = document.getElementById("bgcolourpicked").value;
    body.setAttribute("style", "background-color:" + bgColour)
}

function createCanvas() {
    spriteValue = new Array(width * height)
    for (i = 0; i < height; i++) {
        const row = canvas.insertRow(i);
        for (j = 0; j < width; j++) {
            var cell = row.insertCell(j);
            cell.addEventListener("mouseover", mouseOverCell);
            cell.addEventListener("click", mouseClickCell);
            cell.setAttribute("id", "cell");
        }
    }

    console.log(colour)
}


function clearCanvas() {
    while (canvas.firstChild) {
        canvas.removeChild(canvas.firstChild);
        spriteValue = [];
    }
}

function mouseOverCell(e) {
    if (e.buttons >= 1) {
        this.setAttribute("style", "background-color: " + colour)
    }
}

function mouseClickCell(e) {
    this.setAttribute("style", "background-color: " + colour)
}

function editText(text) {
    var newText = document.getElementById("saveTxt");
    newText.innerHTML = btoa(`${text}`);
    console.log(`added ${text}`);
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

canvasBtn.addEventListener("click", () => {
    clearCanvas();
    createCanvas();
});

save.addEventListener("click", () => {
    var cellList = document.querySelectorAll("#cell")
    cellList.forEach(function (cell) {
        if (!cell.style.backgroundColor) {
            savedGrid.push("#000000")
        }
        else {
            var str = cell.style.backgroundColor.replace(/[a-z()]/g, "");
            rgb = str.split(", ")
            rgb[0] = parseInt(rgb[0])
            rgb[1] = parseInt(rgb[1])
            rgb[2] = parseInt(rgb[2])
            savedGrid.push(rgbToHex(rgb[0], rgb[1], rgb[2]))
        }
    });
    editText(savedGrid);
    savedGrid = [];
});