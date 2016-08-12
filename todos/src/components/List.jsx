import React from 'react'

const Item = require('./Item.jsx');

class List extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {todos,toggleTodo,deleteTodo,updateTodo} = this.props;
        return (
            <div>
                <ul>
                    {todos.map((todo) => (<Item key={todo.id} todo={todo} toggleTodo={toggleTodo} deleteTodo={deleteTodo} updateTodo={updateTodo}/>))}
                </ul>
            </div>
        );
    }}

module.exports = List;
