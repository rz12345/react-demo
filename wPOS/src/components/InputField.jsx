import React from 'react'

class InputField extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {value: props.value || ''};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const {onUpdateAddition} = this.props;
        // 更新元件的 state value
        this.setState({value: e.target.value});

        // 一併更新父層的 addition
        if (onUpdateAddition) {
            onUpdateAddition(e.target.value);
        }
    }

    render() {
        return (
            <input
                className="form-control"
                {...this.props}
                value={this.state.value}
                onChange={this.handleChange}
                />
        );
    }
}

module.exports = InputField;
