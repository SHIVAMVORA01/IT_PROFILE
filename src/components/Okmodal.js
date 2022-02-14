import React  from "react";
import { Button, Modal, } from "react-bootstrap";

function OkModal(props) {
    return (
      <div>
        <Modal show={props.show} >
          <Modal.Body style={{ fontWeight: "bold" }}>{props.title}</Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={()=>{props.handleOk();}}>
              OK
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
  export default OkModal;