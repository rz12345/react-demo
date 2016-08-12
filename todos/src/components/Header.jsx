import React from 'react'

class Header extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
      const {user,count} = this.props;
        return (
            <div>
                <h1>Hi {user}, 您有 {count} 未完成待辦事項</h1>
            </div>
        );
    }
}

module.exports = Header;
