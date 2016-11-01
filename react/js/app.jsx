/**
 * app.jsx
 * main entry point for our React application
 */
"use strict";

class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: ""};
    }

    handleChange(event) {
        this.setState({name: event.target.value});
        this.props.onCha(event.target.value);
    }

    render() {
        return(
            <form>
                <input type="text" className="form-control" value={this.state.name} onChange={event => this.handleChange(event)}/>
            </form>
        )
    }
}

class Hello extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <h2>Hello {this.props.title} {this.props.name}!</h2> // JSX Syntax: Looks like HTML
        );
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: ""};
    }
    handleNameChange(name) {
        this.setState({name: name});
    }
    
    render() {
        return(
            <div>
                <NameForm onCha={name => this.handleNameChange(name)}></NameForm>
                <Hello name={this.state.name}></Hello>
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById("app"));
