import React from 'react';
import { Container } from "react-bootstrap";
import Bar from "../components/Bar";
function MainLayout(props) {
    return (
        <Container>
            <Bar/>
            {props.children}
        </Container>
    )
}
export default MainLayout;