import React, {useEffect, useState} from 'react';
import {
    Col,
    Row,
    Button,
    Card
} from "react-bootstrap";
import {
    useDispatch,
    useSelector
} from "react-redux";
import Skeleton from "react-loading-skeleton";
import TasksAction from "../stores/tasks/TasksAction";
import CreateTaskModal from "./Modals/CreateTaskModal";

function TaskBoard() {

    const dispatch = useDispatch();
    const [openCreateTaskModal, setOpenCreateTaskModal] = useState(false);

    useEffect( () => {

        async function fetchData() {
            await dispatch(TasksAction.getAllTask())
        }

        fetchData();

    }, [dispatch])

    const { tasks, loading } = useSelector(state => state.tasks);

    const cardPosition = {
        margin: "auto 8rem"
    }

    const renderTaskSkeleton = () => {

        console.log("mocking")

        let items = [];

        items.push(
            <Row key="mock_create_task_btn">
                <Col className="d-flex justify-content-center mb-4">
                    <Skeleton height={42} width={100} />
                </Col>
            </Row>
        )

        for (let i = 0; i < 3; i++) {
            items.push(
                <div key={"task_skeleton"+i} className="d-flex justify-content-center mb-4">
                    <Skeleton height={100} width={1020} />
                </div>
            )
        }

        return items
    }



    const renderCreateTaskBtn = () => {
        return (
            <Button onClick={
                event => {
                    event.preventDefault()

                    setOpenCreateTaskModal(true)
                }
            }>
                Create Task
            </Button>
        );
    }

    const getTasks = () => {
        let items = []

        tasks.map((item,index) => {
            items.push(
                <Row key={"div_task_"+index}>
                    <Col>
                        <Card className="my-auto mx-5">
                            <Card.Body>
                                <div className="my-auto mx-5">
                                    <Card.Title>{item.title}</Card.Title>
                                </div>
                                <div className="my-auto mx-5">
                                    <Card.Text>{item.description}</Card.Text>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            )
            return items
        })

        return items
    }

    const renderBody = () => {

        console.log("real")

        let items = [];

        if(tasks.length){
            items.push(
                <div key="real_tasks">
                    <Row>
                        <Col>
                            <div className="d-flex justify-content-center mb-4">
                                {renderCreateTaskBtn()}
                            </div>
                        </Col>
                    </Row>
                    {getTasks()}
                </div>
            )
        }
        else{
            items.push(
                <div key="nothing_tasks">
                    <Row>
                        <Col>
                            <Card style={cardPosition}>
                                <Card.Body>
                                    <div className="d-flex justify-content-center">
                                        <Card.Title >There is no task.</Card.Title>
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <Card.Text>Please create your task below.</Card.Text>
                                    </div>
                                    <div className="d-flex justify-content-center mt-4">
                                        {renderCreateTaskBtn()}
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>
            )
        }


        return items
    }

    return (
        <>
            <Row>
                <Col className="d-flex justify-content-center mt-4">
                    <h3>TO DO LIST</h3>
                </Col>
            </Row>
            <div className="mt-4">
                { loading ? renderTaskSkeleton() : renderBody() }
            </div>
            <CreateTaskModal
                show={openCreateTaskModal}
                onHide={
                    () => {
                        setOpenCreateTaskModal(false)
                    }
                }
            />
        </>
    );
}
export default TaskBoard;