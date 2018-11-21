import React from 'react';
export default class UserDetail extends React.Component {
    render() {
        console.log('====================================');
        console.log(this.props);
        console.log('====================================');
        let { id } = this.props.match.params;
        let { name } = JSON.parse(localStorage.getItem('lists')).find(item => item.id == id);
        return (
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>id号</th>
                        <th>标题</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{id}</td>
                        <td>{name}</td>
                    </tr>
                </tbody>
            </table>
        )
    }
}