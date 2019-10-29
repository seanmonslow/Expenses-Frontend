import React, { Component } from "react";
import { connect } from "react-redux";
import { AuthStatus } from '../actions';
import { apiCall } from '../constants';

class Home extends Component {

    constructor(props){
        super(props);
        this.state = {expenses: [], showForm: false, amount: '', date: '', type: ''};
        this.changeFormShow = this.changeFormShow.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleAmountChange = this.handleAmountChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    componentDidMount(){
        if(this.props.status === AuthStatus.LOGGED_IN){
            apiCall('/payitems', 'GET', {}).then(res => res.json()).then(json => {
                console.log(json);
                this.setState({
                    expenses: json.data
                })
            //this.props.logIn(this.state.username);
            });
        }
    }

    changeFormShow(){
        this.setState({showForm: !this.state.showForm});
    }

    handleTypeChange(event){
        this.setState({type: event.target.value});
    }

    handleAmountChange(event){
        this.setState({amount: event.target.value});
    }

    handleDateChange(event){
        this.setState({date: event.target.value});
    }

    handleSubmit(event){
        event.preventDefault();
        apiCall('/payitem', 'POST', {type: this.state.type, amount: this.state.amount, date:this.state.date}).then(res => res.json()).then(json => {
            console.log(json);
        //this.props.logIn(this.state.username);
        });
    }

    render(){
        const expenses = this.state.expenses.map((element)=>
            <tr key={element.id}>
                <td>{element.id}</td>
                <td>£{element.amount}</td>
                <td>{element.type}</td>
                <td>{element.payment_date}</td>
            </tr>
        );
        let form = null;
        if(this.state.showForm){
            form = 
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="type">Type</label>
                    <select className="form-control" id="type" value={this.state.type} onChange={this.handleTypeChange}>
                        <option value = "outbound">Outbound</option>
                        <option value = "inbound">Inbound</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="amount">Amount</label>
                    <input type="number" className="form-control" id="amount" name="amount" value={this.state.amount} onChange={this.handleAmountChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input type="date" className="form-control" id="date" name="date" value={this.state.date} onChange={this.handleDateChange}/>
                </div>
                <input type="submit" value="Submit" />
            </form>;
        } else {
            form = <h1>Form not showing!</h1>;
        }
        if (this.props.status === AuthStatus.LOGGED_IN){
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-header">
                                    Expenses
                                </div>
                                <table className="table">
                                    <thead>
                                        <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Amount</th>
                                        <th scope="col">Type</th>
                                        <th scope="col">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {expenses}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-header">
                                    <button onClick={this.changeFormShow}>
                                    Add Expense
                                    </button>
                                </div>
                                {form}
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="container">
                    {this.props.status}
                    <br></br>This is the home page without an authenticated user
                </div>
            );
        }
    }

}

function mapStateToProps(state){
    return {
        status: state.auth_status,
        user: state.username
    }
}

function mapDispatchToProps(dispatch) {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);