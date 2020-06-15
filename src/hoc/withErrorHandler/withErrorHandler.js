import React, { Component } from 'react'

import Modal from '../../Components/UI//Modal/Model'
import Aux from '../Auxilary/Auxiliary'

const withErrorHandler = (WrappedComponet, axios) => {
    return class extends Component {
        state = {
            error: null
        }
        componentWillMount() {
            this.reqInt = axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            });
            this.resInt = axios.interceptors.response.use(res => res, error => {
                this.setState({ error: error });
            });
        }
        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInt)
            axios.interceptors.response.eject(this.resInt)
        }
        errorConfirmedHandler = () => {
            this.setState({ error: null });
        }
        render() {
            return (
                <Aux>
                    <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponet {...this.props} />
                </Aux>
            )
        }
    }

}

export default withErrorHandler