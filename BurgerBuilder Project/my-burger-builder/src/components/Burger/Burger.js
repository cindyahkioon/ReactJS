import React, { Component } from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.module.css';

const Burger = (props) => {
    // props.ingredients: ['bacon', 'salad', 'cheese']
    // props.ingredients[igKey] === props.ingredients['bacon'] aka number of //// bacon
    // [...Array(3)] creates an array with 3 'undefined' items [ , , ,]
    let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_, index) => {
            return <BurgerIngredient key={igKey + index} type={igKey} />;
        });
    })
    .reduce((arr, item) => {
        return arr.concat(item);
    }, []);

    if (transformedIngredients.length == 0)
        transformedIngredients = <p>Please add ingredients</p>

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default Burger;