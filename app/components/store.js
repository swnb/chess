import { createStore } from 'redux';

//将位置数组体检
function reducer(state = [], action) {
    let state_tmp = [...state];
    state_tmp = state_tmp.filter(e => e);
    state_tmp.push(action.arrP);
    return state_tmp;
}

export const store = createStore(reducer);

export function getAction(arrP) {
    return {
        type: 'POSITION',
        arrP
    };
}
