export let gameObj = [];

export let updateData = () => {
    gameObj = gameObj.filter(data => data.dead == false);
    return gameObj;
}

export let filterData = (type) => {
    return gameObj.filter(data => data.type == type && data.dead == false);
}

export let filterAll = (type) => {
    return gameObj.filter(data => data.type.includes(type) && data.dead == false);
}