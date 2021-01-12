// ** create-user.component.js ** //

import React, { Component } from 'react';
import axios from 'axios';
//import { ai } from '../TelemetryService';



export default class EditUser extends Component {


   
   constructor(props) {
        super(props)
		//alert('id='+this.props.match.params.id)
        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangeUserEmail = this.onChangeUserEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {name: '',email: ''}
    }
	
	componentDidMount() {
        document.title = "Edit Page";
        axios.get('http://localhost:4000/users/edit/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    name: response.data.name,
                    email: response.data.email
                })
            });		
		
    }
	
	

    onChangeUserName(e) {
        this.setState({ name: e.target.value })
    }

    onChangeUserEmail(e) {
        this.setState({ email: e.target.value })
    }
	
	onSubmit(e) {
        e.preventDefault()

        const userObject = {
            name: this.state.name,
            email: this.state.email
        };
		
		console.log(JSON.stringify(userObject, null, 4));
		
        axios.put('http://localhost:4000/users/update/'+this.props.match.params.id, userObject)
            .then(response => {
                this.setState({
                    name: response.data.name,
                    email: response.data.email
                })
            });			
    }
	

	/*
    onSubmit(e) {
        e.preventDefault()

        const userObject = {
            name: this.state.name,
            email: this.state.email
        };

        axios.post('http://localhost:4000/users/update/'+this.props.match.params.id, userObject)
            .then((res) => {
                console.log(res.data)
            }).catch((error) => {
                console.log(error)
            });

        this.setState({ name: '', email: '' })
    }
	*/


    render() {
        return (
            <div className="wrapper">
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Edit User Name</label>
                        <input type="text" value={this.state.name} onChange={this.onChangeUserName} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Edit User Email</label>
                        <input type="text" value={this.state.email} onChange={this.onChangeUserEmail} className="form-control" />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Edit User" className="btn btn-success btn-block" />
                    </div>
                </form>
            </div>
        )
    }
}