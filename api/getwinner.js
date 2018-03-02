//this api use golang to run the subscribe of winner arr

// const checkSize = 3
// const winCount = 3
// const index = 4

// let json = {
//     arr: str,
//     checkSize,
//     winCount,
//     index,
// }

const {
    spawn
} = require('child_process')

const binpath = require('../config').path.bin

const path = require('path')

const getwinner = (arr, checkSize, index, winCount) => {
    const jsondata = {
        arr,
        checkSize,
        index,
        winCount,
    }
    const golang = spawn(path.join(binpath, 'getWinner'), [JSON.stringify(jsondata)])
    golang.on('close', () => {
        console.log('exit')
    })
    golang.stdout.on('data', (data) => {
        console.log(`data: ${data}`)
    })
    return golang
}