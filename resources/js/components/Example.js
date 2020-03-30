import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import styled from "styled-components";
import Login from "./Login";
import Register from "./Register";
axios.defaults.withCredentials = true;

const Wrapper = styled.div`
    form {
        margin-top: 40px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        label {
            display: flex;
            flex-direction: column;
            input {
                margin-right: 20px;
            }
        }
    }
    .logout {
        margin-top: 50px;
    }
`;

function Example() {
    const [me, setMe] = useState("");
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        getMe();
    }, []);

    const getMe = async () => {
        try {
            setLoading(true);
            const me = await axios.get("/me");
            setMe(me.data);
        } catch (err) {
            console.log(err);
        }
        setLoading(false);
    };

    const logout = async () => {
        try {
            await axios.post("/logout");
            getMe();
        } catch (err) {
            console.log(err);
        }
    };

    if (isLoading) {
        return "loading...";
    }

    return (
        <Wrapper className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">
                            {me ? (
                                <div>
                                    {me.name} is logged in with this email:{" "}
                                    {me.email}
                                </div>
                            ) : (
                                "Register or log in"
                            )}{" "}
                        </div>
                        <div className="card-body">
                            {me ? (
                                <button className="logout" onClick={logout}>
                                    Logout
                                </button>
                            ) : (
                                <>
                                    <Login getMe={getMe} />
                                    <Register getMe={getMe} />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
}

export default Example;

if (document.getElementById("app")) {
    ReactDOM.render(<Example />, document.getElementById("app"));
}
