import {generateField, onClick, findFigures} from './field.js';
// TODO: Сделай Гарри анимацию открытия рта.
// TODO: Нарисуй на бумаге Кеншина и Сано. Каждая фигура на поле - это один из ударов.
//  Удары отбиваются блоками, как камень-ножницы-бумага
// TODO: Сделай бандл, так как мобилы не поддерживают es6 импорт.

// Game start
$('#gameField').on('click', '.tile', onClick);
let hasFigure = true;
while(hasFigure) {
    generateField();
    hasFigure = findFigures().length !== 0;
}
