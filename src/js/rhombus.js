import {getColor, isAllSame} from "./utils.js";
import {Position} from "./utils.js";
import {destroy} from "./field.js";

export let findRhombuses;

function isRhombus(x, y) {
    return isAllSame([getColor(x - 1, y), getColor(x, y - 1), getColor(x + 1, y), getColor(x, y + 1)]);
}

findRhombuses = () => {
    let Rhombuses = [];
    for (let y = 1; y < 4; y++) {
        for (let x = 1; x < 4; x++) {
            if (isRhombus(x, y)) {
                Rhombuses.push(new Rhombus(x, y));
            }
        }
    }
    return Rhombuses;
};

class Rhombus {
    constructor(x, y) {
        this.points = [new Position(x - 1, y), new Position(x, y - 1), new Position(x + 1, y), new Position(x, y + 1)];
    }
}
