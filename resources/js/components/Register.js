import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const Wrapper = styled.div``;

const initialState = {
    name: "",
    email: "",
    password: "",
    passwordConfirmation: ""
};

function Register({ getMe }) {
    const [state, setState] = useState(initialState);
    const register = async () => {
        try {
            await axios.post("/register", {
                name: state.name,
                email: state.email,
                password: state.password,
                password_confirmation: state.passwordConfirmation
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
        register();
        setState(initialState);
    };

    return (
        <Wrapper>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        name="name"
                        type="text"
                        value={state.name}
                        onChange={handleChange}
                    />
                </label>
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
                <label>
                    Confirm Password:
                    <input
                        name="passwordConfirmation"
                        type="password"
                        value={state.passwordConfirmation}
                        onChange={handleChange}
                    />
                </label>
                <input type="submit" value="Register" />
            </form>
        </Wrapper>
    );
}

export default Register;
