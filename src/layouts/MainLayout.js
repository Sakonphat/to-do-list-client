import React from 'react';
import { Container } from "react-bootstrap";
import Header from "../components/Header";

function MainLayout(props) {
    return (
        <Container>
            <Header/>
            {props.children}
        </Container>
    )
}
export default MainLayout;