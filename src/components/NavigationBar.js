import logo from '../imgs/binoculars_BnT_64px.png'
import { NavLink } from 'react-router-dom'

import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'

import { showHavaintoModal } from '../reducers/havaintoModalReducer'
import { showloginModal } from '../reducers/loginModalReducer'
import { useDispatch } from 'react-redux'

const NavigationBar = () => {
    const dispatch = useDispatch()

    const havaintoModalHandle = () => {
        dispatch(showHavaintoModal())
    }

    const loginModalHandle = () => {
        dispatch(showloginModal())
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
            <Container>

                <NavLink className="navbar-brand" to='/'>
                    <img src={logo} alt="" width="48" height="48" />
                    LintuBongarit
                </NavLink>


                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">

                        <NavLink className="nav-link active" to='/havainnot'>Havainnot</NavLink>

                        <NavLink className="nav-link active" to='/linnut'>Linnut</NavLink>

                        <NavDropdown title="Valikko" id="collasible-nav-dropdown">
                            <NavDropdown.Item onClick={() => havaintoModalHandle()}>Lisää havainto</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => loginModalHandle()}>Käyttäjä</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">tyhjä</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">tyhjä</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
    /*
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to='/'>
                    <img src={logo} alt="" width="30" height="24" />
                    LintuBongarit
                </NavLink>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                        <li className="nav-item">
                            <NavLink className="nav-link active" to='/havainnot'>Havainnot</NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link active" to='/linnut'>Linnut</NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link active" to='/login'>Kirjaudu</NavLink>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>
    ) */

}

export default NavigationBar