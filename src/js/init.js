import {generateField, onClick, findFigures} from './field.js';
// TODO: Выбери фотку Гарри. Сделай ей анимацию увеличения живота.
// TODO: Нарисуй на бумаге Кеншина и Сано. Каждая фигура на поле - это один из ударов.
//  Удары отбиваются блоками, как камень-ножницы-бумага


// Game start
$('#gameField').on('click', '.tile', onClick);
let hasFigure = true;
while(hasFigure) {
    generateField();
    hasFigure = findFigures().length !== 0;
}
