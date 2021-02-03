import {
    Modal,
    Button
} from "react-bootstrap"
import ModalAction from "../../stores/global/modal/ModalAction";
import {useDispatch} from "react-redux";

function GlobalModal(props) {

    const dispatch = useDispatch();

    return (
        <Modal
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <div className="d-flex justify-content-center mt-2">
                    <h4>{props.title}</h4>
                </div>
                <div className="d-flex justify-content-center mt-2">
                    <p>
                        {props.description}
                    </p>
                </div>
                <div className="d-flex justify-content-center mt-3">
                    <Button onClick={
                        async () => {
                            await dispatch(ModalAction.unsetModal())
                        }
                    }>OK</Button>
                </div>

            </Modal.Body>
        </Modal>
    );
}

export default GlobalModal;