const getRandomNumber = (n) => {

    let retNum = "";
    for (let i = 0; i < n; i++) {
        retNum += Math.floor(Math.random() * 10)
    }
    return retNum;

}

export  {getRandomNumber}