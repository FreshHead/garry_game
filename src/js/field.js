import { colors, getCor, getPosClass, isNear, replacePosClass, getRandomInt, Position } from "./utils.js";
import { findLine } from "./line.js";
import { getColor, isAllSame } from "./utils.js";

export let generateField, addTile, destroy, onClick, findFigures;
let stepSpeed = 80;
findFigures = findLine;

generateField = () => {
    let gameField = $('#gameField');
    gameField.empty();
    new Array(5).fill(new Array(5).fill(true)).forEach((row, indY) => {
        row.forEach((item, indX) => {
            let cssPosClass = `pos_x${indX}_y${indY}`;
            addTile(cssPosClass);
        });
    });
};

addTile = (cssPosClass) => {
    let food = generateFood();
    $('#gameField').append(`<img src="./img/tiles/${food}.svg" alt="${food} image" class='tile ${cssPosClass} ${food}'/>`)
};

function generateFood() {
    return colors[getRandomInt(5)];
}

let prevTile;

onClick = () => {
    let e = window.event;
    let target = e.target;
    if (prevTile) {
        let prevPos = getPosClass(prevTile);
        let newPos = getPosClass(target);
        if (isNear(getCor(prevPos), getCor(newPos))) {
            replacePosClass(target, prevPos);
            replacePosClass(prevTile, newPos);
        } else {
            console.log("Неправильный ход, можно выбирать только соседние круги!");
        }
        let figures = findFigures();
        if (figures.length) {
            populate().then(() => {
                if (!isTurnExist()) {
                    console.log("Нет доступных ходов! Чищу поле");
                    // TODO: Сделай анимацию как все тайлы падают за экран или в мусорку.
                }
            });
        } else {
            console.log("Неправильный ход, не собрано ни одной фигуры!");
            replacePosClass(target, newPos);
            replacePosClass(prevTile, prevPos);
        }
        prevTile.style.transform = "scale(1)";
        prevTile = null;

    } else {
        prevTile = target;
        prevTile.style.transform = "scale(0.6)";
    }
};

let isTurnExist = () => {
    // TODO: Нужно проверить нет ли эл-та снизу или сверху
    // Элемент, который нужно сдвинуть правее или левее
    for (let y = 0; y < 5; y++) {
        for (let x = 0; x < 1; x++) {
            if (isAllSame([getColor(x, y), getColor(x + 1, y), getColor(x + 3, y)]) ||
                isAllSame([getColor(x, y), getColor(x + 2, y), getColor(x + 3, y)])) {
                return true;
            }
        }
    }
    for (let x = 0; x < 5; x++) {
        for (let y = 0; y < 1; y++) {
            if (isAllSame([getColor(x, y), getColor(x, y + 1), getColor(x, y + 3)]) ||
                isAllSame([getColor(x, y), getColor(x, y + 2), getColor(x, y + 3)])) {
                return true;
            }
        }
    }
    // Элемент, который нужно сдвинуть ниже
    for (let y = 0; y < 4; y++) {
        for (let x = 0; x < 3; x++) {
            if (isAllSame([getColor(x, y), getColor(x + 1, y), getColor(x + 2, y + 1)]) ||
                isAllSame([getColor(x, y), getColor(x + 1, y + 1), getColor(x + 2, y)]) ||
                isAllSame([getColor(x, y + 1), getColor(x + 1, y), getColor(x + 2, y)])) {
                return true;
            }
        }
    }
    for (let x = 0; x < 4; x++) {
        for (let y = 0; y < 3; y++) {
            if (isAllSame([getColor(x, y), getColor(x, y + 1), getColor(x + 1, y + 2)]) ||
                isAllSame([getColor(x, y), getColor(x + 1, y + 1), getColor(x, y + 2)]) ||
                isAllSame([getColor(x + 1, y), getColor(x, y + 1), getColor(x, y + 2)])) {
                return true;
            }
        }
    }
    // Элемент, который нужно сдвинуть выше
    for (let y = 1; y < 5; y++) {
        for (let x = 0; x < 3; x++) {
            if (isAllSame([getColor(x, y), getColor(x + 1, y), getColor(x + 2, y - 1)]) ||
                isAllSame([getColor(x, y), getColor(x + 1, y - 1), getColor(x + 2, y)]) ||
                isAllSame([getColor(x, y - 1), getColor(x + 1, y), getColor(x + 2, y)])) {
                return true;
            }
        }
    }
    for (let x = 1; x < 5; x++) {
        for (let y = 0; y < 3; y++) {
            if (isAllSame([getColor(x, y), getColor(x, y + 1), getColor(x - 1, y + 2)]) ||
                isAllSame([getColor(x, y), getColor(x - 1, y + 1), getColor(x, y + 2)]) ||
                isAllSame([getColor(x - 1, y), getColor(x, y + 1), getColor(x, y + 2)])) {
                return true;
            }
        }
    }
    return false;
};

