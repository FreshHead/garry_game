import {generateField, onClick, findFigures} from './field.js';

// TODO: Сделай набросок Гарри на бумаге. Замени шарики на еду.
// TODO: С помощью setTimeout() заменяй удалённые круги на новые
// TODO: Сделай падение кругов в пустые ячейки.
// TODO: Нарисуй на бумаге Кеншина и Сано. Каждая фигура на поле - это один из ударов.
//  Удары отбиваются блоками, как камень-ножницы-бумага
// TODO: Добавь в проект в github.


// Game start
$('#gameField').on('click', '.tile', onClick);
let hasFigure = true;
while(hasFigure) {
    generateField();
    hasFigure = findFigures().length !== 0;
}
