import { Component } from "react";

export class Count extends Component {
    state = {
        count: 0,
    }

    componentDidMount() {
        console.log("компонент додали до DOM.");
    }
    componentDidUpdate(prevProps, prevState) {
        if (!prevState === this.state.count) {
            console.log("count змiнено.");
        }
        console.log("компонент оновився до DOM.");
        console.log(prevState);
        console.log(this.state)
    }
    componentWillUnmount() {
        console.log("компонент видалився");
    }

    incrementCounter = () => {
        this.setState((prevState) => ({
            count: prevState.count + 1
        }));
    }

    render() {
        return (
            <div>
                <p>Counter</p>
                <p>{this.state.count}</p>
                <button onClick={this.incrementCounter}>+</button>
            </div>
        )
    }
}