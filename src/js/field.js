import {colors, getCor, getPosClass, isNear, replacePosClass, getRandomInt, Position} from "./utils.js";
import {findLine} from "./line.js";

export let generateField, addTile, destroy, onClick, findFigures;
let stepSpeed = 100;
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
    let target = e.target || e.srcElement;
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
        if(figures.length){
            figures.forEach(figure => destroy(figure.points));
            populate();
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


destroy = (coordinateList) => {
    coordinateList.forEach(coordinate => {
        let tile = $(`.pos_x${coordinate.x}_y${coordinate.y}`);
        let isMobile = window.matchMedia("only screen and (max-width: 768px)").matches;
        let mouth;
        if(isMobile){
            mouth = {left: "10vw", top:"-32vh"}
        } else {
            mouth = {left: "4.7vw", top: "-33vh"}
        }
        tile.animate({
                left: mouth.left,
                top: mouth.top,
            }, "slow",
            () => {
                tile.remove();
            });
    });
};

let populate = () => {
    setTimeout(() => {
        fillTopRow();
        let holes = findHoles();
        if (holes.length) {
            setTimeout(() => {
                holes.forEach(hole => shiftDown(hole));
                populate();
            }, stepSpeed);
        } else {
            let figures = findFigures();
            if (figures.length) {
                setTimeout(() => {
                    figures.forEach(figure => destroy(figure.points));
                    populate();
                }, stepSpeed);
            }
        }
    }, stepSpeed);
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
