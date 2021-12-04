
import React from 'react'
import './App.scss';
import {Navbar} from './Navbar/Navbar';
import {Todos} from './Todos/Todos';

export class App extends React.Component{

constructor(props){
  super(props);
  this.state = {
  todos:[]
};
}

// to get all the items from the database
componentDidMount=()=>{
  var toJson = (response) => response.json()
  fetch('config/config.json').then(toJson)
  .then((config)=>{
    fetch(config.todo_api_url).then(toJson)
    .then((todos)=>{
      this.setState({todos});
    });
  });
}



  render(){
    return(
      <div>
        <Navbar reload={this.componentDidMount} todos={this.state.todos}></Navbar>
        <Todos reload={this.componentDidMount}  todos={this.state.todos}></Todos>
      </div>
    )
  }
}
