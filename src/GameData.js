export let enemy = {
    id: 0,
    bulletId: 0
}

export let message = {
    mobile: 'Click < to move left, > to move right and click the screen to shoot', 
    laptop: 'Click A to move left, D to move right and space for shoot',
    lose: 'You Lose !',
    blank: ''
}


export let settings = {
    enemyMargin: window.innerWidth < 768 ? 4.3 : 2.45,
    bulletMargin: window.innerWidth < 768 ? 4.3 : 2.6,
    planeMargin: window.innerWidth < 768 ? 90 : 94,
    xPos: window.innerWidth < 768 ? 4.5 : 4.7
}

export let player = {
    score: 0
}


export let clickEvent = (plane, gameObj, event) => {
    let clicked = event.target.className;

    if (clicked.includes('btn')){
        clicked.includes('left') ? plane.move(65) : plane.move(68);
    }

    else{
        plane.move(32, gameObj);
    }
}

export let keyUp = (plane, gameObj, event) => {
    let code = event.keyCode;
    plane.move(code, gameObj);
}