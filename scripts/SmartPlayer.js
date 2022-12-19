import Cell from "./Cell.js";
import CellState from "./CellState.js";
import DotsAndBoxes from "./DotsAndBoxes.js";
import Player from "./Player.js";

export default class SmartPlayer {
    constructor(board, player) {
        this.board = board;
        this.rows = this.board.length;
        this.cols = this.board[0].length;
        this.player = player;
    }
    get3Boxes() {
        for(let i = 1; i < this.rows - 1; i += 2) {
            for(let j = 1; j < this.cols - 1; j += 2) {
                let borders = [new Cell(i - 1, j), new Cell(i + 1, j), new Cell(i, j - 1), new Cell(i, j + 1)];
                if(borders.filter(({x, y}) => this.board[x][y] === CellState.CLOSED_BORDER).length === 3) {
                    return new Cell(i, j);
                }
            }    
        }
    }
    play() {
        let p = this.get3Boxes();
        if(p) {
            return p;
        }
    }
}

let dots = new DotsAndBoxes(3, 4);
dots.play(new Cell(0, 1));
dots.play(new Cell(1, 0));
dots.play(new Cell(2, 1));
console.table(dots.getBoard());
let sm = new SmartPlayer(dots.getBoard(), Player.PLAYER2);
console.log(sm.play());