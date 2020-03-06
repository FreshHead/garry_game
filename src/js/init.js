import {generateField, onClick} from './field.js';
import {findRhombuses} from "./rhombus.js";

// TODO: Сделай набросок Гарри на бумаге. Замени шарики на еду.
// TODO: С помощью setTimeout() заменяй удалённые круги на новые
// TODO: Сделай падение кругов в пустые ячейки.
// TODO: Нарисуй на бумаге Кеншина и Сано. Каждая фигура на поле - это один из ударов.
//  Удары отбиваются блоками, как камень-ножницы-бумага
// TODO: Добавь в проект в github.


// Game start
$('#gameField').on('click', '.tile', onClick);
let hasRombus = true;
while(hasRombus) {
    generateField();
    hasRombus = findRhombuses().length !== 0;
}
