import React from 'react';

function Clickbutton(props) {
    return (
        <button
            style={{
                backgroundColor: props.newPoint
                    ? 'rgb(14, 255, 219)'
                    : undefined
            }}
            onClick={props.onClick}
        >
            {props.value}
        </button>
    );
}
export default Clickbutton;
