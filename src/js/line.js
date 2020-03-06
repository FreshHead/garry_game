import {getColor, isNotMatched, isAllSame, Position} from "./utils.js";

export let findLine;

function isHorizontalLine(x, y) {
    return isAllSame([getColor(x, y), getColor(x + 1, y), getColor(x + 2, y)]);
}

function isVerticalLine(x, y) {
    return isAllSame([getColor(x, y), getColor(x, y + 1), getColor(x, y + 2)]);
}


findLine = () => {
    let lines = [];
    for (let y = 0; y < 5; y++) {
        for (let x = 0; x < 3; x++) {
            if (isHorizontalLine(x, y)) {
                lines.push(new Line(x, y, true));
            }
            if (isVerticalLine(y, x)) {
                lines.push(new Line(y, x, false));
            }
        }
    }
    return lines;
};

class Line {
    constructor(x, y, isHorizontal) {
        if (isHorizontal) {
            this.points = [new Position(x, y), new Position(x + 1, y), new Position(x + 2, y)];
        } else {
            this.points = [new Position(x, y), new Position(x, y + 1), new Position(x, y + 2)];
        }
    }
}