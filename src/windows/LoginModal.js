import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button } from "react-bootstrap";

import loginService from '../services/loginService'
import { hideloginModal } from '../reducers/loginModalReducer'
import havaintoService from '../services/havaintoService';

import { updateNotification } from '../reducers/notificationReducer'
import Notification from './Notification'

function LoginModal() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [register, setRegister] = useState(false)

    /*
    if(window.localStorage.loggedLintuBongariUser){
        setUser(JSON.parse(window.localStorage.loggedLintuBongariUser))
        console.log('wtf')
    }
    */
    //Pitää käyttää useEffectiä ettei jouduta infinite render looppiin.
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedLintuBongariUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            havaintoService.setToken(user.token)
            setUser(user)
        }
    }, [])

    const loginStateModal = useSelector(state => state.loginModal)
    const dispatch = useDispatch()

    const handleClose = () => {
        dispatch(hideloginModal())
        setRegister(false)
        //console.log(user)
    }

    const notify = message => {
        dispatch(updateNotification(message))
        console.log(message);
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username, password,
            })

            window.localStorage.setItem(
                'loggedLintuBongariUser', JSON.stringify(user)
            )

            havaintoService.setToken(user.token)

            //dispatch(updateNotification(username + ' logged in.'))
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            //dispatch(updateNotification(exception.response.data.error))
            console.log(exception.response.data.error);
            notify(exception.response.data.error)
        }
    }

    const handleRegister = async (event) => {
        event.preventDefault()
        try {
            const res = await loginService.register({ username, password })
            if (res?.id) {
                notify(username + ' käyttäjä luotiin.')
                setTimeout(() => {          
                    setRegister(false)
                  }, 3000)
            }
        } catch (e) {
            //console.log(e)
            if (e.response?.data?.message) {
                notify(e.response.data.message)
            }
            if (e.response?.data?.error) {
                notify(e.response.data.error)
            }
        }
    }

    const handleLogout = () => {
        window.localStorage.removeItem('loggedLintuBongariUser')
        havaintoService.setToken(null)
        setUser(null)
    }

    const checkToken = async () => {
        //console.log(user)
        try {
            const tokenStatus = await loginService.checkToken(user.token)
        } catch (e) {
            if (e.response.data.error === 'TokenExpiredError') {
                setUser(null)
                window.localStorage.removeItem('loggedLintuBongariUser')
            }
        }
    }

    const LoginForm = () => {
        return (
            <div>

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

                    <div className="d-grid gap-2">
                        <button type="submit" className="btn btn-primary btn-block mb-4">Kirjaudu sisään</button>
                    </div>
                </form>
                <div className="d-grid gap-2">
                    <Button
                        variant='secondary'
                        onClick={() => setRegister(true)}
                    >Rekisteröidy</Button>
                </div>
            </div>
        )
    }

    const LoggedInForm = () => {
        checkToken() //if token has expired then setuser to null and remove token from localstorage
        return (
            <div>
                <h3>{user.name}</h3>
                <Button
                    variant='danger'
                    onClick={handleLogout}
                >
                    Kirjaudu ulos
                </Button>
            </div>
        )
    }

    const RegisterForm = () => {
        return (
            <form className="row g-3" onSubmit={handleRegister}>
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

                <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-success btn-block mb-4">Rekisteröidy</button>
                </div>
            </form>
        )
    }

    return (
        <Modal
            show={loginStateModal.type}
            onHide={handleClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Käyttäjä
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>

                {register === true ? RegisterForm() : user === null ? LoginForm() : LoggedInForm()}


            </Modal.Body>

            <Modal.Footer>
                <Notification />
            </Modal.Footer>
        </Modal>
    );
}

export default LoginModal