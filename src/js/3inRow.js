let find3inARow = () => {
    for(let y = 0; y < 5; y++){
        for(let x = 0; x < 3; x++){
            if((getColor(x, y) + getColor(x+1, y) + getColor(x+2, y)).match(/(silver|gold|violet)\1\1/)){
                if(isNotMatched(x, y) || isNotMatched(x+1, y) || isNotMatched(x+2, y)){
                    $(`.pos_x${x}_y${y}`).addClass("matched");
                    $(`.pos_x${x+1}_y${y}`).addClass("matched");
                    $(`.pos_x${x+2}_y${y}`).addClass("matched");
                    return {x: x, y:y};
                }
            }
        }
    }
    return false;
}