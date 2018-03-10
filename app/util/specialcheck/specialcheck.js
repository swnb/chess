function special(arr, arrsize, winarr) {
    let arr_tmp = Array(arr.length).fill(null)
    winarr.forEach(winarr => {
        const index = parseInt(winarr[0]) * parseInt(arrsize) + parseInt(winarr[1])
        arr_tmp[index] = {
            value: arr[index],
            special: true
        }
    })
    return arr.map((e, i) => {
        if (arr_tmp[i]) {
            return arr_tmp[i]
        } else {
            return e
        }
    })
}


export default special