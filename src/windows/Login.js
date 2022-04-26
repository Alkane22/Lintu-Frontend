import React from 'react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import loginService from '../services/loginService'

import { updateNotification } from '../reducers/notificationReducer'
import Notification from '../components/Notification'


function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    const dispatch = useDispatch()

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username, password,
            })
            dispatch(updateNotification(username + ' logged in.'))
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            dispatch(updateNotification(exception.response.data.error))
        }
    }


    const [visible, setVisble] = useState(true)
    let toggleVisibility = () => {
        if (visible) {
            setVisble(false)
        } else {
            setVisble(true)
        }
    }

    const loginform = () => {
        return (
            <div className='container-fluid bg-light' id={"loginForm" + visible}>
                <form className="row g-3" onSubmit={handleLogin}>
                    <div className="col-lg-6">
                        <label htmlFor="inputEmail4" className="form-label">Käyttäjätunnus</label>
                        <input
                            type="username"
                            id="inputEmail4"
                            className="form-control"
                            value={username}
                            onChange={({ target }) => setUsername(target.value)}
                        />
                    </div>
                    <div className="col-lg-6">
                        <label htmlFor="inputPassword4" className="form-label">Salasana</label>
                        <input
                            type="password"
                            id="inputPassword4"
                            className="form-control"
                            value={password}
                            onChange={({ target }) => setPassword(target.value)}
                        />
                    </div>

                    <div className="col-5">
                        <button type="submit" className="btn btn-primary btn-block mb-4">Kirjaudu sisään</button>
                    </div>

                    <div className='col-6'>
                        <Notification />
                    </div>

                    <div className='col-1'>
                        <button className='btn btn-danger' id="xButton" type='button' onClick={() => toggleVisibility()}>X</button>
                    </div>
                </form>
            </div>
        )
    }

    const loggedInForm = () => {
        console.log(user)
        return(
            <p>hello</p>
        )
    }

    return (
        <div>
            {user === null ? 
            loginform() :
            loggedInForm()}
        </div>
    )
}

export default Login