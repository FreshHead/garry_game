export let colors, isAllSame, getPosClass, replacePosClass, getCor, isNear, getColor, isNotMatched, getRandomInt,
    destroy;

getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));
colors = new RegExp(/gold|silver|violet/);
isAllSame = (arr) => arr.every((word, idx, arr, nextWord = arr[idx + 1]) => !nextWord || word === nextWord);
getPosClass = elem => elem.className.match(/\bpos_\w*\b/)[0];
replacePosClass = (elem, newPosClass) => elem.className = elem.className.replace(/\bpos_\w*\b/g, newPosClass);
getCor = className => {
    return {x: Number(className.match(/x(\d)/)[1]), y: Number(className.match(/y(\d)/)[1])};
}
isNear = (pos1, pos2) => Math.abs(pos1.x - pos2.x) <= 1 && Math.abs(pos1.y - pos2.y) <= 1
getColor = (x, y) => {
    let tile = $(`.pos_x${x}_y${y}`)[0];
    if(tile){
        return tile.className.match(colors)[0];
    } else {
        return "black";
    }
}
isNotMatched = (x, y) => !$(`.pos_x${x}_y${y}`)[0].className.includes("matched");
getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));


export class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
