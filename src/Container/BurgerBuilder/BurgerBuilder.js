import React, { Component } from 'react';
import { connect } from 'react-redux'
import Aux from '../../hoc/Auxilary/Auxiliary'
import Burger from '../../Components/Burger/Burger'
import IngredientControl from '../../Components/Burger/IngredientControls/IngredientControls'
import Modal from '../../Components/UI/Modal/Model'
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../Components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/index'

class BurgerBuilder extends Component {

    state = {

        purchasing: false,

    }

    componentDidMount() {
        this.props.onInitIngredients()
    }
    updatePurchaseState(ingredients) {

        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey]
        }).reduce((sum, elm) => {
            return sum + elm
        }, 0)
        return sum > 0
    }

    OrderHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({ purchasing: true });
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }
    OrderClosedHandler = () => {
        this.setState({ purchasing: false })
    }
    OrderContinue = () => {
        //alert('You Continue!')
        this.props.onInitPurchse()
        this.props.history.push('/checkout')

    }
    render() {
        const disableInfo = { ...this.props.ing }
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }
        let orderSummary = null

        //meat:true salad:false

        let burger = this.props.error ? <p>ingredients can not be added</p> : <Spinner />
        if (this.props.ing) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ing} />
                    <IngredientControl ingredientadded={this.props.onIngredientAdded}
                        removingIngredient={this.props.onIngredientRemoved}
                        disabled={disableInfo}
                        purchasable={this.updatePurchaseState(this.props.ing)}
                        ordered={this.OrderHandler}
                        isAuth={this.props.isAuthenticated}
                        price={this.props.price} />
                </Aux>
            )
            orderSummary = <OrderSummary
                purchaseCancelled={this.OrderClosedHandler}
                price={this.props.price}
                purchaseContinue={this.OrderContinue}
                ingredients={this.props.ing} />
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.OrderClosedHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ing: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchse: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))