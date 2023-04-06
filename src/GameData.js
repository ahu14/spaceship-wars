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
    enemyMargin: window.innerHeight > window.innerWidth ? 4.3 : 3.2,
    bulletMargin: window.innerHeight > window.innerWidth ? 4.25 : 2.7,
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