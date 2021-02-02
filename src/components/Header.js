import React from 'react';
import {
    Nav,
    Navbar,
    Row,
    NavDropdown,
    // Dropdown,
    // NavItem,
    // NavLink
} from "react-bootstrap";
import {
    useDispatch,
    useSelector
} from "react-redux";
// import { useHistory } from 'react-router-dom';
import AuthsAction from "../stores/auths/AuthsAction";
import notify from "../utils/Notify";
import Cookies from "js-cookie"

function Header() {

    // const history = useHistory();
    const dispatch = useDispatch();
    const { isLoggedIn, user } = useSelector(state => state.auths);

    const handleLogout = async () => {
        const response = await dispatch(AuthsAction.logout());
        if(response.status === 200){
            Cookies.remove("token")
            notify(response.data.message, 'success');
            // history.push('/')
        }
    }

    return (
        <Row>
            <Navbar collapseOnSelect expand="lg" variant="dark" bg="dark">
                <Navbar.Brand href="/">
                    TO DO LIST
                </Navbar.Brand>
                {
                    !isLoggedIn ?
                        <>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="ml-auto">
                                    <Nav.Link href="/login">Login</Nav.Link>
                                    <Nav.Link href="/register">Register</Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </> : null
                }
                {
                    isLoggedIn ?
                        <div className="ml-auto">
                            <NavDropdown title={user.username} id="nav-dropdown" >
                                <NavDropdown.Item
                                    eventKey="4.1"
                                    onClick={
                                        async event => {
                                            event.preventDefault()
                                            await handleLogout()
                                        }
                                    }
                                >
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        </div>: null
                }
                {/*{*/}
                {/*    isLoggedIn ?*/}
                {/*        <div className="ml-auto">*/}
                {/*            <Dropdown as={NavItem}>*/}
                {/*                <Dropdown.Toggle as={NavLink}>{user.username}</Dropdown.Toggle>*/}
                {/*                <Dropdown.Menu style={{*/}
                {/*                    // margin:"!important -46px",*/}
                {/*                    marginTop:"!important -1px"*/}
                {/*                }}>*/}
                {/*                    <Dropdown.Item onClick={*/}
                {/*                        async event => {*/}
                {/*                            event.preventDefault()*/}
                {/*                            await handleLogout()*/}
                {/*                        }*/}
                {/*                    }>*/}
                {/*                        Logout*/}
                {/*                    </Dropdown.Item>*/}
                {/*                </Dropdown.Menu>*/}
                {/*            </Dropdown>*/}
                {/*        </div> : null*/}
                {/*}*/}
            </Navbar>
        </Row>
    );
}
export default Header;