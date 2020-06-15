import React from 'react'
import classes from './IngredientControls.css'
import IngredientControl from '../IngredientControls/IngredientControl/IngredientControl'

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Paneer', type: 'paneer' }
]

const ingredientControls = (props) => (
    <div className={classes.IngredientControls}>
        <p>The Total Price is : <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctr => {
            return <IngredientControl
                key={ctr.label}
                label={ctr.label}
                added={() => props.ingredientadded(ctr.type)}
                remove={() => props.removingIngredient(ctr.type)}
                disabled={props.disabled[ctr.type]} />
        })}
        <button className={classes.OrderButton} disabled={!props.purchasable} onClick={props.ordered}>{props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}</button>

    </div>
)

export default ingredientControls
