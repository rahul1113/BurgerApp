import React from 'react';
import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredieants/BurgerIngredient'

const burger = (props) => {

   
    let transformedIngredients = Object.entries(props.ingredients).flatMap(x =>
        Array(x[1]).fill(x[0])).map((y, j) => {
            return (<BurgerIngredient key={j} type={y} />)
        })
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top' />
            {transformedIngredients}
            <BurgerIngredient type='bread-bottom' />
        </div>
    )
}

export default burger;