import React, {useContext, useEffect, useState} from "react"
import './pages.css'
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/auth.context";

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, error, request, clearError} = useHttp()
    const [form, setForm] = useState({
        email: '', password: ''
    })


    useEffect(() => {
        message(error)
        return () => clearError()
    }, [clearError, error, message])

    useEffect(() => {
        window.M.updateTextFields()
    },[])

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }
    const registerHandler = async () => {
        try {
            const data = await request('api/auth/register', 'POST', {...form})
            if (data) {
                return window.M.toast({html: data.message})
            }
        } catch (e) {
        }
    }

    const loginHandler = async () => {
        try {
            const data = await request('api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)
        } catch (e) {
        }
    }
    
    const logInPressEnterHandler = ( event ) => {
        if (event.key === 'Enter') {
            return loginHandler()
        }
    }


    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1 className="flow-text">shorten the link</h1>

                <div className="card blue darken-1">
                    <div className="card-content white-text card-wrapper">
                        <span className="card-title">Authorization</span>
                        <div>

                            <div className="input-field">
                                <input
                                    onChange={changeHandler}
                                    placeholder="Enter email"
                                    id="email"
                                    type="text"
                                    className="validate"
                                    name="email"
                                    value={form.email}
                                />
                                <label htmlFor="email">Email</label>
                            </div>

                            <div className="input-field">
                                <input
                                    onChange={changeHandler}
                                    placeholder="Enter password"
                                    id="password"
                                    type="text"
                                    className="validate"
                                    name="password"
                                    value={form.password}
                                    onKeyPress={logInPressEnterHandler}
                                />
                                <label htmlFor="password">Password</label>
                            </div>

                        </div>

                        <div className="card-action card-action-wrapper">
                            <button
                                className="btn yellow darken-4 pages-auth-btn"
                                disabled={loading}
                                onClick={loginHandler}
                            >
                                Login
                            </button>
                            <button
                                className="btn grey lighten-1 black-text"
                                onClick={registerHandler}
                                disabled={loading}
                            >
                                Registration
                            </button>

                        </div>
                    </div>
                    <div className="card-action">

                    </div>
                </div>

            </div>
        </div>
    )
}