import React from 'react';
import {
    Card,
} from "react-bootstrap";

function SessionExpired() {
    return (
        <Card className="text-center mt-4">
            <Card.Body>
                <Card.Title>
                    <h2>Sorry, your session has expired.</h2>
                </Card.Title>
                <Card.Text>
                    Please login and try again.
                </Card.Text>
                <Card.Link href="/login">Login</Card.Link>
            </Card.Body>
        </Card>
    );
}
export default SessionExpired;