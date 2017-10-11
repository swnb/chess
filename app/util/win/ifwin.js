import c_win from 'util/win/c_win';
import r_c_left_win from 'util/win/r_c_left_win';
import r_c_right_win from 'util/win/r_c_right_win';
import r_win from 'util/win/r_win';

function win(arr, arrP, index, win_count) {
    //arr 是真实的棋盘元素对象,arrP是位子元素对象,一一对应[x,y],后面是下落棋子的位子,判断赢的数目
    // const sig = arrP[i];
    const arg = [arr, arrP, arrP[index], index, win_count];
    //行判断
    let flag = r_win(...arg);
    if (flag) {
        return true;
    }
    //列判断
    flag = c_win(...arg);
    if (flag) {
        return true;
    }
    //行列左判断
    flag = r_c_right_win(...arg);
    if (flag) {
        return true;
    }
    //行列右判断
    flag = r_c_left_win(...arg);
    if (flag) {
        return true;
    }
    return false;
}

export default win;
