import React, { Component } from 'react';

class UserInput extends Component {
    render() {
        return (
            <input type="text" placeholder="Input a username" onChange={this.props.onChange} value={this.props.username} />
        );
    }
}

export default UserInput;