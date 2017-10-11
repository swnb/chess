import React from 'react';

function Clickbutton(props) {
    return <button onClick={props.onClick}>{props.value}</button>;
}
export default Clickbutton;
