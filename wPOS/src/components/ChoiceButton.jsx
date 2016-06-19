import React from 'react'

class ChoiceButton extends React.Component {
    render() {
        const {type, onClick, isSelected} = this.props;
        const classAttr = "btn btn-lg btn-block " + (isSelected
            ? "btn-primary"
            : "btn-default");
        return (
            <button type="button" className={classAttr} onClick={onClick}>{type}</button>
        );
    }
}
ChoiceButton.defaultProps = {
    isSelected: false
};
ChoiceButton.propTypes = {
    isSelected: React.PropTypes.bool.isRequired
};

module.exports = ChoiceButton;
