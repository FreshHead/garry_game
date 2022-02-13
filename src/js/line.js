import { getColor, isAllSame, Position } from "./utils.js";

export let findLine;

function isHorizontalLine(x, y) {
    return isAllSame([getColor(x, y), getColor(x + 1, y), getColor(x + 2, y)]);
}

function isVerticalLine(x, y) {
    return isAllSame([getColor(x, y), getColor(x, y + 1), getColor(x, y + 2)]);
}

findLine = () => {
    const lines = [];
    const ranges = [];

    // TODO: Храни клетки поля, чтобы не генерить эти последовательности.
    for (let x = 0; x < 5; x++) {
        let range = [];
        for (let y = 0; y < 5; x++) {
            range.push(new Position(x, y));
        }
        ranges.push(range);
    }

    for (let y = 0; y < 5; y++) {
        let range = [];
        for (let x = 0; x < 5; x++) {
            range.push(new Position(x, y));
        }
        ranges.push(range);
    }
    console.log(ranges);
    lines = ranges.reduce(function (acc, item) {
        const chain = findChainInAxis(acc);
        if (chain.length > 0) {
            return acc.push(new Line(chain));
        } else {
            return acc;
        }
    }, []);
    console.log(chain, lines);


    return lines;
};

function findChainInAxis(axisArray) {
    return axisArray.reduce(function (chain, item) {
        if (chain.length === 0 || chain[0].getColor() === item.getColor()) {
            return chain.push(item);
        } else {
            return [];
        }
    }, []);

}

class Line {
    constructor(chain) {
        this.chain = chain;
    }
    toString = () => this.chain.join("; ");
}