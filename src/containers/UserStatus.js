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

        fetch('http://127.0.0.1:8000/api/auth/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'text/plain'
              },
            body: JSON.stringify({email: this.state.username, password: this.state.password})
          }).then(res => res.json()).then(json => {
                //console.log(json);
                if(json.access_token){
                    localStorage.setItem('access_token', json.access_token);
                    this.props.logIn(this.state.username);
                    this.props.history.push('/');
                }
          });

        /*setTimeout(()=>{
            console.log("hello");
            this.props.logIn(this.state.username);
        }, 1000);*/
    }

    render(){
        return (
            <div className="container">
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