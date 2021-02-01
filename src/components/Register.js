import {useState} from 'react';
import {
    Form,
    Row,
    Col,
    Button
} from "react-bootstrap";
import {useDispatch} from "react-redux";
import AuthsAction from "../stores/auths/AuthsAction"
import notify from '../utils/Notify';

const initialValues = {
    username: '',
    password: '',
};

function Register(props) {
    const dispatch = useDispatch();
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState(initialValues);
    const [isShowPassword, setIsShowPassword] = useState(false);

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
            setErrors(errorsTemp);
            isValid = false;
        });
        return isValid;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(validateForm()){
            let data = { ...values }
            console.log(data);
            const response = await dispatch(AuthsAction.register(data));
            console.log(response);
            notify(response.data.message, 'success');
            props.history.push('/login')

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
                <div className="d-flex justify-content-center">
                    <Form.Group as={Col} md={5} >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type={isShowPassword ? "text" : "password"}
                                      name="password"
                                      isValid={!errors.password && values.password !== ''}
                                      isInvalid={!!errors.password}
                                      value={values.password}
                                      onChange={event => handleChange(event)}
                                      placeholder="Enter password" />
                        <Form.Text muted className="ml-2">
                            Must be more than 6 characters , contain number and alphabet.
                        </Form.Text>
                        <Form.Control.Feedback type="invalid">
                            {errors.password}
                        </Form.Control.Feedback>
                        <Button variant="light"
                                className="mt-2"
                                onClick={
                                    event => {
                                        event.preventDefault();
                                        let isShow = !isShowPassword;
                                        setIsShowPassword(isShow);
                                    }
                                }>
                            {isShowPassword ? "Hide" : "Show"}
                        </Button>
                    </Form.Group>
                </div>
                <div className="d-flex justify-content-center mt-2">
                    <Button type="submit"  >Submit</Button>
                </div>
            </Form>
        </>
    );
}
export default Register;