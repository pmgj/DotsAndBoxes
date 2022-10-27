export default class MoveResult {
    constructor(winner, data) {
        this.winner = winner;
        this.data = data;
    }
    setWinner(win) {
        this.winner = win;
    }
    getWinner() {
        return this.winner;
    }
    getData() {
        return this.data;
    }
}