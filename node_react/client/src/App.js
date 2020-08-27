import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      username: '',
      pass: '',
      users: [],
  };
}
 


  componentDidMount() {
    //fetch('/api/hello')
    //.then(response => response.json())
    //.then(users => this.setState({users: users.data}))
    //.catch(err => console.error(err))

    this.getClients()

  }


  
  getClients = _ => {
    const {member} = this.state;
    fetch(`http://localhost:5000/getusers`)
    .then(response => response.json())
    .then(response => this.setState({users: response.data}))
    .catch(err => console.error(err))
  }


  createNewUser = _ =>{
    const {username, pass} = this.state
    fetch(`http://localhost:5000/addUser?username=${username}&pass=${pass}`) 
    alert('User successfully added!');
    this.getClients()
  }

  usernameHandler = (event) => {
    this.setState({username: event.target.value});
  }
  passwordHandler = (event) => {
    this.setState({pass: event.target.value});
  }



render_ = ({id, username, pass}) => { return <li key={id}>{username} pass ={pass}</li>}

  render() {
    const {users} = this.state;
    return (
      <div className="App">
        <h2>Call out to API!</h2>
        <ul>
    {users.map(this.render_)}
        </ul>

        <input
        type='text'
        onChange={this.usernameHandler}
      />
        <input
        ref="password"
        onChange={this.passwordHandler}
        />

        <button onClick={this.createNewUser}>Add User</button>

        <p>{this.state.username}</p>
      </div>
    );
  }
}

export default App;