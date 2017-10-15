import React from 'react';

function Clickbutton(props) {
    const click = e => {
        const ele = e.target;
        ele.style.backgroundColor = 'red';
        setTimeout(
            function(ele) {
                ele.style.backgroundColor = undefined;
            },
            1000,
            ele
        );
        props.onClick();
    };
    return <button onClick={props.onClick}>{props.value}</button>;
}
export default Clickbutton;
