import {getColor, isNotMatched} from "./utils.js";
import {isAllSame, Position} from "./utils";

export let findLine;

function isLine(x, y) {
    return isAllSame([getColor(x, y),  getColor(x+1, y), getColor(x+2, y)]);
}

findLine = () => {
    let line = [];
    for(let y = 0; y < 5; y++){
        for(let x = 0; x < 3; x++){
            if(isLine(x, y)){
                line.push(new Line(x, y));
            }
        }
    }
    return line;
}

class Line {
    constructor(x,y) {
        this.points = [new Position(x, y), new Position(x+1, y), new Position(x + 2, y)];
    }
}