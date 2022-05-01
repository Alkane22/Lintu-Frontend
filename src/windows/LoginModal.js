import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button } from "react-bootstrap";

import loginService from '../services/loginService'
import { hideloginModal } from '../reducers/loginModalReducer'
import havaintoService from '../services/havaintoService';

function LoginModal() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

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
        }
    }

    const handleLogout = () => {
        window.localStorage.removeItem('loggedLintuBongariUser')
        setUser(null)
    }

    const LoginForm = () => {
        return (
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

            </form>
        )
    }

    const LoggedInForm = () => {
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

    const RegisterForm  = () => {
        //todo
        console.log('todo')
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

                {user === null ? LoginForm() : LoggedInForm()}

            </Modal.Body>

            <Modal.Footer>
                <p>Moro!</p>
            </Modal.Footer>
        </Modal>
    );
}

export default LoginModal