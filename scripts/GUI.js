import DotsAndBoxes from "./DotsAndBoxes.js";
import Cell from "./Cell.js";

class GUI {
    constructor() {
        this.game = null;
    }
    eventsTable() {
        let cells = document.querySelectorAll(".OPEN_BORDER");
        for (let i = 0; i < cells.length; i++) {
            let cell = cells[i];
            cell.onclick = evt => {
                try {
                    let mr = this.game.play(this.coordinates(evt.target));
                    let board = this.game.getBoard();
                    this.updateTable(board);
                    let { numP1, numP2 } = mr.getData();
                    document.getElementById("red").textContent = numP1;
                    document.getElementById("blue").textContent = numP2;
                    this.changeMessage(mr.getWinner());
                } catch (ex) {
                    this.setMessage(ex.message);
                }
            };
        }
    }
    setMessage(message) {
        let msg = document.getElementById("message");
        msg.textContent = message;
    }
    changeMessage(m) {
        let objs = { DRAW: "Draw!", PLAYER2: "Blue's win!", PLAYER1: "Red's win!" };
        if (objs[m]) {
            this.setMessage(`Game Over! ${objs[m]}`);
        } else {
            let msgs = { PLAYER1: "Red's turn.", PLAYER2: "Blue's turn." };
            this.setMessage(msgs[this.game.getTurn()]);
        }
    }
    coordinates(cell) {
        return new Cell(cell.parentNode.rowIndex, cell.cellIndex);
    }
    createTable() {
        let form = document.forms[0];
        this.game = new DotsAndBoxes(parseInt(form.numRow.value), parseInt(form.numCol.value));
        let board = this.game.getBoard();
        this.updateTable(board);
    }
    updateTable(board) {
        let tbody = document.querySelector("tbody");
        tbody.innerHTML = "";
        for (let i = 0; i < board.length; i++) {
            let tr = document.createElement("tr");
            tbody.appendChild(tr);
            for (let j = 0; j < board[i].length; j++) {
                let td = document.createElement("td");
                tr.appendChild(td);
                td.className = board[i][j];
            }
        }
        this.eventsTable();
        this.changeMessage();
        document.getElementById("red").textContent = "0";
        document.getElementById("blue").textContent = "0";
    }
    registerEvents() {
        let form = document.forms[0];
        form.numRow.onchange = this.createTable.bind(this);
        form.numCol.onchange = this.createTable.bind(this);
        form.start.onclick = this.createTable.bind(this);
        form.numRow.focus();
        this.createTable();
    }
}
let gui = new GUI();
gui.registerEvents();