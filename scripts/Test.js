import DotsAndBoxes from "./DotsAndBoxes.js";
import Winner from "./Winner.js";

let d = new DotsAndBoxes(3, 3);
d.createBoard();
let mr;
d.play(new Cell(0, 1));
d.play(new Cell(1, 0));
d.play(new Cell(2, 1));
d.play(new Cell(1, 2));
d.play(new Cell(3, 0));
d.play(new Cell(4, 1));
d.play(new Cell(3, 2));
d.play(new Cell(6, 1));
d.play(new Cell(5, 0));
d.play(new Cell(5, 2));
d.play(new Cell(0, 3));
d.play(new Cell(2, 3));
d.play(new Cell(4, 3));
d.play(new Cell(1, 4));
d.play(new Cell(3, 4));
d.play(new Cell(0, 5));
d.play(new Cell(1, 6));
d.play(new Cell(2, 5));
d.play(new Cell(5, 4));
d.play(new Cell(6, 3));
d.play(new Cell(4, 5));
d.play(new Cell(3, 6));
d.play(new Cell(6, 5));
mr = d.play(new Cell(5, 6));
console.assert(mr.getWinner() === Winner.PLAYER2, "Vencedor incorreto");
