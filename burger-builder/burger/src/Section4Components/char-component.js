import React from 'react';

const CharComponent = (props) => {
    const style = {
        "display": "inline-block",
        "textAlign": "center",
        "margin": "16px",
        "border": "1px solid black",
    }
    return (
        <div style={style} onClick={props.handleClick}>{props.letter}</div>
    );
}

export default CharComponent;