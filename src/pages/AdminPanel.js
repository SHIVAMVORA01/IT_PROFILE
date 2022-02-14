import React, { useState, useEffect } from "react";
import { Button, Container, Spinner, Card, Row, Col } from "react-bootstrap";
import { getEndPoint, postEndPoint } from "../components/request";
import { useHistory } from 'react-router';
import '../css/AdminPanel.css';
import uuid from 'react-uuid';
import UserNavbar from "./UserNavbar";
const AdminPanel = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [allData, setAllData] = useState([])
    const history = useHistory();
    const [display, setDisplay] = useState([]);
    const [batches, setBatches] = useState([]);
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
    }, []);

    async function checkAdmin() {
        try {
            const res = await postEndPoint('user/isAdmin', null);
            if (res.data.isAdmin && res.data.isAdmin === true) {
                setData();
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

    function searchBar(e) {
        var temp = e.target.value.toString();
        let tempVar = [];
        let tempArray = Array.from(allData);
        var i = 0;
        if (!isNaN(e.target.value) && e.target.value.length !== 0) {
            for (i = 0; i < tempArray.length; i++) {
                if (tempArray[i].sap_Id.toLowerCase().includes(temp.toLowerCase())) {
                    tempVar.push(tempArray[i]);
                }
            }

        }
        else if (e.target.value.length !== 0 && isNaN(e.target.value)) {
            for (i = 0; i < tempArray.length; i++) {
                if (tempArray[i].name.toLowerCase().includes(temp.toLowerCase())) {
                    tempVar.push(tempArray[i]);
                }
            }
        }
        else if (e.target.value.length === 0) {
            tempVar = Array.from(allData);
        }

        tempVar.sort((a, b) => {
            return a.sap_Id - b.sap_Id;
        });
        setDisplay(tempVar);

        // sap Id from e.target.value and data is available in Array allData
    }

    function getDetails(sapId) {
        history.push(`/details/${sapId}`)
    }

    async function setData() {
        setIsLoading(true);
        const response = await getEndPoint('/data', null);
        if (response) {
            let temp = [];
            let temp2 = Array.from(response.data);
            for (let i = 0; i < temp2.length; i++) {
                temp2[i].key = uuid();
                if (temp2[i].year_passed && !temp.includes(temp2[i].year_passed) && temp2[i].year_passed !== "") {
                    temp.push(temp2[i].year_passed);
                }
            }
            temp.sort((a, b) => {
                return a - b;
            });

            setBatches(temp);
            setAllData(temp2);
            setDisplay(temp2.slice(0, 20));
            setIsLoading(false);
        }
    }

    function sortData(year) {
        let temp2 = Array.from(allData);
        let temp = [];
        for (let i = 0; i < temp2.length; i++) {
            if (temp2[i].year_passed && year && temp2[i].year_passed !== "" && year !== "" && temp2[i].year_passed === year) {
                temp.push(temp2[i]);
            }
        }
        if (temp.length > 0) {
            temp.sort((a, b) => {
                return a.sap_Id - b.sap_Id;
            });
            setDisplay(temp);
        }
    }

    function logOut() {
        var tok = localStorage.getItem('token');
        if (tok) {
            localStorage.removeItem('token');
        }
        history.push('/');
    }

    return (
        <div>
            {isLoading ?
                (<center style={{ marginTop: "20%" }}>
                    <Button variant="primary" disabled>
                        <Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                        Loading...
                    </Button>
                </center>) : (<div>
                    <UserNavbar type={4} />
                    <Container>
                        <h2 className="mt-3" style={{ fontFamily: "sans-serif" }}>ADMIN PANEL</h2>
                        <div className="search">
                            <div className="SearchBar">
                                <img width="23px" alt="search" height="23px" style={{ marginBottom: "5px" }} src="https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/search-512.png" />
                                <input style={{ border: "none", outline: "none", paddingLeft: "10px", fontFamily: "-webkit-pictograph", fontSize: "20px", width: "70%" }}
                                    placeholder="SEARCH NAME OR SAP ID" onInput={(e) => { searchBar(e) }} />
                            </div>
                        </div>
                        <br />
                        {batches.length > 0 ?
                            <div style={{ padding: "0 32px", margin: "20px 0" }}>
                                <button style={{ marginLeft: "1%", marginTop: "0.5%", border: "none", outline: "none" }} onClick={() => { let tempVar = Array.from(allData); setDisplay(tempVar); }} className="bn31"><span className="bn31span">ALL</span></button>
                                {
                                    batches.map((data) => {
                                        return (
                                            <button key={uuid()} id={data} style={{ marginLeft: "1%", marginTop: "0.5%", border: "none", outline: "none" }} onClick={(event) => { sortData(data) }} className="bn31"><span className="bn31span">{data}</span></button>

                                        );
                                    })
                                }
                            </div> : null}

                        {display.length > 0 ? <Row>
                            {
                                display.map((data, index) => {
                                    return (
                                        (data.profile_pic !== '' && data.name !== '') && <Col className="profileCard" key={data.key}>
                                            <Card className="my-4" style={{ border: "none", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", textAlign: 'center' }} key={index}>
                                                <Card.Img style={{ height: "280px" }} variant="top" src={data.profile_pic} alt={data.profile_pic} />
                                                <Card.Body>
                                                    <Card.Title style={{ height: "30px" }}>
                                                        <span
                                                            className="candidateName"
                                                            style={{ color: "darkblue", paddingRight: "13px", borderBottom: "2px solid lightgray", textTransform: "uppercase", fontFamily: "-webkit-pictograph", fontWeight: "700", fontSize: '20px', marginBottom: "34px", paddingLeft: '13px' }}
                                                        >{data.name}</span>

                                                    </Card.Title>
                                                    <Card.Text>
                                                        <label style={{ fontFamily: "monospace", marginTop: "15px", fontWeight: "440", fontSize: "20px", marginBottom: "8px" }}>{data.sap_Id}</label>
                                                        <br></br>
                                                        <span style={{ fontFamily: 'auto', fontSize: "20px", fontWeight: "350" }}>{data.contact_no}</span>
                                                        <br></br>
                                                        <label style={{ fontFamily: "cursive", fontSize: "20px", fontWeight: "350", marginTop: "6px" }}>{data.year_join} - {data.year_passed}</label>
                                                    </Card.Text>
                                                    <Button onClick={() => { getDetails(data.sap_Id) }} style={{ border: "none", outline: "none", background: "#050558", fontWeight: "500", paddingLeft: "48px", paddingRight: "48px", marginTop: '15px' }}>VIEW PROFILE</Button>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    )

                                })
                            }
                        </Row> : <h4>SORRY COULDNT FIND THE PERSON</h4>}
                    </Container>
                </div>)
            }
        </div>
    )

}

export default AdminPanel;