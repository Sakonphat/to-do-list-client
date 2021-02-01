import React from 'react';
import {
    Nav,
    Navbar,
    Row
} from "react-bootstrap";

function Bar() {
    return (
        <Row>
            <Navbar collapseOnSelect expand="lg" variant="dark" bg="dark">
                <Navbar.Brand href="#"
                              onClick={
                                  event => {
                                      event.preventDefault();
                                  }
                              }>
                    TO DO LIST
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link href="/login">Login</Nav.Link>
                        <Nav.Link href="/register">Register</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Row>
    );
}
export default Bar;