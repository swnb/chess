export default (arr, arrP, sig, index, win_count) => {
    let r_arr = [];
    arrP.forEach((e, iP) => {
        //空棋子就是false
        if (!arr[iP]) {
            return;
        }
        //对角线相同的话
        if (arrP[iP][0] - sig[0] === sig[1] - arrP[iP][1]) {
            //元素相同
            if (arr[index] === arr[iP]) {
                //返回行数目
                r_arr.push(e[0]);
            }
        }
    });
    //数组过小不判断;
    if (r_arr.length < win_count) {
        return false;
    }
    //排序
    // r_arr = r_arr.sort();
    let r_arr_flag = false;
    //判断存在递增数列里面最长的是否大于等于win_count
    function arr_split(arr) {
        for (let i = 0; i < arr.length - 1; i++) {
            if (arr[i] + 1 !== arr[i + 1]) {
                if (i + 1 >= win_count) {
                    r_arr_flag = true;
                    return;
                }
                return arr_split(arr.slice(i + 1));
            }
            if (i === arr.length - 2) {
                if (i + 2 >= win_count) {
                    r_arr_flag = true;
                    return;
                }
            }
        }
    }
    arr_split(r_arr);
    //当得到的数组是长度大于win_count的
    return r_arr_flag;
};
