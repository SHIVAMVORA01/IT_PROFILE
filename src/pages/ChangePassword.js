import React, { useState, useEffect } from "react";
import { Container, Form, Toast, Spinner, Button } from "react-bootstrap";
import { postEndPoint } from "../components/request";
import { useHistory } from 'react-router';
import OkModal from "../components/Okmodal";
import '../css/SignIn.css';
import '../css/AdminPanel.css';
import UserNavbar from "./UserNavbar";
const ChangePassword = () => {
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [invalidPassword, setInvalidPassword] = useState(false);
    const [invalidPassword2, setInvalidPassword2] = useState(false);
    const [showError, setShowError] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

    useEffect(() => {
        setIsLoading(true);
        if (!(localStorage.getItem('otpPermission') && localStorage.getItem('otpPermission') === 'true')) {
            history.replace('/sign-in');

        }
        setIsLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    function ValidationOnChange(event) {
        switch (event.target.name) {
            case "Password":
                setPassword(event.target.value);
                if (event.target.value.length > 7) {
                    setInvalidPassword(false);
                }
                else {
                    setInvalidPassword(true);
                }
                break;
            case "Password2":
                setPassword2(event.target.value);
                if (event.target.value.length > 7 && event.target.value === password) {
                    setInvalidPassword2(false);
                }
                else {
                    setInvalidPassword2(true);
                }
                break;
            default:
                break;
        }
    }
    async function submit() {
        if (password === password2 && password.length > 7 && password2.length > 7) {

            try {
                setIsLoading(true);
                const response = await postEndPoint('/user/change-password', {
                    newPassword: password.toString(),
                    sap_Id: localStorage.getItem('sapIdForOtp')
                }, null);
                if (response) {

                    if (response.status === 200) {
                        setIsLoading(false);
                        showOkModal();

                    }
                }
                else {
                    setIsLoading(false);
                    setShowError(true);
                    console.log(response);
                }
            }
            catch (err) {
                setIsLoading(false);
                setShowError(true);
            }

        } else {
            if (password.length < 7) {
                setInvalidPassword(true);
            } else if (password2.length < 7) {
                setInvalidPassword2(true);
            } else {
                setInvalidPassword2(true);
            }
        }
    }

    function handleModalOk() {
        setShowModal(false);
        history.replace('/otp');
        localStorage.removeItem('sapIdForOtp')
        localStorage.removeItem('otpPermission')
        history.replace('/')
    }
    function showOkModal() {
        setShowModal(true);
    }
    return (
        isLoading ? <center style={{ marginTop: "20%" }}><Button variant="primary" disabled>
            <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
            />
            Loading...
        </Button> </center> : <div>
            <OkModal show={showModal} title={"Password changed successfully"} handleOk={handleModalOk}></OkModal>
            <div style={{ position: "fixed", top: "90vh", left: "65vw" }}>
                <Toast onClose={() => setShowError(false)} show={showError} delay={3000} autohide bg="danger">
                    <Toast.Body style={{ fontWeight: "bold", color: "white" }}>OOPS AN ERROR OCCURED TRY AGAIN LATER!!!</Toast.Body>
                </Toast>
            </div>
            <div>
                    <UserNavbar type={1} />
                </div>

                <Container className="customLoginBorder" style={{ width: "620px", boxShadow: "1.5px 1.5px 7px 3px rgba(0,0,0,0.2)", borderRadius: "40px" }}>
                <div>
                    {/* <div style={{ display: "flex", justifyContent: "center" }}>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "170px", height: "170px", backgroundColor: "#fff", borderRadius: "50%", boxShadow: "4px 4px 7px 3px rgba(0,0,0,0.25)" }}>
                            <img style={{ borderRadius: "50%" }} height="160px" width="180px" alt="logo" src="/images/itcollege_logo.svg"></img>
                        </div>
                    </div> */}
                    <h3 style={{ margin: "30px auto", marginBottom: "0px", paddingTop:"16px",paddingBottom:"20px",textAlign: "center", fontSize: "36px", lineHeight: "54px", fontWeight: "600", fontFamily: "Poppins", color: "#293E6F", marginTop: "15px" }}>Enter New Password</h3>
                    <Form >
                        <Form.Group  >
                            <Form.Label className="customBoldFont inputLabel">Password</Form.Label>
                            <Form.Control className="inputField" name="Password" id="Password" type="password" rows={5} value={password} onInput={(event) => { ValidationOnChange(event); }} isInvalid={invalidPassword} />
                        </Form.Group>
                        {invalidPassword ? <div className="incorrectPasswordDiv"><label>Password should be greater than 7</label></div> : null}

                        <Form.Group className="mt-3 mb-2" >
                            <Form.Label className="customBoldFont inputLabel">Re-enter Password</Form.Label>
                            <Form.Control className="inputField" name="Password2" id="Password" type="password" rows={5} value={password2} onInput={(event) => { ValidationOnChange(event); }} isInvalid={invalidPassword2} />
                        </Form.Group>
                        {invalidPassword2 ? <div className="incorrectPasswordDiv"><label>Password doesnt match  or is too short</label></div> : null}
                        
                    </Form>
                    <div style={{ display: "flex", justifyContent: 'center' }}>
                        <button style={{ marginTop: "6%", border: "none", outline: "none", borderRadius: "5px", fontWeight: "bolder", backgroundColor: "#4758A0", fontFamily: "Poppins", padding: "5px 45px", color: "#FFFFFF" }} onClick={() => { submit() }}>Submit</button>
                    </div>
                </div>
                <br />
            </Container>
            {/* <Container style={{ width: "50%", marginTop: "6%", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}>
                <h3 style={{ textDecoration: "underline", margin: "10px auto", textAlign: "center", paddingTop: "20px" }}>Enter Password</h3>
                <br />
                <Form>
                    <div>
                        <Form.Group className="mb-3" >
                            <Form.Label style={{ color: "black", fontWeight: "bold" }}>Password </Form.Label>
                            <Form.Control name="Password" id="Password" type="password" rows={5} value={password} onInput={(event) => { ValidationOnChange(event); }} isInvalid={invalidPassword} />
                        </Form.Group>
                        {invalidPassword ? <h5 style={{ color: "red" }}>Password should be greater than 7</h5> : null}

                        <Form.Group className="mb-3" >
                            <Form.Label style={{ color: "black", fontWeight: "bold" }}>Confirm Password</Form.Label>
                            <Form.Control name="Password2" id="Password" type="password" rows={5} value={password2} onInput={(event) => { ValidationOnChange(event); }} isInvalid={invalidPassword2} />
                        </Form.Group>
                        {invalidPassword2 ? <h5 style={{ color: "red" }}>Password doesnt match  or is too short </h5> : null}
                    </div>
                </Form>
                <div style={{ display: "flex", justifyContent: 'center' }}>
                    <button style={{ marginTop: "2%", border: "none", outline: "none", borderRadius: "5px", fontWeight: "bolder" }} onClick={() => { submit() }} className="bn31"><span className="bn31span" style={{ borderRadius: "5px" }}>Submit</span></button>
                </div>
                <br />
            </Container> */}
        </div>
    )

}

export default ChangePassword