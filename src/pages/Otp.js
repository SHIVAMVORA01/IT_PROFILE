import React, { useState, useEffect } from "react";
import { Button, Spinner, Container, Form, Toast } from "react-bootstrap";
import { postEndPoint } from "../components/request";
import { useHistory } from 'react-router';
import OkModal from "../components/Okmodal";
import UserNavbar from "./UserNavbar";
import '../css/SignIn.css';
import '../css/AdminPanel.css';
const Otp = () => {
    const [otp, setOtp] = useState("");
    const [invalidOtp, setinvalidOtp] = useState(false);
    const [showError, setShowError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [errMsg, setErrMsg] = useState("OOPS AN ERROR OCCURED TRY AGAIN LATER!!");
    const history = useHistory();

    useEffect(() => {
        if (!(localStorage.getItem('sapIdForOtp'))) {
            history.replace('/')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    function ValidationOnChange(event) {
        setOtp(event.target.value);
        if (event.target.value.length > 0) {
            setinvalidOtp(false);
        }
        else {
            setinvalidOtp(true);
        }
    }
    async function submit() {
        if (otp.length > 0) {
            try {
                setIsLoading(true);
                const response = await postEndPoint('/user/check-otp', {
                    otp: otp.toString(),
                    sap_Id: localStorage.getItem('sapIdForOtp')
                }, null);
                setIsLoading(false);
                if (response) {

                    if (response.status === 200) {
                        showOkModal();
                        console.log(response)
                    }
                }
                else {
                    setShowError(true);
                    console.log(response)
                }
            }
            catch (err) {
                setIsLoading(false);
                if (err.response.data.msg) {
                    setErrMsg(err.response.data.msg);
                    setShowError(true);
                }
                else {
                    setErrMsg("OOPS AN ERROR OCCURED TRY AGAIN LATER!!");
                    setShowError(true);
                }
            }

        } else {
            setinvalidOtp(true);
        }
    }

    function handleModalOk() {
        setShowModal(false);
        localStorage.setItem('otpPermission', 'true');
        history.replace('/change-password');
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
        </Button> </center> : <>
            <OkModal show={showModal} title={"Go ahead and change password"} handleOk={handleModalOk}></OkModal>
            <div style={{ position: "fixed", bottom: "2%", right: "3%" }}>
                <Toast onClose={() => setShowError(false)} show={showError} delay={3000} autohide bg="danger">
                    <Toast.Body style={{ fontWeight: "bold", color: "white" }}>{errMsg}</Toast.Body>
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
                    <h3 style={{ margin: "30px auto", marginBottom: "0px", paddingTop:"16px",paddingBottom:"20px",textAlign: "center", fontSize: "36px", lineHeight: "54px", fontWeight: "600", fontFamily: "Poppins", color: "#293E6F", marginTop: "15px" }}>Enter Otp</h3>
                    <Form >
                        <Form.Group  >
                            <Form.Label className="customBoldFont inputLabel">Otp</Form.Label>
                            <Form.Control className="inputField" name="SapId" id="SapId" type="number" rows={5} value={otp} onInput={(event) => { ValidationOnChange(event); }} isInvalid={invalidOtp} />
                        </Form.Group>
                        {invalidOtp ? <div className="incorrectPasswordDiv"><label>Invalid value entered</label></div> : null}
                        
                    </Form>
                    <div style={{ display: "flex", justifyContent: 'center' }}>
                        <button style={{ marginTop: "6%", border: "none", outline: "none", borderRadius: "5px", fontWeight: "bolder", backgroundColor: "#4758A0", fontFamily: "Poppins", padding: "5px 45px", color: "#FFFFFF" }} onClick={() => { submit() }}>Submit</button>
                    </div>
                </div>
                <br />
            </Container>
            {/* <Container style={{ width: "50%", marginTop: "6%", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}>
                <h3 style={{ textDecoration: "underline", margin: "10px auto", textAlign: "center", paddingTop: "20px" }}>Enter OTP</h3>
                <br />
                <Form>

                    <div>
                        <Form.Group className="mb-3" >
                            <Form.Label style={{ color: "black", fontWeight: "bold" }}>OTP</Form.Label>
                            <Form.Control name="SapId" id="SapId" type="number" rows={5} value={otp} onInput={(event) => { ValidationOnChange(event) }} isInvalid={invalidOtp} />
                        </Form.Group>
                        {invalidOtp ? <h5 style={{ color: "red" }}>Invalid value entered</h5> : null}
                    </div>
                </Form>
                <div style={{ display: "flex", justifyContent: 'center' }}>
                    <button style={{ marginTop: "2%", border: "none", outline: "none", borderRadius: "5px", fontWeight: "bolder" }} onClick={() => { submit() }} className="bn31"><span className="bn31span" style={{ borderRadius: "5px" }}>Submit</span></button>
                </div>

                <br />

            </Container> */}
        </>
    )

}

export default Otp