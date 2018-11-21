import React from 'react';
import { Link } from 'react-router-dom';
export default class App extends React.Component {
    render() {
        return (
            <div>
                <div className="navbar-inverse navbar">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <div className="navbar-brand">
                                用户管理系统
                            </div>
                        </div>
                        <ul className="navbar-nav nav">
                            <li>
                                <Link to={'/home'}>首页</Link>
                            </li>
                            <li>
                                <Link to={'/user'}>用户管理</Link>
                            </li>
                            <li>
                                <Link to={'/profile'}>个人中心</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}