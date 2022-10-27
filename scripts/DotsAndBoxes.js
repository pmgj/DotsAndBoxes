import CellState from "./CellState.js";
import MoveResult from "./MoveResult.js";
import Player from "./Player.js";
import Winner from "./Winner.js";

export default class DotsAndBoxes {
    constructor(nrows, ncols) {
        this.rows = nrows * 2 + 1;
        this.cols = ncols * 2 + 1;
        this.board = this.createBoard();
        this.turn = Player.PLAYER1;    
    }
    createBoard() {
        let matrix = Array(this.rows).fill().map(() => Array(this.cols).fill());
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                if (i % 2 === 0) {
                    matrix[i][j] = (j % 2 === 0) ? CellState.VERTEX : CellState.OPEN_BORDER;
                } else {
                    matrix[i][j] = (j % 2 === 0) ? CellState.OPEN_BORDER : CellState.EMPTY;
                }
            }
        }
        return matrix;
    }
    getBoard() {
        return this.board;
    }
    getTurn() {
        return this.turn;
    }
    play(cell) {
        let { x, y } = cell;
        if (!cell) {
            throw new Error("The cell do not exist.");
        }
        if (!this.onBoard(cell)) {
            throw new Error("The cell is not in the board.");
        }
        if (this.board[x][y] !== CellState.OPEN_BORDER) {
            throw new Error("Only open borders can be played.");
        }
        /* Change border and cells */
        let changeTurn = true;
        this.board[x][y] = CellState.CLOSED_BORDER;
        for (let i = 1; i < this.rows; i += 2) {
            for (let j = 1; j < this.cols; j += 2) {
                if (this.board[i][j] === CellState.EMPTY && this.board[i - 1][j] === CellState.CLOSED_BORDER && this.board[i + 1][j] === CellState.CLOSED_BORDER && this.board[i][j - 1] === CellState.CLOSED_BORDER && this.board[i][j + 1] === CellState.CLOSED_BORDER) {
                    this.board[i][j] = (this.turn === Player.PLAYER1) ? CellState.PLAYER1 : CellState.PLAYER2;
                    changeTurn = false;
                }
            }
        }
        /* Return result of a play */
        let result = new MoveResult(this.endOfGame(), { numP1: this.countPieces(CellState.PLAYER1), numP2: this.countPieces(CellState.PLAYER2) });
        if (changeTurn) {
            this.turn = this.turn === Player.PLAYER1 ? Player.PLAYER2 : Player.PLAYER1;
        }
        return result;
    }
    onBoard({ x, y }) {
        let inLimit = (value, limit) => value >= 0 && value < limit;
        return (inLimit(x, this.rows) && inLimit(y, this.cols));
    }
    endOfGame() {
        let empty = this.countPieces(CellState.EMPTY);
        if (empty === 0) {
            let numP1 = this.countPieces(CellState.PLAYER1);
            let numP2 = this.countPieces(CellState.PLAYER2);
            if (numP1 === numP2) {
                return Winner.DRAW;
            } else if (numP2 > numP1) {
                return Winner.PLAYER2;
            } else {
                return Winner.PLAYER1;
            }
        }
        return Winner.NONE;
    }
    countPieces(player) {
        return this.board.flat().filter(a => a === player).length;
    }
}