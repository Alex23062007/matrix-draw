var canvas = document.getElementById("canvas");
var width = 64;
var height = 64;
var canvasBtn = document.getElementById("makecanvas");
var importBtn = document.getElementById("importcanvas");
var colour = document.getElementById("colourpicked").value;
var bgColour = document.getElementById("bgcolourpicked").value;
var savedGrid = [];
var exportBtn = document.getElementById("export");
var body = document.getElementById("body");
var save = document.getElementById("save");

function createPopup(buttons, type, content) {
    return new Promise((resolve) => {
        const popup = document.getElementById("popup")
        const button1 = document.getElementById("button1")
        const button2 = document.getElementById("button2")
        const button3 = document.getElementById("button3")
        const textarea = document.getElementById("submission")
        const title = document.getElementById("popupTitle")
        const text = document.getElementById("popupText")
        const popupContent = document.getElementById("popupContent")
        popup.style.overflow = "auto"
        document.body.style.overflow = "hidden"
        if (buttons === "yn") {
            button1.style.display = "block"
            button2.style.display = "block"
            button1.innerHTML = "Yes"
            button2.innerHTML = "No"
            button1.addEventListener("click", () => {
                resolve(true);
                closePopup()
            });
            button2.addEventListener("click", () => {
                resolve(false);
                closePopup()
            });
        }
        else if (buttons === "ok") {
            button1.style.display = "block"
            button1.innerHTML = "OK"
            button1.addEventListener("click", () => {
                resolve(true);
                closePopup()
            })
        }
        else if (buttons === "blank") {
        }
        else if (buttons === "force") {
            button1.style.display = "block";
            button2.style.display = "block";
            button1.innerHTML = "OK";
            button2.innerHTML = "Complete Anyway";
            button1.addEventListener("click", () => {
                resolve(false)
                closePopup();
            })
            button2.addEventListener("click", () => {
                resolve(true);
                closePopup();
            })
        }
        else if (buttons === "submit") {
            button1.style.display = "block"
            button1.innerHTML = "Submit"
            button1.addEventListener("click", async () => {
                submissionData = document.getElementById("submission").value;
                console.log(submissionData)
                if (submissionData == "") {
                    text.innerHTML = "Submission Empty!"
                }
                else {


                    try {
                        var colourData = atob(submissionData);
                        var colourDataList = colourData.split(",");
                        console.log(colourData)
                        console.log(colourDataList)
                        if (colourDataList[0][0] != "#") {
                            text.innerHTML = "Invalid Save Data"
                            throw new Error("invalid");
                        }
                        if (document.querySelectorAll("#cell") === undefined || document.querySelectorAll("#cell").length == 0) {
                            createCanvas();
                        }
                        var cellList = document.querySelectorAll("#cell")

                        for (let i = 0; i < colourDataList.length; i++) {
                            var c = cellList[i]
                            c.style.backgroundColor = colourDataList[i];
                        }
                        text.innerHTML = "Imported Successfully"
                        return;
                    }
                    catch (err) {
                        console.log("caught")
                        text.innerHTML = "Invalid Save Data"
                        return;
                    }
                }
            })
        }
        else {
            button1.style.display = "block"
            button1.innerHTML = "debug: Invalid Button Type!!"
        }

        if (type === "info") {
            title.innerHTML = "Information"
            title.style.color = "#67f5ff"
        }
        else if (type === "caution") {
            title.innerHTML = "Caution";
            title.style.color = "#ffdf77";
        }
        else if (type === "submission") {
            title.innerHTML = "Submission";
            title.style.color = "#67f5ff";
        }
        else if (type === "warning") {
            title.innerHTML = "Warning";
            title.style.color = "#cd1000"
        }
        else if (type === "error") {
            title.innerHTML = "Error";
            title.style.color = "#cd1000";
        }
        else {
            title.innerHTML = type;
        }
        if (content === "submitGen") {
            textarea.style.display = "block"
            text.innerHTML = " "
        }
        else {
            text.innerHTML = content;
        }

        popup.style.display = "block"
        window.addEventListener("click", (event) => {
            if (event.target == popup) {
                closePopup();
            }
        }
        )
        const closeBtn = document.getElementById("closePopup")
        function closePopup() {
            popup.style.overflow = "hidden";
            popupContent.style.animation = "contentOut 0.6s";
            popup.style.animation = "bgOut 0.6s";
            popup.addEventListener("animationend", (event) => {
                if (event.animationName === "bgOut") {
                    popup.style.display = "none"
                    button1.style.display = "none";
                    button2.style.display = "none";
                    button3.style.display = "none";
                    popup.style.animation = "";
                    popupContent.style.animation = "";
                    document.body.style.overflow = "auto";
                }
            })
        }
        closeBtn.addEventListener("click", () => {
            closePopup()
        })
    });
}

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
        row.setAttribute("id", "row")
        for (j = 0; j < width; j++) {
            var cell = row.insertCell(j);
            cell.addEventListener("mouseover", mouseOverCell);
            cell.addEventListener("click", mouseClickCell);
            cell.setAttribute("id", "cell");
        }
    }
    exportBtn.style.visibility = "visible";
    save.style.visibility = "visible";
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
    if (document.querySelectorAll("#cell") === undefined || document.querySelectorAll("#cell").length == 0) {
        newText.innerHTML = "Table does not exist or is empty!"
    }
    else {
        newText.innerHTML = btoa(`${text}`);
        console.log(`added ${text}`);
    }

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

exportBtn.addEventListener("click", () => {
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

importBtn.addEventListener("click", () => {
    createPopup("submit", "submission", "submitGen")
});
