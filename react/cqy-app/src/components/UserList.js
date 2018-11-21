import React from 'react';
import { Link } from 'react-router-dom'
export default class UserList extends React.Component {
    constructor() {
        super();
        this.state = {}
    }
    componentWillMount() {
        let userList = JSON.parse(localStorage.getItem('lists')) || [];
        this.setState({
            userList
        })
    }
    render() {
        return (
            <div>
                <ul className="list-group">
                    {this.state.userList.map((user, index) => (
                        <li className="list-group-item" key={index}>
                            <Link to={"/user/detail/" + user.id}>{user.name}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}