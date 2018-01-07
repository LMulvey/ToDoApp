import React, { Component } from 'react';
import './App.css';


class ToDoRow extends Component {
  render() {
    const todo = this.props.todo;
    const checkmarkState = todo.complete ? 'checked' : '';
    
    return(
      <div>
        <p>
          {todo.summary}
        </p>
        <fieldset>
          <input 
            class="todo-checkbox"
            type="checkbox"
            checked={checkmarkState}  />
        </fieldset>
      </div>
    );
  }
}

class ToDoRowContainer extends Component {
  render() {
    const rows = [];

    this.props.todos.forEach(todo => {
      rows.push(
        <ToDoRow 
          todo={todo}
          key={todo.summary} />
      );
    });
    return (
      <div class="todo-row"> 
        {rows}
      </div>
    );
  }
}

class ToDoContainer extends Component {
  render() {
    return(
      <div class="todo-container">
        <ToDoRowContainer
          todos={this.props.data} />
      </div>
    );
  }
}

const TODOS = [
  {summary: 'Do the dishes', complete: true},
  {summary: 'Laundry!!', complete: false},
  {summary: 'Feed the fishes', complete: true},
  {summary: 'Bees? Bees!', complete: false}
];

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">To Do</h1>
        </header>
        <ToDoContainer data={TODOS} />
      </div>
    );
  }
}

export default App;
