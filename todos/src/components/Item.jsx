import React from 'react'

class Item extends React.Component {
    editTodo() {
        this.setState({
            editMode: !this.state.editMode
        });
    }

    submitUpdate() {
        const {todo, updateTodo} = this.props;
        updateTodo && updateTodo(todo.id, this.refs.title.value);

        // 切換出編輯模式
        this.editTodo();
    }

    constructor(props, context) {
        super(props, context);
        // const {title} = this.props.todo;
        this.state = {
            // title: title,
            editMode: false
        };
        this.editTodo = this.editTodo.bind(this);
        this.submitUpdate = this.submitUpdate.bind(this);
    }

    renderView() {
        const {todo, toggleTodo, deleteTodo} = this.props;
        return (
            <li>
                <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id)}/> {todo.title}
                &nbsp;
                <button type="button" onClick={this.editTodo}>編輯</button>
                &nbsp;
                <button type="button" onClick={() => deleteTodo(todo.id)}>刪除</button>
            </li>
        );
    }

    renderEdit() {
        const {todo, toggleTodo} = this.props;
        const {title} = this.state;
        return (
            <li>
                <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id)}/>
                &nbsp;
                <input type="text" defaultValue={todo.title} ref="title"/>
                &nbsp;
                <button type="button" onClick={this.submitUpdate}>完成</button>
            </li>
        );
    }

    render() {
        const {editMode} = this.state;
        return editMode !== true
            ? this.renderView()
            : this.renderEdit();
    }
}

module.exports = Item;
