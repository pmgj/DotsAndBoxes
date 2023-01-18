import Cell from "./Cell.js";
import CellState from "./CellState.js";
import DotsAndBoxes from "./DotsAndBoxes.js";

export default class AIPlayer {
    constructor(board) {
        this.board = board;
        this.m = this.board.length;
        this.n = this.board[0].length;
    }
    makemove() {
        this.takesafe3s();
        let cell = this.sides3();
        if (cell) {
            let zz = this.sides01();
            if (zz) {
                //         takeall3s();
                //         takeedge(zz, x, y);
            } else {
                //         sac(cell.x, cell.y);
            }
            //     if (score[0] + score[1] == this.m * this.n) {
            //         console.log(`Game over! Score: Red = ${score[0]},  Blue = ${score[1]}`);
            //     }
        }
        //  else if (sides01()) takeedge(zz, x, y);
        // else if (singleton()) takeedge(zz, x, y);
        // else if (doubleton()) takeedge(zz, x, y);
        // else makeanymove();
    }
    safehedge(i, j) { //Returns true if (i,j) is a safe hedge
        if (this.board[i - 1][j] === CellState.OPEN_BORDER) {
            if (i === 1) {
                if (this.numberOfBorders(i, j) < 2) return true;
            } else if (i === this.m - 2) {
                if (this.numberOfBorders(i - 2, j) < 2) return true;
            }
            else if (this.numberOfBorders(i, j) < 2 && this.numberOfBorders(i - 2, j) < 2) return true;
        }
        return false;
    }
    safevedge(i, j) {
        if (this.board[i][j - 1] < 1) {
            if (j == 0) {
                if (this.numberOfBorders(i, j) < 2) return true;
            } else if (j == this.n - 2) {
                if (this.numberOfBorders(i, j - 2) < 2) return true;
            }
            else if (this.numberOfBorders(i, j) < 2 && this.numberOfBorders(i, j - 2) < 2) return true;
        }
        return false;
    }
    randhedge(i, j) {
        let x = i;
        let y = j;
        do {
            if (this.safehedge(x, y)) return new Cell(x, y);
            else {
                y += 2;
                if (y === this.n) {
                    y = 0;
                    x += 2;
                    if (x > this.m) x = 0;
                }
            }
        } while (x !== i || y !== j);
        return false
    }
    randvedge(i, j) {
        let x = i;
        let y = j;
        do {
            if (this.safevedge(x, y)) return new Cell(x, y);
            else {
                y += 2;
                if (y > this.n) {
                    y = 0;
                    x += 2;
                    if (x == this.m) x = 0;
                }
            }
        } while (x != i || y != j);
        return false
    }
    sides01() { //Returns true and zz,x,y if there is a safe edge(x,y).
        let zz = (Math.random() < 0.5) ? 1 : 2;  //zz=1 if horizontal, zz=2 if vertical
        let i = Math.random() * this.m | 1;
        let j = Math.random() * this.n | 1;
        if (zz === 1) {
            if (randhedge(i, j)) return zz;
            else {
                zz = 2;
                if (randvedge(i, j)) return zz;
            }
        } else {
            if (randvedge(i, j)) return zz;
            else {
                zz = 1;
                if (randhedge(i, j)) return zz;
            }
        }
        return false;
    }
    sides3() { //Returns true and u,v if there is a box(u,v)=3.
        for (let i = 1; i < this.m; i += 2) {
            for (let j = 1; j < this.n; j += 2) {
                if (this.numberOfBorders(i, j) === 3) {
                    return new Cell(i, j);
                }
            }
        }
        return false;
    }
    numberOfBorders(i, j) {
        let borders = [new Cell(i - 1, j), new Cell(i + 1, j), new Cell(i, j - 1), new Cell(i, j + 1)];
        return borders.filter(({ x, y }) => this.board[x][y] === CellState.CLOSED_BORDER).length;
    }
    takesafe3s() { //Take all singleton and doubleton 3's.
        for (let i = 1; i < this.m; i += 2) {
            for (let j = 1; j < this.n; j += 2) {
                if (this.numberOfBorders(i, j) === 3) {
                    if (this.board[i][j - 1] === CellState.OPEN_BORDER) {
                        if (j === 1 || this.numberOfBorders(i, j - 2) !== 2) this.board[i][j - 1] = CellState.CLOSED_BORDER;
                    } else if (this.board[i - 1][j] === CellState.OPEN_BORDER) {
                        if (i === 1 || this.numberOfBorders(i - 2, j) !== 2) this.board[i - 1][j] = CellState.CLOSED_BORDER;
                    } else if (this.board[i][j + 1] === CellState.OPEN_BORDER) {
                        if (j === this.n - 2 || this.numberOfBorders(i, j + 2) !== 2) this.board[i][j + 1] = CellState.CLOSED_BORDER;
                    } else {
                        if (i === this.m - 2 || this.numberOfBorders(i + 2, j) !== 2) this.board[i + 1][j] = CellState.CLOSED_BORDER;
                    }
                }
            }
        }
    }
}

let model = new DotsAndBoxes(4, 4);
model.play(new Cell(2, 1));
model.play(new Cell(0, 1));
model.play(new Cell(1, 0));
let player = new AIPlayer(model.getBoard());
player.makemove();
console.table(model.getBoard());