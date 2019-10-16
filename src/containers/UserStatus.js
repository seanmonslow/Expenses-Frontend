import React, { Component } from "react";
import { connect } from "react-redux";
import { logIn } from "../actions";

class UserStatus extends Component {

    constructor(props){
        super(props);
        this.state = {username: '', password: ''};
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handlePassChange = this.handlePassChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUserChange(event){
        this.setState({username: event.target.value});
    }

    handlePassChange(event){
        this.setState({password: event.target.value});
    }

    handleSubmit(event){
        event.preventDefault();
        setTimeout(()=>{
            console.log("hello");
            this.props.logIn(this.state.username);
        }, 1000);
    }

    render(){
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                    Username:
                    <input type="text" value={this.state.username} onChange={this.handleUserChange} />
                    </label>
                    <label>
                    Password:
                    <input type="text" value={this.state.password} onChange={this.handlePassChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
                <h1>{this.props.status}</h1>
                <h1>{this.props.user}</h1>
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
    return {
        logIn: (user) => {
            dispatch(logIn(user));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserStatus);