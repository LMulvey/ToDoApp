import React, { Component } from "react";

class ToDoRow extends Component {
  render() {
    const { summary, complete } = this.props.todo;
    const index = this.props.index;
    const checkmarkState = complete ? "checked" : "";

    return (
      <div class="todo-row">
        {summary}
        <input
          class="todo-checkbox"
          type="checkbox"
          checked={checkmarkState}
          onChange={e => this.props.handleCompleted(e, index)}
        />
      </div>
    );
  }
}

class ToDoRowContainer extends Component {
  render() {
    const rows = [];

    this.props.todos.forEach((todo, i) => {
      rows.push(
        <ToDoRow
          todo={todo}
          index={i}
          key={i}
          handleCompleted={this.props.handleCompleted}
        />
      );
    });
    return <div class="todo-rows">{rows}</div>;
  }
}

class ToDoInput extends Component {
  render() {
    return (
      <div class="todoInputContainer">
        <input
          class="todoInput"
          value={this.props.value}
          name="todoInputField"
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}

class Button extends Component {
  render() {
    return (
      <button class="todoInputButton" onClick={this.props.onClick}>
        Yes
      </button>
    );
  }
}

const TODOS = JSON.parse(localStorage.getItem("toDoList")) || [
  { summary: "Do the dishes", complete: true },
  { summary: "Laundry!!", complete: false },
  { summary: "Feed the fishes", complete: true },
  { summary: "Bees? Bees!", complete: false }
];

class ToDo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toDoList: TODOS,
      toDoInput: ""
    };

    this._handleChange = this._handleChange.bind(this);
    this._handleClick = this._handleClick.bind(this);
    this._handleCompleted = this._handleCompleted.bind(this);
  }

  _handleChange(e) {
    this.setState({ toDoInput: e.target.value });
  }

  _handleClick() {
    this.setState(prev => {
      const todos = [
        ...prev.toDoList,
        { summary: this.state.toDoInput, complete: false }
      ];
      localStorage.setItem("toDoList", JSON.stringify(todos));
      return {
        toDoList: todos,
        toDoInput: ""
      };
    });
  }

  _handleCompleted(e, index) {
    let modify = this.state.toDoList;
    let completed = e.target.checked;
    modify[index].complete = completed;

    localStorage.setItem("toDoList", JSON.stringify(modify));
    this.setState({ toDoList: modify });
  }

  render() {
    return (
      <div class="todo-container">
        <ToDoInput onChange={this._handleChange} value={this.state.toDoInput} />
        <Button onClick={this._handleClick} />
        <ToDoRowContainer
          todos={this.state.toDoList}
          handleCompleted={this._handleCompleted}
        />
      </div>
    );
  }
}

export default ToDo;
