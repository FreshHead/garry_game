import {startGame, generateField, onClick, findFigures} from './field.js';
// TODO: Нарисуй на бумаге Кеншина и Сано. Каждая фигура на поле - это один из ударов.
//  Удары отбиваются блоками, как камень-ножницы-бумага
// TODO: Проверяй есть ли ход в строке или в колонке в игре Гари
// TODO: Добавь выбор уровня сложности перед стартом
// TODO: Добавь двойные тайлы, например "двойная отбивная"Они дают в 2 раза больше очков. Это добавит сложности, потому что теперь нужно ставить приоритет им.

// const isMobile = window.matchMedia("only screen and (max-width: 768px)").matches;
// const isPhone = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
//
// if(isPhone){
//     const harryImg = $("#Harry")[0];
//     harryImg.src = "img/HarryPhone1.jpg";
// }
// Game start
$('#gameField').on('click', '.tile', onClick);
let hasFigure = true;
while(hasFigure) {
    generateField();
    hasFigure = findFigures().length !== 0;
}
// startGame();

