import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux';
import classes from './SideDrawer.css';

const SideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, props.show ? classes.Open : classes.Close];
    return (
        <Aux>
            <Backdrop show={props.show} onModalClosed={props.onClosed} />
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems/>
                </nav>
            </div>
        </Aux>
    );
}

export default SideDrawer;