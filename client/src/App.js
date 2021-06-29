import React from "react"
import 'materialize-css'
import './index.css'
import {BrowserRouter as Router} from "react-router-dom"
import {AuthContext} from "./context/auth.context"
import {useAuth} from "./hooks/auth.hook"
import {useRoutes} from "./routes"
import {NavBar} from "./components/navBar"
import Loader from "./components/Loader"

function App() {
    const {token, userId, login, logout, ready} = useAuth()
    const isAuthenticated = !!token
    const routes = useRoutes(isAuthenticated)
    if (!ready) {
        return <Loader/>
    }
    return (
        <AuthContext.Provider value={{
            token, login, logout, userId, isAuthenticated
        }}>
            <Router>
                { isAuthenticated && <NavBar/> }
                <div className="container">
                    {routes}
                </div>
            </Router>
        </AuthContext.Provider>
    )
}

export default App;
