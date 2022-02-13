import { Position } from "./utils.js";

export let findLine;

const ranges = function () {
    const ranges = [];
    for (let x = 0; x < 5; x++) {
        let range = [];
        for (let y = 0; y < 5; y++) {
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
    return ranges;
}();

findLine = () => {
    const lines = ranges.reduce(function (acc, item) {
        const chain = findChainInRange(item);
        if (chain.length > 2) {
            acc.push(new Line(chain));
            return acc;
        } else {
            return acc;
        }
    }, []);
    console.log(lines);

    return lines;
};

function findChainInRange(axisArray) {
    return axisArray.reduce(function (acc, item) {
        if (acc.length === 0 || acc[0].getColor() === item.getColor()) {
            acc.push(item);
            return acc;
        } else {
            return acc.length > 2 ? acc : [item];
        }
    }, []);

}

class Line {
    constructor(chain) {
        this.chain = chain;
    }
    toString = () => this.chain.join("; ");
}