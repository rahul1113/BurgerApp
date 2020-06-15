import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'


export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientname: name
    }
}

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientname: name
    }
}

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENT,
        ingredients: ingredients
    }
}
export const fetchIngredientsFail = () => {
    return {
        type: actionTypes.FETCH_INGREDIENT_FAIL,
        
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get('https://react-my-burger-3c82d.firebaseio.com/ingredients.json')
            .then(response => {
                dispatch(setIngredients(response.data))
            }).catch(error => {
                    dispatch(fetchIngredientsFail())
            })
    }
}