import React from "react";
import ReactDOM from 'react-dom';

class FileInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event) {
        event.preventDefault();
        console.log('====================================');
        console.dir(this.fileInput);
        console.log('====================================');
        alert(
            `Selected file - ${this.fileInput.files[0].name}`
        );
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Upload file:
            <input
                        type="file"
                        ref={input => {
                            this.fileInput = input;
                        }}

                    />

                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
        );
    }
}

ReactDOM.render(
    <FileInput />,
    document.getElementById('root')
);