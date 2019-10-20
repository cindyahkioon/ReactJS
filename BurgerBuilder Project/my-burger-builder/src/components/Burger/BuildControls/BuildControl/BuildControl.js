import React from 'react';

import classes from './BuildControl.css';

const buildControl = (props) => (
    <div>
        <div className={classes.BuildControl}>
        <label className={classes.Label}>{props.label}</label>
        <button 
            className={classes.Less} 
            onClick={props.onIngredientRemoved}>Less</button>
        <button 
            className={classes.More}
            onClick={props.onIngredientAdded}>More</button>
        </div>
    </div>
);

export default buildControl;