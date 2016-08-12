import React from 'react'

const Header = require('./Header.jsx');
const InputField = require('./InputField.jsx');
const List = require('./List.jsx');

const _addTodo = (todos, title) => {
    todos.push({
        id: todos.length > 0
            ? todos[todos.length - 1].id + 1
            : 0,
        title,
        completed: false
    });
    return todos;
};

const _updateTodo = (todos, id, title) => {
    const target = todos.find((todo) => todo.id === id);
    if (target)
        target.title = title;
    return todos;
};

const _toggleTodo = (todos, id) => {
    const target = todos.find((todo) => todo.id === id);
    if (target)
        target.completed = !target.completed;
    return todos;
};

const _deleteTodo = (todos, id) => {
    const target = todos.find((todo) => todo.id === id);
    if (target)
        todos = todos.filter((todo) => todo.id !== id);
    return todos;
};

class App extends React.Component {

    updateTodosBy(fn) {
        return (...args) => {
            this.setState({
                todos: fn(this.state.todos, ...args)
            });
        };
    }

    constructor(props, context) {
        super(props, context);
        this.state = {
            todos: []
        };
    }

    componentDidMount() {
        // get todos
        fetch('todos.json', {method: 'GET'}).then((response) => response.json()).then((todos) => {
            this.setState({todos: todos})
        });
    }

    render() {
        const {todos} = this.state;
        const {user} = this.props;
        const props = {
            InputField: {
                addTodo: this.updateTodosBy(_addTodo)
            },
            Header: {
                user: user,
                count: todos.filter((todo) => todo.completed === false).length // 篩出未完成數量
            },
            List: {
                todos: todos,
                toggleTodo: this.updateTodosBy(_toggleTodo),
                deleteTodo: this.updateTodosBy(_deleteTodo),
                updateTodo: this.updateTodosBy(_updateTodo)
            }
        };
        return (
            <div>
                <h1>TodoApp</h1>
                <hr/>
                <Header {...props.Header}/>
                <InputField {...props.InputField}/>
                <List {...props.List}/>
            </div>
        );
    }
}
App.propTypes = {
    user: React.PropTypes.string
};
App.defaultProps = {
    user: 'ChuChuZ'
};

module.exports = App;
