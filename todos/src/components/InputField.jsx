import React from 'react'

class InputField extends React.Component {

    handleKeyDown(e) {
        const {addTodo} = this.props;
        if (e.keyCode === 13) {
            addTodo && addTodo(e.target.value);
        }
    }

    constructor(props, context) {
        super(props, context);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    render() {
        const {addTodo} = this.props;
        return (
            <div>
                新增待辦 &nbsp;
                <input type="text" onKeyDown={this.handleKeyDown}/>
            </div>
        );
    }
}

module.exports = InputField;
