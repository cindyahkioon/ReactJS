import React , { Component } from 'react';

class ValidationComponent extends Component {
    render() {
        let text = "";

        if (this.props.textLength <= 5) {
            text = "Text is too short!!";
        } else if (this.props.textLength > 15) {
            text = "Text is too long!!";
        }

        return (
            <p>{text}</p>
        );
    }
}

export default ValidationComponent;