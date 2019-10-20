import React, { Component } from 'react';
import Aux from '../../../hoc/Aux';
import Backdrop from '../Backdrop/Backdrop';
import classes from './Modal.css';

class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    componentWillUpdate() {
        console.log("modal: will update");
    }

    render() {
        return (
            <Aux>
                <Backdrop show={this.props.show} onModalClosed={this.props.modalClosed}/>
                <div 
                    className={classes.Modal}
                    style={
                        this.props.show ? { display: 'block' } : { display: 'none' }
                    }
                    >
                        {this.props.children}
                </div>
            </Aux>
        )
    }
}

export default Modal;