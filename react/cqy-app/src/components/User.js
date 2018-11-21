import React from 'react';
import { Route, Link } from 'react-router-dom'
import UserList from './UserList'
import UserAdd from './UserAdd'
import UserDetail from './UserDetail'
export default class User extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-2">
                    <div className="nav nav-stacked">
                        <li><Link to='/user/list'>用户列表</Link></li>
                        <li><Link to='/user/add'>增加用户</Link></li>
                    </div>
                </div>
                <div className="col-md-10">
                    <Route path="/user/list" component={UserList} />
                    <Route path="/user/add" component={UserAdd} />
                    <Route path='/user/detail/:id' component={UserDetail} />
                </div>
            </div>
        )
    }
}