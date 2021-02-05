import {
    Button,
    Modal
} from "react-bootstrap";
import React from "react";
import {
    date,
    time
} from "../../utils/DateTime"

function TaskDetailModal(props) {

    return (
        <Modal
            {...props}
            // size="lg"
            dialogClassName="modal-90w"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h3>Task Detail</h3>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="ml-4 mr-4 mb-2">
                    <div className="">
                        <span className="font-weight-bold font-size-larger">Status :</span>
                        <span className={
                            "font-weight-normal font-size-larger" +
                            (props.task.is_completed ? " text-success" : " text-warning")
                        }>
                            &nbsp;&nbsp;{props.task.is_completed ? "COMPLETED" : "UNCOMPLETED"}
                        </span>
                    </div>
                    <div className="mt-2">
                        <span className="font-weight-bold font-size-larger">Date :</span>
                        <span className="font-weight-normal font-size-larger">&nbsp;&nbsp;{date(props.task.created_at)}</span>
                    </div>
                    <div className="mt-2">
                        <span className="font-weight-bold font-size-larger">Time :</span>
                        <span className="font-weight-normal font-size-larger">&nbsp;&nbsp;{time(props.task.created_at)}</span>
                    </div>
                    <div className="mt-2">
                        <span className="font-weight-bold font-size-larger">Title :</span>
                        <span className="font-weight-normal font-size-larger">&nbsp;&nbsp;{props.task.title}</span>
                    </div>
                    <div className="mt-2">
                        <span className="d-flex font-weight-bold font-size-larger col-12">Description :</span>
                        <div className="font-weight-normal font-size-larger description">
                            {props.task.description}
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer className="justify-content-center px-4">
                <Button variant="primary" onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default TaskDetailModal