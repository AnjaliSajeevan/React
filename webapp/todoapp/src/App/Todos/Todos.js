import React, { useState } from 'react';
import './Todos.scss';


export class Todos extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            todoItem: {}
        }
    }

    // to handle viewing a todo list
    handleView = (id) => {
        console.log(id)
        var toJson = (response) => response.json()
        fetch('config/config.json').then(toJson)
            .then((config) => {
                fetch(config.todo_api_url + `/${id}`).then(toJson)
                    .then((todoItem) => {
                        this.setState({ todoItem });
                    });
            });

    }

    // to handle deleting a todo item
    handlerDelete(id) {
        console.log("for delete " + id)
        fetch(`http://localhost:3002/todo/${id}`, {
            method: "DELETE",
        }).then(() => this.props.reload())
    };

    // to handle updating a todo item
    handleUpdate(id) {
        // validating the update input
        if ((this.title.value === "")) {
            alert("Please enter the new title!")
        } else {
            console.log("inside update" + id)
            fetch(`http://localhost:3002/todo/${id}`, {
                method: 'put',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "title": this.title.value,
                })
            }).then(() => this.props.reload())
            console.log("Success")
        }
    };

    // to handle completing a todo list
    handlerCompleted(id) {
        console.log("inside completed" + id)
        fetch(`http://localhost:3002/todo/${id}`, {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "check": true,
            })
            // the props.reload keeps calling the get method to refresh
        }).then(() => this.props.reload())
        console.log("Success")
    };




    render() {
        const todoElements = this.props.todos
            // checks if check is true or false. if true will take class name as strikethrough else list
            .map((c, i) => <li className={c.check ? 'strikeThrough' : 'list'} key={i}>{c.title} <button className="button" onClick={() => { this.handleView(c._id) }}><i className="fas fa-book-open"></i></button><button className="button" onClick={() => { this.handlerCompleted(c._id) }}><i className="fas fa-check"></i></button><button className="button" onClick={() => { this.handlerDelete(c._id) }}><i className="fas fa-trash-alt"></i></button></li>);
        console.log(todoElements);
        return (
            <div>
                <div className="todo-container">
                    <ul className="todo-list">{todoElements} </ul>
                </div>
                <div className="viewContainer">
                    <pre><span className="result">Title:</span>  {this.state.todoItem.title}    <span className="result">Description:</span> {this.state.todoItem.description}    <span className="result">Due Date:</span> {this.state.todoItem.dueDate}   <span className="result">Time:</span>{this.state.todoItem.time}  </pre>
                    <input type="text" placeholder="enter new title" required ref={(ref) => { this.title = ref }} />
                    <button className="button" onClick={() => { this.handleUpdate(this.state.todoItem._id) }}>Update</button>
                </div>
            </div>
        );
    }
}