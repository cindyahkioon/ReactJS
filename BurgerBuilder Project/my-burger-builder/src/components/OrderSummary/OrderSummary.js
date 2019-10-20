import React from 'react';
import Aux from '../../hoc/Aux';
import Button from '../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.entries(props.ingredients).map(([name, value]) => {
        return <li key={name}>{`${name}: ${value}`}</li>
    });
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to order?</p>
            <Button btnType="Danger" clicked={props.onPurchaseCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.onPurchaseContinued}>ORDER</Button>
        </Aux>
    );
};

export default orderSummary;