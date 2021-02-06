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
import TaskDetailModal from "./Modals/TaskDetailModal";
import EditTaskModal from "./Modals/EditTaskModal";
import {
    FaTrashAlt,
    FaEdit,
    FaUndoAlt,
    FaCheckCircle,
    FaEye
}
from "react-icons/fa";
import LoadingAction from "../stores/global/loading/LoadingAction";
import Swal from "sweetalert2";
import notify from "../utils/Notify";


function TaskBoard() {

    const cardPosition = {
        margin: "auto 8rem"
    }

    const completedBorder = {
        borderBottomColor:"#28a745"
    }

    const unCompletedBorder = {
        borderBottomColor:"#ffc107"
    }

    const dispatch = useDispatch();
    const [openCreateTaskModal, setOpenCreateTaskModal] = useState(false);
    const [taskModal, setTaskModal] = useState({
        isOpenDetail : false,
        isOpenEdit : false,
        uuid : "",
        created_at : "",
        title : "",
        description : "",
        is_completed : false
    });

    useEffect( () => {

        async function fetchData() {
            await dispatch(LoadingAction.unsetLoading())
            await dispatch(TasksAction.getAllTask())
        }

        fetchData();

    }, [dispatch])

    const { tasks, loading } = useSelector(state => state.tasks);

    const renderTaskSkeleton = () => {

        // console.log("mocking")

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

    const handleSetTaskModal = (item, type = "detail") => {

        let tempDetail = { ...taskModal }

        if(type === "detail"){
            tempDetail.isOpenDetail = true
        }
        else if(type === "edit"){
            tempDetail.isOpenEdit = true
        }

        tempDetail.uuid = item.uuid
        tempDetail.created_at = item.created_at
        tempDetail.title = item.title
        tempDetail.description = item.description
        tempDetail.is_completed = item.is_completed
        setTaskModal(tempDetail)
    }

    const handleDeleteTask = async (item) => {

        const html = `
            <div class="d-flex flex-column justify-content-center">
                <span>You want to delete your task</span> 
                <span class="mt-2 mb-4">" ${item.title} " </span>           
            </div>
        `

        await Swal.fire({
            icon: 'question',
            title: 'Are you sure ?',
            html: html,
            confirmButtonText: `Confirm`,
            showCancelButton: true,
        }).then( async (result) => {
            if(result.isConfirmed){
                await dispatch(LoadingAction.setLoading())
                let response = await dispatch(TasksAction.deleteTask(item.uuid))
                if(response.data.success){
                    notify(response.data.message, 'success');
                    return window.location.href = '/';
                }
            }
            else{
                console.log("Cancel")
            }
        })
    }

    const handleSetStatusTask = async (item) => {

        const html = `
            <div class="d-flex flex-column justify-content-center">
                <span>You want to set your task</span> 
                <span class="mt-2">" ${item.title} " </span>     
                <span class="mt-2 mb-4"> ${item.is_completed ? "to undo task" : "to complete task"} </span>       
            </div>
        `

        await Swal.fire({
            icon: 'question',
            title: 'Are you sure ?',
            html: html,
            confirmButtonText: `Confirm`,
            showCancelButton: true,
        }).then( async (result) => {
            if(result.isConfirmed){
                await dispatch(LoadingAction.setLoading())
                let response = ''
                if(item.is_completed){
                    response = await dispatch(TasksAction.undoTask(item.uuid))
                }
                else if(!item.is_completed){
                    response = await dispatch(TasksAction.completeTask(item.uuid))
                }

                if(response.data.success){
                    notify(response.data.message, 'success');
                    return window.location.href = '/';
                }
            }
            else{
                console.log("Cancel")
            }
        })
    }

    const getTasks = () => {
        let items = []

        tasks.map((item,index) => {
            items.push(
                <Row key={"div_task_"+index}>
                    <Col>
                        <Card className="task my-auto mx-5 mb-4"
                              style={ item.is_completed ? completedBorder : unCompletedBorder }
                        >
                            <Card.Body className="d-flex">
                                <Card.Title className="flex-grow-1 align-items-center my-2 mx-2">
                                    <span>
                                        {
                                            item.title.charAt(0).toUpperCase() +
                                            (
                                                item.title.length > 50 ?
                                                    (item.title.slice(1, 50) + " ...") :
                                                    item.title.slice(1)
                                            )
                                        }
                                    </span>
                                </Card.Title>
                                <div className="d-flex justify-content-end align-items-center">
                                    <ul className="my-2" style={{listStyleType: "none"}}>
                                        <li className="icon">
                                            <a href="/#"
                                               data-toggle="tooltip"
                                               data-placement="top"
                                               title="detail"
                                               onClick={
                                                   event => {
                                                       event.preventDefault()
                                                       handleSetTaskModal(item)
                                                   }
                                               }
                                            >
                                                <FaEye style={{color:"#17a2b8"}}/>
                                            </a>
                                        </li>
                                        <li className="icon">
                                            <a href="/#"
                                               data-toggle="tooltip"
                                               data-placement="top"
                                               title="edit"
                                               onClick={
                                                   event => {
                                                       event.preventDefault()
                                                       handleSetTaskModal(item, "edit")
                                                   }
                                               }
                                            >
                                                <FaEdit style={{color:"#FF8C00"}}/>
                                            </a>
                                        </li>
                                        <li className="icon">
                                            <a href="/#"
                                               data-toggle="tooltip"
                                               data-placement="top"
                                               title={item.is_completed ? "undo task" : "complete task"}
                                               onClick={
                                                   async event => {
                                                       event.preventDefault()
                                                       await handleSetStatusTask(item)
                                                   }
                                               }
                                            >
                                                {
                                                    item.is_completed ?
                                                        <FaUndoAlt style={{color:"#ffc107"}}/> :
                                                        <FaCheckCircle style={{color:"#28a745"}}/>

                                                }
                                            </a>
                                        </li>
                                        <li className="icon-right">
                                            <a href="/#"
                                               data-toggle="tooltip"
                                               data-placement="top"
                                               title="delete"
                                               onClick={
                                                   async event => {
                                                       event.preventDefault()
                                                       await handleDeleteTask(item)
                                                   }
                                               }
                                            >
                                                <FaTrashAlt style={{color:"#dc3545"}}/>
                                            </a>
                                        </li>
                                    </ul>
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

    const handleDeleteAllTask = async (event) => {
        event.preventDefault()

        await Swal.fire({
            icon: 'question',
            title: 'Are you sure ?',
            html: 'You want to delete all your task',
            confirmButtonText: `Confirm`,
            showCancelButton: true,
        }).then( async (result) => {
            if(result.isConfirmed){
                await dispatch(LoadingAction.setLoading())
                let response = await dispatch(TasksAction.deleteAllTask())

                if(response.data.success){
                    notify(response.data.message, 'success');
                    return window.location.href = '/';
                }
            }
            else{
                console.log("Cancel")
            }
        })
    }

    const renderBody = () => {

        // console.log("real")

        let items = [];

        if(tasks.length){
            items.push(
                <div key="real_tasks">
                    <Row>
                        <Col>
                            <div className="d-flex justify-content-end mb-4 mx-5">
                                <div className="">
                                    {renderCreateTaskBtn()}
                                </div>
                                <div className="ml-4">
                                    <Button variant="danger"
                                    onClick={handleDeleteAllTask}>
                                        Delete All Task
                                    </Button>
                                </div>
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
            <TaskDetailModal
                show={taskModal.isOpenDetail}
                task={taskModal}
                onHide={
                    () => {
                        let tempDetail = { ...taskModal }
                        tempDetail.isOpenDetail = false
                        setTaskModal(tempDetail)
                    }
                }
            />
            <EditTaskModal
                show={taskModal.isOpenEdit}
                task={taskModal}
                err={{title:'',description:''}}
                onHide={
                    () => {
                        let tempDetail = { ...taskModal }
                        tempDetail.isOpenEdit = false
                        setTaskModal(tempDetail)
                    }
                }
            />
        </>
    );
}
export default TaskBoard;