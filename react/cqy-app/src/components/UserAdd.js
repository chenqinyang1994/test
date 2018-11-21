import React from 'react';
export default class UserAdd extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        let localStr = localStorage.getItem('lists');
        let list = JSON.parse(localStr) || [];
        list.push({ id: Math.random(), name: this.name.value });
        localStorage.setItem('lists', JSON.stringify(list));
        this.props.history.push('/user/list')
    };
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name" className="control-label">
                            用户名:
                        </label>
                        <input type="text" className="form-control" ref={x => this.name = x} />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">添加</button>
                    </div>
                </form>
            </div>
        )
    }
}