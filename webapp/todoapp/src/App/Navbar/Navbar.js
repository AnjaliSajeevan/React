import React, { useState } from 'react';
import './Navbar.scss';

export class Navbar extends React.Component {
    constructor(props) {
        super(props);

        this.onToggle = this.onToggle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            isVisible: false,
        };

    }
    // to add toggle for the add button
    onToggle(e) {
        this.setState({ isVisible: !this.state.isVisible });
    }

    // to handle the adding a todo task event
    handleSubmit(event) {
        event.preventDefault();
        // validating the form inputs
        if ((this.title.value === "") || (this.description.value === "") || (this.dueDate.value === "") || (this.time.value === "")) {
            alert("All input required")
        } else {
            fetch('http://localhost:3002/todo', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "title": this.title.value,
                    "description": this.description.value,
                    "dueDate": this.dueDate.value,
                    "time": this.time.value
                })
            })
                .then(() => this.props.reload())
        }
    }

    render() {
        return (
            <nav>
                <h1>TodoList</h1>
                <button className="button1" onClick={this.onToggle}><i className="fa-solid fa-plus"></i> </button>
                {this.state.isVisible &&
                    <div className="addsection">
                        <br />
                        <form>
                            Title:
                            <input type="text" id="title" name="title" ref={(ref) => { this.title = ref }} required />
                            Description:
                            <input type="text" id="description" name="description" ref={(ref) => { this.description = ref }} required />
                            Date:
                            <input type="date" id="date" name="date" ref={(ref) => { this.dueDate = ref }} required />
                            Time:
                            <input type="time" id="time" name="time" ref={(ref) => { this.time = ref }} required />
                            <button type="submit" className="button2" id="addtask" onClick={this.handleSubmit}> Add</button>
                        </form>
                    </div>
                }
            </nav>

        )
    }
}