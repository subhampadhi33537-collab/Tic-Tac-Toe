let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector(".reset");
let newgamebtn = document.querySelector("#new-game");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnO = true;
let totalbtnpress = 0;
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];
const resetgame = () => {
    turnO = true;
    enableboxes();
    msgcontainer.classList.add("hide");
    totalbtnpress = 0;
};

boxes.forEach(function (box) {

    box.addEventListener("click", function () {
        if (turnO) {
            box.innerText = "O";
            turnO = false;
            box.style.color = "green";
        }
        else {
            box.innerText = "X";
            turnO = true;
            box.style.color = "red";
        }
        box.disabled = true;
        totalbtnpress++;
        checkWinner();
        console.log(totalbtnpress);
    })
})
const disableboxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}
const enableboxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}
const showwinner = (winner) => {
    msg.innerText = `🎊Congratulation,🎉 winner is ${winner}`;
    msgcontainer.classList.remove("hide");
    disableboxes();
}
const checkWinner = () => {
    let check = "nowin";
    for (let pattern of winPatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (pos1val != "" && pos2val != "" && pos3val != "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                showwinner(pos1val);
                check = "win";
            }
            else {
                check = "nowin";
            }
        }
        if (totalbtnpress == 9 && check == "nowin") {
            disableboxes();
            msg.innerText = "Tie,Play Again!";
            msgcontainer.classList.remove("hide");
        }
    }
}


newgamebtn.addEventListener("click", resetgame);
resetbtn.addEventListener("click", resetgame);