let updatescore = (figures) => {
    const score = document.getElementById("score");
    // TODO: 100 очков за тройку и 400 за 4. 1000 за пятёрку.
    const addedScore = figures.map(figure => Math.pow(figure.points.length, 2))
        .reduce((sum, figureScore) => sum + figureScore);
    score.textContent = Number(score.textContent) + addedScore;
};

destroy = (coordinateList) => {
    return new Promise((resolve) => {
        coordinateList.forEach(coordinate => {
            const tile = $(`.pos_x${coordinate.x}_y${coordinate.y}`);
            const isMobile = window.matchMedia("only screen and (max-width: 768px)").matches;
            let mouth;
            if (isMobile) {
                mouth = { left: "10vw", top: "-32vh" }
            } else {
                mouth = { left: "35px", top: "-350px" }
            }
            const container = document.getElementById("container");
            container.style.backgroundImage = "url(img/Harry2.jpg), url(img/Harry.jpg)";
            setTimeout(() => {
                container.style.backgroundImage = "url(img/Harry.jpg)";
            }, 500);
            tile.animate({
                left: mouth.left,
                top: mouth.top,
            }, "slow",
                () => {
                    tile.remove();
                    resolve();
                });
        });
    });
};

let populate = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            fillTopRow();
            let holes = findHoles();
            if (holes.length) {
                setTimeout(() => {
                    holes.forEach(hole => shiftDown(hole));
                    populate().then(() => resolve());
                }, stepSpeed);
            } else {
                let figures = findFigures();
                if (figures.length) {
                    setTimeout(() => {
                        Promise.all(figures.map(figure => destroy(figure.points))).then(() => {
                            console.info("Фигуры: ", figures.join("\n"));
                            updatescore(figures);
                            populate().then(() => resolve());
                        });
                    }, stepSpeed);
                } else {
                    resolve();
                }
            }
        }, stepSpeed);
    });
};

let shiftDown = (coordinate) => {
    let tile = $(`.pos_x${coordinate.x}_y${coordinate.y}`)[0];
    if (tile) {
        console.info("Попытка сдвинуть не пустую ячейку", tile);
        return;
    }
    for (let y = coordinate.y; y >= 0; y--) {
        let classPos = `pos_x${coordinate.x}_y${y}`;
        let upperTile = $(`.pos_x${coordinate.x}_y${y - 1}`)[0];
        if (upperTile) {
            replacePosClass(upperTile, classPos);
        }
    }
};

let fillTopRow = () => {
    for (let x = 0; x < 5; x++) {
        let posClass = `pos_x${x}_y${0}`;
        if (!$("." + posClass)[0]) {
            addTile(posClass);
        }
    }
};

let findHoles = () => {
    let holes = [];
    for (let y = 0; y < 5; y++) {
        for (let x = 0; x < 5; x++) {
            let posClass = `pos_x${x}_y${y}`;
            if (!$("." + posClass)[0]) {
                holes.push(new Position(x, y));
            }
        }
    }
    return holes;
};
