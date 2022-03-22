import React from "react";
import { Modal, Spinner } from "react-bootstrap";

function ModalLoading(props) {
    return(
        <Modal show={ props.show } onHide={ props.handleClose } backdrop="static" keyboard={false}>
            <Modal.Body>
                <Spinner animation="border" variant="primary"/> { props.text }
            </Modal.Body>
        </Modal>
    );
}

export default ModalLoading;