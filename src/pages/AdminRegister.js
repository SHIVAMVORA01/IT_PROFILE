
import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { Alert, Button, Container, Spinner, Col, Toast, Row, Form } from "react-bootstrap";
import { postEndPoint } from "../components/request";
import { useHistory } from 'react-router';
import uuid from 'react-uuid';
import '../css/AdminRegister.css'
import UserNavbar from "./UserNavbar";

function RegisterUsers() {
  const [items, setItems] = useState([]);
  const [registered, setRegistered] = useState([]);
  const [show, setShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const CurrentYear = new Date().getFullYear();
  const [sapId, setSapId] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [yearOfJoining, setYearOfJoining] = useState(CurrentYear - 3);
  const [yearOfPassing, setYearOfPassing] = useState(CurrentYear + 1);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidSapId, setinvalidSapId] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [isSingle, setIsSingle] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const history = useHistory();
  //const SapIDRegex = /^[60003]{5}/;
  var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  useEffect(() => {
    setIsLoading(true);
    var tok = localStorage.getItem('token');
    if (tok) {
      checkAdmin();
    }
    else {
      history.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function checkAdmin() {
    try {
      const res = await postEndPoint('user/isAdmin', null);
      if (res.data.isAdmin && res.data.isAdmin === true) {
        if (res.data.isSuperAdmin) {
          setIsSuperAdmin(true);
        }
        setIsLoading(false);
      }
      else {
        logOut();
      }
    }
    catch (err) {
      console.log(err);
      logOut();
    }
  }


  function ValidationOnChange(event) {
    switch (event.target.name) {
      case "Email":
        setEmail(event.target.value);
        if (mailformat.test(event.target.value) === true) {
          setInvalidEmail(false);
        }
        else {
          setInvalidEmail(true);
        }
        break;
      case "SapId":
        setSapId(event.target.value);
        if (sapId.length>0) {
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
    if (type === "1") {
      if (email.length > 0 && mailformat.test(email) === true && sapId.length >0 && password.length > 7) {
        try {
          setIsLoading(true);
          const data = [
            {
              email: email,
              sap_Id: sapId.toString(),
              password: password,
              year_join: yearOfJoining,
              year_passed: yearOfPassing,
              isAdmin: isAdmin,
            }
          ]
          const response = await postEndPoint('/user/register', {
            data
          }, null);
          if (response) {
            setIsLoading(false);
            if (response.status === 200) {
              setShow(true);
            }
          }
          else {
            setIsLoading(false);
            setMessage("OOPS AN ERROR OCCURED TRY AGAIN LATER!!");
            setShowError(true);
          }
        }
        catch (err) {
          setIsLoading(false);
          if (err.response.data.msg) {
            setMessage(err.response.data.msg);
          }
          else {
            setMessage("OOPS AN ERROR OCCURED TRY AGAIN LATER!!");
          }
          setShowError(true);
        }

      }
      else {
        if (sapId.length<=0) {
          setinvalidSapId(true);
        }
        if (password.length <= 7) {
          setInvalidPassword(true);
        }
        if (mailformat.test(email) === false) {
          setInvalidEmail(true);
        }
      }
    }
    else {
      setIsLoading(true);
      try {
        const response = await postEndPoint('/user/register', {
          data: items,
        }, null);
        setItems([]);
        if (response) {
          setIsLoading(false);
          if (response.status === 200) {
            setShow(true);
            if (response.data.existedUser.length > 0) {
              var temp = Array.from(response.data.existedUser);
              setRegistered(temp);
              setShowAlert(true);
            }
          }
        }
        else {
          setIsLoading(false);
          setMessage("OOPS AN ERROR OCCURED TRY AGAIN LATER!!");
          setShowError(true);
        }
      }
      catch (err) {
        setIsLoading(false);
        if (err.response.data.msg) {
          setMessage(err.response.data.msg);
        }
        else {
          setMessage("OOPS AN ERROR OCCURED TRY AGAIN LATER!!");
        }
        setShowError(true);
      }
    }
  }

  function logOut() {
    var tok = localStorage.getItem('token');
    if (tok) {
      localStorage.removeItem('token');
    }
    history.replace('/');
  }

  const readExcel = (file) => {
    setItems([]);
    try {
      const promise = new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);
        fileReader.onload = (e) => {
          const bufferArray = e.target.result;
          const wb = XLSX.read(bufferArray, { type: "buffer" });
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          const data = XLSX.utils.sheet_to_json(ws);
          resolve(data);
        };

        fileReader.onerror = (error) => {
          reject(error);
        };
      });

      promise.then((d) => {
        var temp = []
        for (var i = 0; i < d.length; i++) {
          if (typeof (d[i].sap_Id) !== 'undefined' && typeof d[i].email !== 'undefined' && typeof (d[i].year_join) !== 'undefined' && typeof (d[i].year_passed) !== 'undefined') {
            temp.push(d[i]);
          }
        }
        if (temp.length > 0) {
          setItems(temp);
        }
        else {
          setMessage("WRONG FORMAT OF EXCEL");
          setShowError(true);
        }
      });
    }
    catch (e) {
      setMessage("OOPPS ERROR");
      setShowError(true);
    }
  };





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
      <div style={{ position: "fixed", bottom: "2%", right: "3%" }}>
        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide bg="success">
          <Toast.Body style={{ fontWeight: "bold", color: "white" }}>Successfully uploaded!</Toast.Body>
        </Toast>
      </div>

      <div style={{ position: "fixed", bottom: "2%", right: "3%" }}>
        <Toast onClose={() => setShowError(false)} show={showError} delay={3000} autohide bg="danger">
          <Toast.Body style={{ fontWeight: "bold", color: "white" }}>{message}</Toast.Body>
        </Toast>
      </div>

      <UserNavbar type={5} />

      <br />

      <Alert show={showAlert} variant="danger">
        <Alert.Heading>Warning</Alert.Heading>
        <p> Some users are already registered !!!
          They are :</p>
        {registered.map((val) => {
          return (<p key={val}>{val}</p>);
        })}
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShowAlert(false)} variant="outline-success">
            Close
          </Button>
        </div>
      </Alert>


      <div className="registrationButtons">
        <button style={{ marginTop: "2%", border: "none", outline: "none", borderRadius: "5px", fontWeight: "bolder", width: "14rem" }} onClick={() => { setIsSingle(false); setItems([]); }} className="bn31"><span className="bn31span" style={{ borderRadius: "5px" }}>Register Batch</span></button>
        <button style={{ marginTop: "2%", border: "none", outline: "none", borderRadius: "5px", fontWeight: "bolder", width: "18rem" }} onClick={() => { setIsSingle(true); setItems([]); }} className="bn31"><span className="bn31span" style={{ borderRadius: "5px" }}>Register Single User</span></button>
      </div>
      {isSingle ? <Container style={{ width: "50%", marginTop: "3%", marginBottom: "5%", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}>
        <h3 style={{ textDecoration: "underline" }}>REGISTER</h3>
        <Form >
          <Form.Group className="mb-3" >
            <Form.Label className="boldTexts">Enter Email </Form.Label>
            <Form.Control name="Email" id="Email" type="email" rows={5} value={email} onInput={(event) => { ValidationOnChange(event); }} isInvalid={invalidEmail} />
          </Form.Group>
          {invalidEmail ? <h5 style={{ color: "red" }}>Invalid value entered</h5> : null}


          <Form.Group className="mb-3" >
            <Form.Label className="boldTexts">SAP ID</Form.Label>
            <Form.Control name="SapId" id="SapId" type="number" rows={5} value={sapId} onInput={(event) => { ValidationOnChange(event); }} isInvalid={invalidSapId} />
          </Form.Group>
          {invalidSapId ? <h5 style={{ color: "red" }}>Invalid value entered</h5> : null}

          <Form.Group className="mb-3" >
            <Form.Label className="boldTexts">Password </Form.Label>
            <Form.Control name="Password" id="Password" type="password" rows={5} value={password} onInput={(event) => { ValidationOnChange(event); }} isInvalid={invalidPassword} />
          </Form.Group>
          {invalidPassword ? <h5 style={{ color: "red" }}>Password should be greater than 7</h5> : null}

          {isAdmin === false ? <Form.Group className="mb-3" >
            <Form.Label className="boldTexts">Year of Joining <label style={{ color: "red" }}>*</label></Form.Label>
            <Form.Select aria-label="Default select example" value={yearOfJoining} onInput={(event) => { setYearOfJoining(Number(event.target.value)); setYearOfPassing(Number(event.target.value) + 4); }}>
              <option value={CurrentYear} >{CurrentYear}</option>
              <option value={CurrentYear - 1} >{CurrentYear - 1}</option>
              <option value={CurrentYear - 2}>{CurrentYear - 2}</option>
              <option value={CurrentYear - 3}>{CurrentYear - 3}</option>
            </Form.Select>
          </Form.Group> : null}

          {isAdmin === false ?
            <Form.Group className="mb-3" >
              <Form.Label className="boldTexts">Year of Passing <label style={{ color: "red" }}>*</label></Form.Label>
              <Form.Select aria-label="Default select example" value={yearOfPassing} onInput={(event) => { setYearOfPassing(Number(event.target.value)); }} >
                <option value={Number(yearOfJoining) + 4} >{Number(yearOfJoining) + 4}</option>
                <option value={Number(yearOfJoining) + 3} >{Number(yearOfJoining) + 3}</option>
              </Form.Select>
            </Form.Group> : null}

          {isSuperAdmin ? <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check value={isAdmin} type="checkbox" placeholder="Is Admin" label="is Admin" onClick={() => { setIsAdmin(!isAdmin); }} />
          </Form.Group> : null}
          <br />

        </Form>

        <Button style={{ fontSize: "16px", backgroundColor: "rgb(5, 5, 88)", color: "#fff", border: "none", outline: "none" }} onClick={() => { submit("1"); }} >SIGN UP</Button>
        <br />
        <br />
      </Container> : <div>

        <Container style={{ marginTop: "9%", paddingTop: "1%", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}>

          <h4 >Batch Registeration</h4>

          <Form.Control
            type="file"
            onInput={(e) => {
              const file = e.target.files[0];
              readExcel(file);
            }}
            accept=".xlsx"
            placeholder="Upload file"
            style={{ marginTop: "2%" }}
          />

          {items.length > 0 ? <Button style={{ marginTop: "2%", fontSize: "16px", backgroundColor: "rgb(5, 5, 88)", color: "#fff", border: "none", outline: "none" }} onClick={() => { submit("2"); }}> Submit </Button> : null}

          <br />

          <br />

          {items.length > 0 ?

            <div><h4>Preview</h4>
              <br />

              <Container>

                <Row>
                  <Col style={{ fontWeight: "bold" }}>SAP ID</Col>
                  <Col style={{ fontWeight: "bold" }} >EMAIL</Col>
                  <Col style={{ fontWeight: "bold" }}>YEAR OF JOINING</Col>
                  <Col style={{ fontWeight: "bold" }}>YEAR OF PASSING</Col>
                </Row>

                {items.map((value) => {
                  return (
                    <Row key={uuid()}>
                      <Col >{value.sap_Id}</Col>
                      <Col >{value.email}</Col>
                      <Col>{value.year_join}</Col>
                      <Col>{value.year_passed}</Col>
                    </Row>);
                })}
                <br />
              </Container>
            </div> : null}
        </Container>
      </div>}
    </div>
  )
}
export default RegisterUsers;