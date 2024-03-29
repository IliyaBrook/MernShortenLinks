import React, {useContext, useEffect, useState} from "react"
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from "../context/auth.context";
import {useHistory} from "react-router-dom";

export const CreatePage = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    
    const {request} = useHttp()
    const [link, setLink] = useState('')
    
    useEffect(() => {
        window.M.updateTextFields()
    }, [])
    
    const pressHandler = async event => {
        if(event.key === 'Enter') {
            try {
                const data = await request('/api/link/generate', 'POST', {from: link}, {
                    Authorization: `Bearer ${auth.token}`
                })
                history.push(`detail/${data.link._id}`)
            }catch (e) {
            
            }
        }
    }
    
    return (
        <div className="row">
            <h1>Crate Page</h1>
            <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
                <label htmlFor="link">Enter link!</label>
                <input
                    placeholder="Type new link!"
                    id="link"
                    type="text"
                    value={link}
                    onChange={e => setLink(e.target.value)}
                    onKeyPress={pressHandler}
                />
            </div>
        </div>
    )
}