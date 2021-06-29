import React, {useContext} from "react"
import {NavLink, useHistory} from 'react-router-dom'
import {AuthContext} from "../context/auth.context"
import './components.css'


export const NavBar = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)

    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        history.push('/')
    }
    return (
        <nav>
            <div className="nav-wrapper blue darken-1 nav-bar-wrapper">
                <span className="brand-logo">link shortening</span>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li>
                        <NavLink to="/create">Create</NavLink>
                    </li>

                    <li>
                        <NavLink to="/links">Links</NavLink>
                    </li>

                    <li>
                        <a href="/" onClick={logoutHandler}>Exit</a>
                    </li>

                </ul>
            </div>
        </nav>
    )
}