import React, { useState, useEffect } from "react";
import { Button, Container, Form, Toast, Spinner } from "react-bootstrap";
import { postEndPoint } from "../components/request";
import { useHistory } from 'react-router';
import '../css/SignIn.css';
import '../css/AdminPanel.css';
import UserNavbar from "./UserNavbar";
const Signin = () => {
    const [sapId, setSapId] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [invalidSapId, setinvalidSapId] = useState(false);
    const [invalidPassword, setInvalidPassword] = useState(false);
    const [show, setShow] = useState(false);
    const [showError, setShowError] = useState(false);
    const [showForgotSapId, setForgotSapId] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errMsg, setErrMsg] = useState("OOPS AN ERROR OCCURED TRY AGAIN LATER!!");
    const history = useHistory();
    const SapIDRegex = /^[60003]{5}/;
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    useEffect(() => {
        var tok = localStorage.getItem('token');
        if (tok) {
            localStorage.removeItem('token'); 
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function ValidationOnChange(event) {
        switch (event.target.name) {
            case "Email":
                setEmail(event.target.value);
                if (mailformat.test(event.target.value) === true) {
                    // setInvalidEmail(false);
                }
                else {
                    //setInvalidEmail(true);
                }
                break;
            case "SapId":
                setSapId(event.target.value);
                if (event.target.value.length > 0) {
                    setinvalidSapId(false);
                }
                else {
                    setinvalidSapId(true);
                }
                break;
            case "Password":
                setPassword(event.target.value);
                if (event.target.value.length > 7) {
                    setInvalidPassword(false);
                }
                else {
                    setInvalidPassword(true);
                }
                break;
            default:
                break;
        }
    }
    async function submit(type) {
        var tok = localStorage.getItem("token");
        if (tok) {
            localStorage.removeItem("token");
        }
        if (type === 1) {
            if (sapId.length > 0 && password.length > 7) {
                setIsLoading(true);
                try {
                    const response2 = await postEndPoint('/user/login', {
                        password: password,
                        sap_Id: sapId.toString(),
                    }, null);
                    if (response2) {
                        if (response2.status === 200 && response2.data.token) {
                            localStorage.setItem('token', response2.data.token);
                            setIsLoading(false);
                            if (response2.data.isAdmin) {
                                localStorage.setItem('isAdmin',true);
                                history.push('/admin-panel');
                               
                            } else {
                                localStorage.setItem('isAdmin',false);
                                history.push('/welcome');
                               
                            }

                        }
                    }
                    else {
                        setIsLoading(false);
                        setErrMsg("OOPS AN ERROR OCCURED TRY AGAIN LATER!!");
                        setShowError(true);
                    }
                }
                catch (err) {
                    setIsLoading(false);
                    if (typeof (err.response) !== 'undefined' && typeof (err.response.data) !== 'undefined' && typeof (err.response.data.msg) !== 'undefined') {
                        setErrMsg(err.response.data.msg);
                        setShowError(true);
                    }
                    else {
                        setErrMsg("OOPS AN ERROR OCCURED TRY AGAIN LATER!!");
                        setShowError(true);
                    }
                }
            }
            else {
                if (sapId.length <= 0) {
                    setinvalidSapId(true);
                }
                if (password.length <= 7) {
                    setInvalidPassword(true);
                }
            }
        }
        else if (type === 2) {
            if (email.length > 0 && mailformat.test(email) === true && SapIDRegex.test(sapId) === true && sapId.length === 11 && password.length > 7) {
                try {
                    setIsLoading(true);
                    const response = await postEndPoint('/user/register', {
                        email: email,
                        sap_Id: sapId.toString(),
                        password: password,
                    }, null);
                    if (response) {
                        setIsLoading(false);
                        if (response.status === 200) {
                            setShow(true);
                        }
                    }
                    else {
                        setIsLoading(false);
                        setShowError(true);
                    }
                }
                catch (err) {
                    setIsLoading(false);
                    setShowError(true);
                }

            }
            else {
                if (sapId.length > 0) {
                    setinvalidSapId(true);
                }
                if (password.length <= 7) {
                    setInvalidPassword(true);
                }
                if (mailformat.test(email) === false) {
                    //setInvalidEmail(true);
                }
            }
        }
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

            <div className="customToast">
                <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide bg="success">
                    <Toast.Body className="customBoldFont">Successfully Registered Please Check Email and Verify to Login!</Toast.Body>
                </Toast>
            </div>

            <div className="customToast">
                <Toast onClose={() => setShowError(false)} show={showError} delay={3000} autohide bg="danger">
                    <Toast.Body className="customBoldFont">{errMsg}</Toast.Body>
                </Toast>
            </div>

            <div className="customToast">
                <Toast onClose={() => setForgotSapId(false)} show={showForgotSapId} delay={3000} autohide bg="info">
                    <Toast.Body className="customBoldFont">Please Contact IT Department for Your Sap ID!</Toast.Body>
                </Toast>
            </div>
            <div>
                <UserNavbar type={1} />
            </div>
            <br />
            <Container className="customLoginBorder" style={{ width: "620px", height: "550px", boxShadow: "1.5px 1.5px 7px 3px rgba(0,0,0,0.2)", borderRadius: "40px" }}>
                <div style={{ position: "relative", top: "-80px" }}>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "170px", height: "170px", backgroundColor: "#fff", borderRadius: "50%", boxShadow: "4px 4px 7px 3px rgba(0,0,0,0.25)" }}>
                            <img style={{ borderRadius: "50%" }} height="160px" width="180px" alt="logo" src="/images/itcollege_logo.svg"></img>
                        </div>
                    </div>
                    <h3 style={{ margin: "30px auto", marginBottom: "15px", textAlign: "center", fontSize: "36px", lineHeight: "54px", fontWeight: "600", fontFamily: "Poppins", color: "#293E6F", marginTop: "15px" }}>Welcome Back</h3>
                    <Form >
                        <Form.Group className="mt-4" >
                            <Form.Label className="customBoldFont inputLabel">Sap ID</Form.Label>
                            <Form.Control className="inputField" name="SapId" id="SapId" type="number" rows={5} value={sapId} onInput={(event) => { ValidationOnChange(event); }} isInvalid={invalidSapId} />
                        </Form.Group>
                        {invalidSapId ? <div className="incorrectPasswordDiv"><label>Invalid value entered</label></div> : null}
                        <Form.Group className="mt-4" >
                            <Form.Label className="inputLabel">Password</Form.Label>
                            <Form.Control className="inputField" name="Password" id="Password" type="password" rows={5} value={password} onInput={(event) => { ValidationOnChange(event); }} isInvalid={invalidPassword} />
                        </Form.Group>

                        {invalidPassword ? <div className="incorrectPasswordDiv"><label>Password should be greater than 7</label></div> : null}
                        <div className="forgotPasswordDiv"><label onClick={() => { history.push('/forgotPassword') }}>Forgot your Password</label></div>
                    </Form>
                    <div style={{ display: "flex", justifyContent: 'center' }}>
                        <button style={{ marginTop: "5%", border: "none", outline: "none", borderRadius: "5px", fontWeight: "bolder", backgroundColor: "#4758A0", fontFamily: "Poppins", padding: "5px 45px", color: "#FFFFFF" }} onClick={() => { submit(1); }}>Login</button>
                    </div>
                </div>
                <br />
            </Container>
        </div>
    );
}
export default Signin;