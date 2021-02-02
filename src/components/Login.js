import React, {useState} from 'react';
import {Button, Col, Form, Row} from "react-bootstrap";
import AuthsAction from "../stores/auths/AuthsAction";
import notify from "../utils/Notify";
import {useDispatch} from "react-redux";

function Login(props) {

    const initialValues = {
        username: '',
        password: '',
    };

    const dispatch = useDispatch();
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState(initialValues);

    const validateUsername = (value) => {
        let error = '';

        if(!value){
            error = 'Required';
        }

        return error;
    };

    const validatePassword = (value) => {
        let error = '';

        if(!value){
            error = 'Required';
        }

        return error;
    };

    const checkCase = (key, value) => {
        switch (key) {
            case 'username':
                return validateUsername(value);
            case 'password':
                return validatePassword(value);
            default:
                return '';
        }
    }

    const validation = (key, value) => {
        let errorsTemp = { ...errors };
        errorsTemp[key] = checkCase(key, value);
        setErrors(errorsTemp);
    };

    const handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        validation(name, value);
        let valueTemp = { ...values };
        valueTemp[name] = value;
        setValues(valueTemp);
    };

    const validateForm = () => {
        let keys = Object.keys(values);
        let isValid = true;
        let errorsTemp = { ...errors };
        Object.values(values).forEach((value, index) => {
            let key = keys[index];
            errorsTemp[key] = checkCase(key, value);
            if(errorsTemp[key]){
                isValid = false;
            }
            setErrors(errorsTemp);
        });
        return isValid;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(validateForm()){
            let data = { ...values }
            // console.log(data);
            const response = await dispatch(AuthsAction.login(data));
            // console.log(response);
            if(response.status === 200){
                notify(response.data.message, 'success');
                props.history.push('/')
            }
        }
        else{
            console.error('Invalid Form');
        }

    };

    return (
        <>
            <Row>
                <Col className="d-flex justify-content-center mt-4">
                    <h3>Login</h3>
                </Col>
            </Row>
            <Form noValidate onSubmit={handleSubmit}>
                <div className="d-flex justify-content-center mt-2">
                    <Form.Group as={Col} md={5} >
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text"
                                      name="username"
                                      isValid={!errors.username && values.username !== ''}
                                      isInvalid={ !!errors.username }
                                      value={values.username}
                                      onChange={event => handleChange(event)}
                                      placeholder="Enter username" />
                        <Form.Control.Feedback type="invalid">
                            {errors.username}
                        </Form.Control.Feedback>
                    </Form.Group>
                </div>
                <div className="d-flex justify-content-center">
                    <Form.Group as={Col} md={5} >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password"
                                      name="password"
                                      isValid={!errors.password && values.password !== ''}
                                      isInvalid={!!errors.password}
                                      value={values.password}
                                      onChange={event => handleChange(event)}
                                      placeholder="Enter password" />
                        <Form.Control.Feedback type="invalid">
                            {errors.password}
                        </Form.Control.Feedback>
                    </Form.Group>
                </div>
                <div className="d-flex justify-content-center mt-2">
                    <Button type="submit"  >Login</Button>
                </div>
            </Form>
        </>
    );
}
export default Login;