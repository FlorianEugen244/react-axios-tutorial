import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
//import { BrowserRouter as Link } from "react-router-dom";
import axios from 'axios';

class DataTable extends Component {
	
	constructor(props) {
        super(props)
		//alert('id='+this.props.match.params.id)
		this.onClickUserDelete = this.onClickUserDelete.bind(this);        

        this.state = {name: '',email: ''}
    }
	
	
    onClickUserDelete(e) {
        //this.setState({ email: e.target.value })
		//axios.delete('/pieces/delete' + this.props.obj._id);
		e.preventDefault();
		axios.delete('http://localhost:4000/users/delete/'+ this.props.obj._id)
            .then((res) => {
                console.log(res.data)
            }).catch((error) => {
                console.log(error)
            });
		window.location.reload(false);
    }
	
	/*
	const API_URL = 'https://yourserverurl';
	const DeleteButton = ({ id }) => (
	  <span
		className="delete-btn"
		role="button"
		tabIndex="0"
		onClick={() => axios.delete(`${API_URL}/pieces/${id}`)}
	  >
		Delete
	  </span>
	);
	*/
	
	render() {
        return (
            <tr>
                <td>
                    {this.props.obj._id}
                </td>
                <td>
                    {this.props.obj.name}
                </td>
                <td>
                    {this.props.obj.email}
                </td>
				<td>                    
					<Link className="nav-link" to={"/edit-user/"+this.props.obj._id}>Edit</Link>
                </td>
				<td>
                    <a href="/" onClick={this.onClickUserDelete}>delete</a>
                </td>
            </tr>
        );
    }
}

export default DataTable;