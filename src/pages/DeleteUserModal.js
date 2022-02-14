import React from 'react';
import { Button, Modal } from "react-bootstrap";

function DeleteUserModal(props) {
    return (
        <Modal  onSubmit={(e) => console.log(e)} show={props.modal} toggle={props.toggle}>
        <Modal.Body style={{fontWeight:"500",fontSize:"20px"}}>{props.msg}</Modal.Body>
        <Modal.Footer>
        <Button
            
            onClick={()=>props.deleteDetails()}
            style={{ fontSize: "16px",backgroundColor:"rgb(139, 19, 0)",color:"#fff",border:"none",outline:"none"}}
        >
            Confirm
        </Button>
        <Button
            variant="outline-primary"
            onClick={()=>props.cancel()}
            style={{ fontSize: "15px",backgroundColor:"#fff",color:"rgb(139, 19, 0)",border:"1px solid rgb(139, 19, 0)",outline:"none"}}
        >
            Cancel
        </Button>
        </Modal.Footer>
    </Modal>
    );
}

export default DeleteUserModal;