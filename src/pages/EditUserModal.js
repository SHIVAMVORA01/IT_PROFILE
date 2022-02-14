import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";

function EditUserModal(props) {
    const CurrentYear = new Date().getFullYear();
    const [initialSapId, setInitialSapId] = useState("")
    const [sapId, setSapId] = useState("");
    const [yearOfJoining, setYearOfJoining] = useState(CurrentYear - 3);
    const [yearOfPassing, setYearOfPassing] = useState(CurrentYear + 1);
    const [invalidSapId, setinvalidSapId] = useState(false);
    function submit() {
        if (sapId === "" || sapId.length === 0) {
            setinvalidSapId(true);
            return
        }
        props.editDetails(initialSapId, sapId, yearOfJoining, yearOfPassing)
    }
    useEffect(() => {
        setInitialSapId(props.sapId)
        setYearOfJoining(props.year_join)
        setYearOfPassing(props.year_passed)
        setSapId(props.sapId)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    function ValidationOnChange(event) {
        switch (event.target.name) {
            case "SapId":
                setSapId(event.target.value);
                if (sapId && sapId.length > 0) {
                    setinvalidSapId(false);

                }
                else {
                    setinvalidSapId(true);
                }
                break;
            default:
                break;
        }
    }
    return (
        <Modal onSubmit={(e) => console.log(e)} show={props.modal} toggle={props.toggle}>
            <Modal.Body>
                <Form.Group className="mb-3" >
                    <Form.Label style={{ color: "black", fontWeight: "bold" }}>Sap Id <label style={{ color: "red" }}>*</label></Form.Label>
                    <Form.Control required name="SapId" type="number" rows={5} value={sapId} onInput={(event) => { ValidationOnChange(event); }} isInvalid={invalidSapId} />
                </Form.Group>
                {invalidSapId ? <h5 style={{ color: "red" }}>Invalid value entered</h5> : null}
                <Form.Group className="mb-3" >
                    <Form.Label style={{ color: "black", fontWeight: "bold" }}>Year of Joining <label style={{ color: "red" }}>*</label></Form.Label>
                    <Form.Select aria-label="Default select example" value={yearOfJoining} onInput={(event) => { setYearOfJoining(Number(event.target.value)); setYearOfPassing(Number(event.target.value) + 4); }}>
                        <option value={CurrentYear} >{CurrentYear}</option>
                        <option value={CurrentYear - 1} >{CurrentYear - 1}</option>
                        <option value={CurrentYear - 2}>{CurrentYear - 2}</option>
                        <option value={CurrentYear - 3}>{CurrentYear - 3}</option>
                    </Form.Select>
                </Form.Group>


                <Form.Group className="mb-3" >
                    <Form.Label style={{ color: "black", fontWeight: "bold" }}>Year of Passing <label style={{ color: "red" }}>*</label></Form.Label>
                    <Form.Select aria-label="Default select example" value={yearOfPassing} onInput={(event) => { setYearOfPassing(Number(event.target.value)); }} >
                        <option value={Number(yearOfJoining) + 4} >{Number(yearOfJoining) + 4}</option>
                        <option value={Number(yearOfJoining) + 3} >{Number(yearOfJoining) + 3}</option>
                    </Form.Select>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button

                    onClick={() => submit()}
                    style={{ fontSize: "16px", backgroundColor: "rgb(5, 5, 88)", color: "#fff", border: "none", outline: "none" }}
                >
                    Submit
                </Button>
                <Button
                    variant="outline-primary"
                    onClick={() => props.cancel()}
                    style={{ fontSize: "15px", backgroundColor: "#fff", color: "rgb(5, 5, 88)", border: "1px solid rgb(5, 5, 88)", outline: "none" }}
                >
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default EditUserModal;