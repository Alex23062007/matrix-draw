var canvas = document.getElementById("canvas");
var width = 64;
var height = 64;
var canvasBtn = document.getElementById("makecanvas");
var colour = document.getElementById("colourpicked").value;
var bgColour = document.getElementById("bgcolourpicked").value;



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
    document.getElementById("body").setAttribute("style", "background-color:" + bgColour)
}

function createCanvas() {
    spriteValue = new Array(width * height)
    for (i = 0; i < height; i++) {
        const row = canvas.insertRow(i);
        for (j = 0; j < width; j++) {
            var cell = row.insertCell(j);
            cell.addEventListener("mouseover", mouseOverCell);
            cell.addEventListener("click", mouseClickCell)
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
    if (e.buttons == 1 || e.buttons == 3) {
        this.setAttribute("style", "background-color: " + colour)
    }
}

function mouseClickCell(e) {
    this.setAttribute("style", "background-color: " + colour)
}

canvasBtn.addEventListener("click", () => {
    clearCanvas();
    createCanvas();
});