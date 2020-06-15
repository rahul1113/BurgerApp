import React from 'react';
import classes from './IngredientControl.css'

const ingredientControl = (props) => (
    <div className={classes.IngredientControl}>
        <div className={classes.label}>{props.label}</div>
        <button className={classes.Less} onClick={props.remove} disabled={props.disabled}>Less</button>
        <button className={classes.More} onClick={props.added}>More </button>
    </div>
)

export default ingredientControl