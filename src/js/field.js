import {getCor, getPosClass, isNear, replacePosClass, getRandomInt, Position} from "./utils.js";
import {findRhombuses} from "./rhombus.js";

export let generateField, addTile, destroy, onClick;


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

addTile = (cssPosClass) => $('#gameField').append(`<div class='tile ${generateColor()} ${cssPosClass}'/>`);

function generateColor() {
    switch (getRandomInt(3)) {
        case 0:
            return "gold";
        case 1:
            return "silver";
        case 2:
            return "violet"
    }
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
        prevTile.style.transform = "scale(1)";
        prevTile = null;
        Promise.all(findRhombuses().map(rhombus => destroy(rhombus.points))).then(populate);
    } else {
        prevTile = target;
        prevTile.style.transform = "scale(0.6)";
    }
};


destroy = (coordinateList) => {
    // let promises = [];
    coordinateList.forEach(coordinate => {
        let tile = $(`.pos_x${coordinate.x}_y${coordinate.y}`);
        tile.addClass("matched");
        // let promise = new Promise(resolve => {
        // setTimeout(() => {
        tile.remove();
        // shiftDown(coordinate).then(resolve);
        // resolve();
        // }, 1000);
        // });
        // TODO: Попробуй переделать на async await
        // promises.push(promise);
    });
    // return Promise.all(promises);
};

let populate = () => {
    fillTopRow().then(() => {
        let holes = findHoles();
        if (holes.length) {
            // Promise.all(holes.map(hole => shiftDown(hole))).then(populate);
            setTimeout(() => {
                holes.forEach(hole => shiftDown(hole));
                populate();
            }, 1000);
        } else {
            // Promise.all(findRhombuses().forEach(rhombus => destroy(rhombus.points))).then(populate);
            setTimeout(() => {
                let rhombuses = findRhombuses();
                if(rhombuses.length){
                    rhombuses.forEach(rhombus => destroy(rhombus.points));
                    populate();
                }
            }, 1000);
        }
    });
};

let shiftDown = (coordinate) => {
    return new Promise(resolve => {
            // setTimeout(() => {
            for (let y = coordinate.y - 1; y >= 0; y--) {
                let classPos = `pos_x${coordinate.x}_y${y + 1}`;
                let upperTile = $(`.pos_x${coordinate.x}_y${y}`)[0];
                if (upperTile) {
                    replacePosClass(upperTile, classPos);
                }
            }
            resolve();
            // }, 1000);
        }
    )
};

let fillTopRow = () => {
    return new Promise(resolve => {
            setTimeout(() => {
                for (let x = 0; x < 5; x++) {
                    let posClass = `pos_x${x}_y${0}`;
                    if (!$("." + posClass)[0]) {
                        addTile(posClass);
                    }
                }
                resolve();
            }, 1000);
        }
    );
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
