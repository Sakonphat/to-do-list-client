import {Button, Col, Form, Modal} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import TasksAction from "../../stores/tasks/TasksAction";
import notify from "../../utils/Notify";
import Swal from 'sweetalert2'
import LoadingAction from "../../stores/global/loading/LoadingAction";

function EditTaskModal(props) {

    const dispatch = useDispatch();

    const [values, setValues] = useState({...props.task});
    const [errors, setErrors] = useState({...props.err});

    useEffect( () => {
        setValues(props.task)
        setErrors(props.err)
    }, [props.task, props.err])

    const validation = (key, value) => {
        let errorsTemp = { ...errors };
        let error = '';
        if(key === "title"){
            if(!value){
                error = 'Required';
            }
        }

        errorsTemp[key] = error;
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
        let error = ''
        Object.values(values).forEach((value, index) => {
            let key = keys[index];
            if(key === "title"){
                if(!value){
                    error = 'Required';
                    isValid = false;
                }
            }
            else{
                error = ''
            }
            errorsTemp[key] = error;
            setErrors(errorsTemp);
        });
        return isValid;
    };

    const handleEditTask =  async (event) => {

        event.preventDefault()

        if(validateForm()){

            let isConfirm = false

            await Swal.fire({
                icon: 'question',
                title: 'Are you sure ?',
                html: 'You want to edit your task',
                confirmButtonText: `Confirm`,
                showCancelButton: true,
                inputValidator: (value) => {
                    if (!value) {
                        return 'You need to write something!'
                    }
                }
            }).then((result) => {
                isConfirm = result.isConfirmed
            })

            if(isConfirm){
                let data = { ...values }
                // console.log(data);
                await dispatch(LoadingAction.setLoading())
                const response = await dispatch(TasksAction.editTask({
                    uuid : data.uuid,
                    title : data.title,
                    description: data.description
                }))

                if(response.status === 200){
                    notify(response.data.message, 'success');
                    return window.location.href = '/';
                }
                else {
                    await dispatch(LoadingAction.unsetLoading())
                }
            }
            else{
                console.log("Cancel Confirm.")
            }
        }
        else{
            console.error('Invalid Form');
        }

    }

    return (
        <>
            <Modal
                {...props}
                // size="lg"
                dialogClassName="modal-90w"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <h3>Edit Task</h3>
                    </Modal.Title>
                </Modal.Header>
                <Form noValidate onSubmit={handleEditTask}>
                    <Modal.Body>
                        <div className="d-flex justify-content-center mt-2">
                            <Form.Group as={Col} className="my-auto mx-3" >
                                <Form.Label><h4>Title</h4> (<span className="text-danger">Required</span>) </Form.Label>
                                <Form.Control type="text"
                                              name="title"
                                              isValid={!errors.title && values.title !== ''}
                                              isInvalid={ !!errors.title }
                                              value={values.title}
                                              onChange={event => handleChange(event)}
                                              placeholder="Enter your title" />
                            </Form.Group>
                        </div>
                        <div className="d-flex justify-content-center mt-4 mb-4">
                            <Form.Group as={Col} className="my-auto mx-3" >
                                <Form.Label>
                                    <h5>Description</h5>
                                </Form.Label>
                                <Form.Control as="textarea"
                                              rows={5}
                                              name="description"
                                              isValid={!errors.description && values.description !== ''}
                                              isInvalid={!!errors.description}
                                              value={values.description}
                                              onChange={event => handleChange(event)}
                                              placeholder="Explain your task here." />
                            </Form.Group>
                        </div>
                    </Modal.Body>
                    <Modal.Footer className="justify-content-start px-4">
                        <div className="flex-grow-1">
                            <Button type="submit" >
                                Save
                            </Button>
                        </div>
                        <div className="">
                            <Button variant="danger" onClick={props.onHide}>Close</Button>
                        </div>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default EditTaskModal