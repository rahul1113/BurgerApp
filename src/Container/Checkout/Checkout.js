import React, { Component } from 'react'
import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary'
import { Route, Redirect } from 'react-router-dom'
import ContactData from '../Checkout/ContactData/ContactData'
import { connect } from 'react-redux'


class Checkout extends Component {
    checkoutCancelledOrder = () => {
        this.props.history.goBack()
    }
    checkoutContinuedOrder = () => {
        this.props.history.replace('/checkout/contact-data')
    }
    componentWillMount() {

    }
    render() {
        let summary = <Redirect to="/" />
        if (this.props.ing) {
          
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary checkoutCancelledOrder={this.checkoutCancelledOrder}
                        checkoutContinuedOrder={this.checkoutContinuedOrder}
                        ingredients={this.props.ing} />
                    <Route path={this.props.match.path + '/contact-data'}
                        component={ContactData} />
                </div>
            )
        }
        return summary
    }
}

const mapStateToProps = (state) => {
    return {
        ing: state.burgerBuilder.ingredients,
        purchased: state.order.purchased

    }
}

export default connect(mapStateToProps)(Checkout)