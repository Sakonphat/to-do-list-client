import {useEffect, useState} from 'react';
import {
    Form,
    Row,
    Col,
    Button,
    // FormControl,
    InputGroup
} from "react-bootstrap";
import {useDispatch} from "react-redux";
import AuthsAction from "../stores/auths/AuthsAction"
import notify from '../utils/Notify';
import {
    FaEyeSlash,
    FaEye
}
from "react-icons/fa";
import Swal from "sweetalert2";
import LoadingAction from "../stores/global/loading/LoadingAction";

const initialValues = {
    username: '',
    password: '',
};

function Register(props) {
    const dispatch = useDispatch();
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState(initialValues);
    const [isShowPassword, setIsShowPassword] = useState(false);

    useEffect( () => {
        dispatch(LoadingAction.unsetLoading())
    }, [dispatch])

    const validateUsername = (value) => {
        let error = '';
        if(!value){
            error = 'Required';
        }
        else if( value && value.length < 6){
            error = 'Must be more than 6 characters';
        }

        return error;
    };

    const validatePassword = (value) => {
        let error = '';
        if(!value){
            error = 'Required';
        }
        else if( !/^[A-Za-z\d]{6,}$/.test(value)){
            error = 'Password is not match';
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
            await Swal.fire({
                icon: 'question',
                title: 'Are you sure ?',
                html: 'You want to register this username',
                confirmButtonText: `Confirm`,
                showCancelButton: true,
            }).then( async (result) => {
                if(result.isConfirmed){
                    let data = { ...values }
                    // console.log(data);
                    const response = await dispatch(AuthsAction.register(data));
                    // console.log(response);
                    if(response.data.success){
                        notify(response.data.message, 'success');
                        props.history.push('/login')
                    }
                    else{
                        data.password = ""
                        data.username = ""
                        setValues(data)
                        let tempErr = { ...errors }
                        tempErr.username = ""
                        tempErr.password = ""
                        setErrors(tempErr)
                    }
                }
                else{
                    console.log("Cancel")
                }
            })
        }
        else{
            console.error('Invalid Form');
        }

    };

    return (
        <>
            <Row>
                <Col className="d-flex justify-content-center mt-4">
                    <h3>Register</h3>
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
                <div className="d-flex justify-content-center mb-4">
                    {/*<Form.Group as={Col} md={5} >*/}
                    {/*    <Form.Label>Password</Form.Label>*/}
                    {/*    <Form.Control type={isShowPassword ? "text" : "password"}*/}
                    {/*                  name="password"*/}
                    {/*                  isValid={!errors.password && values.password !== ''}*/}
                    {/*                  isInvalid={!!errors.password}*/}
                    {/*                  value={values.password}*/}
                    {/*                  onChange={event => handleChange(event)}*/}
                    {/*                  placeholder="Enter password" />*/}
                    {/*    <Form.Text muted className="ml-2">*/}
                    {/*        Must be more than 6 characters , contain number and alphabet.*/}
                    {/*    </Form.Text>*/}
                    {/*    <Form.Control.Feedback type="invalid">*/}
                    {/*        {errors.password}*/}
                    {/*    </Form.Control.Feedback>*/}
                    {/*    <Button variant="light"*/}
                    {/*            className="mt-2"*/}
                    {/*            onClick={*/}
                    {/*                event => {*/}
                    {/*                    event.preventDefault();*/}
                    {/*                    let isShow = !isShowPassword;*/}
                    {/*                    setIsShowPassword(isShow);*/}
                    {/*                }*/}
                    {/*            }>*/}
                    {/*        {isShowPassword ? "Hide" : "Show"}*/}
                    {/*    </Button>*/}
                    {/*</Form.Group>*/}
                    <Form.Group md={5} className={!!errors.password ? "ml-err" : ""}>
                        <Form.Label className="mt-3">Password</Form.Label>
                        <InputGroup as={Col} className="mb-2">
                            <Form.Control
                                type={isShowPassword ? "text" : "password"}
                                name="password"
                                isValid={!errors.password && values.password !== ''}
                                isInvalid={!!errors.password}
                                value={values.password}
                                onChange={event => handleChange(event)}
                                placeholder="Enter password" />
                            <InputGroup.Append>
                                <Button variant="outline-primary"
                                        onClick={
                                            event => {
                                                event.preventDefault();
                                                let isShow = !isShowPassword;
                                                setIsShowPassword(isShow);
                                            }
                                        }>
                                    {
                                        isShowPassword ? <FaEyeSlash/>
                                            : <FaEye/>
                                    }
                                </Button>
                            </InputGroup.Append>
                            <Form.Control.Feedback type="invalid">
                                {errors.password}
                            </Form.Control.Feedback>
                        </InputGroup>
                        <Form.Text muted className="ml-2">
                            Must be more than 6 characters , contain number and alphabet.
                        </Form.Text>
                    </Form.Group>
                </div>
                <div className="d-flex justify-content-center mt-2">
                    <Button type="submit"  >Register</Button>
                </div>
            </Form>
        </>
    );
}
export default Register;