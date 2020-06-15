import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'


const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    builder: false
}


const INGREDIENTS = {
    salad: 1,
    cheese: 2,
    paneer: 5,
    bacon: 3
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            const updatedIngredient = { [action.ingredientname]: state.ingredients[action.ingredientname] + 1 }
            const updatedIngredients = updateObject(state.ingredients, updatedIngredient)
            const updatedState = {
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice + INGREDIENTS[action.ingredientname],
                builder: true
            }
            return updateObject(state, updatedState)
        case actionTypes.REMOVE_INGREDIENT:
            const updatedIng = { [action.ingredientname]: state.ingredients[action.ingredientname] - 1 }
            const updatedIngs = updateObject(state.ingredients, updatedIng)
            const updatedSt = {
                ingredients: updatedIngs,
                totalPrice: state.totalPrice + INGREDIENTS[action.ingredientname],
                builder: true
            }
            return updateObject(state, updatedSt)
        case actionTypes.SET_INGREDIENT:
            return updateObject(state, {
                ...state,
                ingredients: action.ingredients,
                totalPrice: 4,
                error: false,
                builder: false
            })

        case actionTypes.FETCH_INGREDIENT_FAIL:
            return updateObject(state, {
                ...state,
                error: true

            })

        default:
            return state
    }
}

export default reducer