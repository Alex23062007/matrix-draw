let canvas = document.getElementById("canvas")
let width = 64
let height = 64
let test = document.getElementById("testing")

function createCanvas() {
    spriteValue = new Array(width * height)
    for (i = 0; i < height; i++) {
        const row = canvas.insertRow(i);
        for (j = 0; j < width; j++) {
            var cell = row.insertCell(j);

        }
    }
}

function clearCanvas() {
    while (canvas.firstChild) {
        canvas.removeChild(canvas.firstChild);
        spriteValue = [];
    }
}

test.addEventListener("click", () => {
    clearCanvas();
    createCanvas();
});