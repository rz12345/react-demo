import React from 'react'
import { Link } from 'react-router'

class App extends React.Component {
    render() {
        return (
            <div id="wrap">
                <nav className="navbar navbar-default navbar-fixed-top">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                    data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <a className="navbar-brand" href="#">wPOS</a>
                        </div>
                        <div className="collapse navbar-collapse">
                            <ul className="nav navbar-nav">
                                <li><Link to='Today'>今日點單</Link></li>
                                <li><Link to='Order'>點單</Link></li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="center-container">
                    <div className="center-row">
                        <div className="container-fluid center-container">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

module.exports = App;
