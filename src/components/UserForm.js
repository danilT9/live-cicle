import { Component } from "react";
import style from "./UserForm.module.css";

export class UserForm extends Component {
    state = {
        username: "",
        email: "",
        phone: "",
        users: []
    };
    
    componentDidMount() {
        const savedDate = localStorage.getItem("user");
        if (savedDate) {
            this.setState(JSON.parse(savedDate));
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState !== this.state) {
            localStorage.setItem("user", JSON.stringify(this.state))
        }
    }

    handleChange = (e) => {
        this.setState(({
            [e.target.name]: e.target.value
        }))
    }

    clearData = () => {
        this.setState({
            username: "",
            email: "",
            phone: ""
        })
    }

    addUser = e => {
        e.preventDefault();
        const {username, email, phone} = this.state;

        if (!username || !email || !phone) {
            alert("не всi поля заповненi");
            return
        }

        const newUser = {
            username: this.state.username,
            email: this.state.email,
            phone: this.state.phone
        }
        this.setState(prevState => ({
            users: [...prevState.users, newUser],
            email: "",
            username: "",
            phone: ""
        }));
    }

    deleteUser = (username) => {
        const users = this.state.users.filter(user => user.username !== username)
        this.setState({
            users: users
        });
    }

    render() {
        return (
            <div>
                <h1>Форма введення користувача</h1>
                <form onSubmit={this.addUser}>
                    <label>
                        Ім'я користувача:
                        <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                    </label>
                    <br />
                    <label>
                        Email:
                        <input type="email" name="email" value={this.state.email} onChange={this.handleChange} />
                    </label>
                    <br />
                    <label>
                        Phone:
                        <input type="tel" name="phone" value={this.state.phone} onChange={this.handleChange} />
                    </label>
                    <button type="button" onClick={this.clearData} style={{background: "red"}}>очистити</button>
                    <button type="submit">Add user</button>
                </form>
                <div>
                    <h2>Введені дані:</h2>
                    {this.state.users.length === 0 ? (
                        <p>Users: 0</p>
                    ) : (
                        <ul>
                            {this.state.users.map((user, index) => (
                                <li key={index}>
                                    <p>Username: {user.username}</p>
                                    <p>Email: {user.email}</p>
                                    <p>Phone: {user.phone}</p>
                                    <button onClick={() => this.deleteUser(user.username)}>видалити</button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                
            </div>
        )
    }
}