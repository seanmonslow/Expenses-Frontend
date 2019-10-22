import React, { Component } from "react";
import { connect } from "react-redux";
import { AuthStatus } from '../actions';
import { apiCall } from '../constants';

class Home extends Component {

    constructor(props){
        super(props);
    }

    componentDidMount(){
        if(this.props.status === AuthStatus.LOGGED_IN){
            apiCall('/payitems', 'GET', {}).then(res => res.json()).then(json => {
                console.log(json);
            //this.props.logIn(this.state.username);
            });
        }
    }

    render(){
        return (
            <div>
                This is the home page without an authenticated user
            </div>
        );
    }

}

function mapStateToProps(state){
    return {
        status: state.auth_status,
        user: state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);