import { generateField, onClick, findFigures } from './field.js';
// TODO: Проверяй есть ли ход в строке или в колонке в игре Гари
// TODO: Добавь выбор уровня сложности перед стартом
// TODO: Добавь двойные тайлы, например "двойная отбивная"Они дают в 2 раза больше очков. Это добавит сложности, потому что теперь нужно ставить приоритет им.

document.getElementById("rules").showModal(); // Да, мы можем прописать <dialog open>, но тогда к примеру не будет засерения, осностальной части экрана.
document.getElementById("test").addEventListener("click", () => {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", 'http://localhost:5000/records', true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () { // Call a function when the state changes.
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            // Request finished. Do processing here.
        }
    }
    xhr.send("name=Hello&points=101");
});

function startGame() {
    const timer = document.getElementById("timer");
    const time = setInterval(() => {
        timer.textContent--;
        if (timer.textContent <= 0) {
            clearInterval(time);
            document.getElementById("game-over").showModal();
            // TODO:  Сделай сообщение что время вышло и предложи сохранить рекорд.
        }
    }, 1000);

    $('#gameField').on('click', '.tile', onClick);
    let hasFigure = true;
    while (hasFigure) {
        generateField();
        hasFigure = findFigures().length !== 0;
    }
};

document.getElementById("start-game").addEventListener("click", () => {
    document.getElementById("rules").close();
    startGame();

});

