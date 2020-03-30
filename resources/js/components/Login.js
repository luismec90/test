import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const Wrapper = styled.div``;

const initialState = { email: "", password: "" };
function Login({ getMe }) {
    const [state, setState] = useState({ email: "", password: "" });
    const login = async () => {
        try {
            await axios.post("/login", {
                email: state.email,
                password: state.password
            });
            getMe();
        } catch (err) {
            console.log(err);
        }
    };

    const handleChange = event => {
        setState({ ...state, [event.target.name]: event.target.value });
    };

    const handleSubmit = event => {
        event.preventDefault();
        login();
        setState(initialState);
    };

    return (
        <Wrapper>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input
                        name="email"
                        type="text"
                        value={state.email}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Password:
                    <input
                        name="password"
                        type="password"
                        value={state.password}
                        onChange={handleChange}
                    />
                </label>
                <input type="submit" value="Login" />
            </form>
        </Wrapper>
    );
}

export default Login;
