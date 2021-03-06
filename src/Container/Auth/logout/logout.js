import React, { Component } from 'react'
import * as Actions from '../../../store/actions/index'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class Logout extends Component {

    componentDidMount() {
        this.props.onLogout()
    }

    render() {
        return <Redirect to="/" />
    }
}
const mapDispathToProps = dispatch => {
    return {
        onLogout: () => dispatch(Actions.logout())
    }
}
export default connect(null, mapDispathToProps)(Logout)