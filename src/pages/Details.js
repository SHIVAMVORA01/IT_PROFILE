import React, { useState, useEffect } from "react";
import { Button, Container, Spinner, Toast, Row, Col } from "react-bootstrap";
import { getEndPoint, postEndPoint, deleteEndPoint } from "../components/request";
import { useHistory } from 'react-router';
import uuid from 'react-uuid'
import '../css/Details.css';
import { FiEdit2, AiFillDelete } from 'react-icons/all';
import DeleteUserModal from "./DeleteUserModal";
import EditUserModal from "./EditUserModal";
import UserNavbar from "./UserNavbar";
const Details = (props) => {

    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([])
    const history = useHistory();
    const [contribution, setContribution] = useState("");
    const [futureContribution, setFutureContribution] = useState("");
    const [cultural, setCultural] = useState("");
    const [sports, setSports] = useState("");
    const [nss, setNss] = useState("");
    const [cgpa, setCgpa] = useState([]);
    const [resume, setResume] = useState("");
    const [gre, setGre] = useState("");
    const [ielts, setIelts] = useState("");
    const [gate, setGate] = useState("");
    const [cat, setCat] = useState("");
    const [gmat, setGmat] = useState("");
    const [tofel, setTofel] = useState("");
    const [internship, setInternship] = useState([]);
    const [achievements, setAchievements] = useState([]);
    const [researchPapers, setResearchPapers] = useState([]);
    const [coursera,setCoursera]=useState([]);
    const [projects, setProjects] = useState([]);
    const [showError, setShowError] = useState(false);
    const [message, setMessage] = useState("");
    const [modal, setModal] = useState(false)
    const [editmodal, setEditModal] = useState(false)
    const [msg, setMsg] = useState("");
    const [isSuperAdmin, setIsSuperAdmin] = useState(false);

    useEffect(() => {
        checkAdmin();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const toggle = () => {
        setModal(!modal)
    }
    const cancel = () => {
        setModal(!modal)
    }

    const edittoggle = () => {
        setEditModal(!editmodal)
    }
    const editcancel = () => {
        setEditModal(!editmodal)
    }

    async function checkAdmin() {
        try {
            const res = await postEndPoint('user/isAdmin', null);
            if (res.data.isAdmin && res.data.isAdmin === true) {
                if (res.data.isSuperAdmin) {
                    setIsSuperAdmin(true);
                }
                setUserData(props.match.params.sapId);
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

    const deleteDetails = async (sapId) => {
        try {
            const response = await deleteEndPoint(`/data/${sapId}`, {
            }, null);
            const { data } = response;
            if (data) {
                setIsLoading(false);
                setModal(!modal);
                window.location.replace(`/admin-panel`)
            }
            else {
                setIsLoading(false);
                setMessage("OOPS WE RAN INTO ERROR!!!");
                setShowError(true);
            }
        }
        catch (err) {
            setIsLoading(false);
            setModal(!modal)
            if (err.response.data.msg) {
                setMessage(err.response.data.msg);
                setShowError(true);
            }
            else {
                setMessage("OOPS AN ERROR OCCURED TRY AGAIN LATER!!");
                setShowError(true);
            }
        }
    }



    const editDetails = async (initialSapId, sapId, yearOfJoining, yearOfPassing) => {
        try {
            const year_join = yearOfJoining
            const year_passed = yearOfPassing
            const sap_Id = sapId

            const response = await postEndPoint(`/data/${initialSapId}`, {
                year_join, year_passed, sap_Id
            }, null);
            const { data } = response;
            if (data) {
                setIsLoading(false);

                window.location.replace(`/details/${sap_Id}`)
            }
            else {
                setIsLoading(false);
                setMessage("OOPS WE RAN INTO ERROR!!!");
                setShowError(true);
            }
        }
        catch (err) {
            setIsLoading(false);
            setEditModal(!editmodal)
            if (err.response.data.msg) {
                setMessage(err.response.data.msg);
                setShowError(true);
            }
            else {
                setMessage("OOPS AN ERROR OCCURED TRY AGAIN LATER!!");
                setShowError(true);
            }
        }
    }

    async function setUserData(sapId) {
        setIsLoading(true);
        const response = await getEndPoint(`/data/${sapId}`, null);
        if (response) {
            setData(response.data);
            setIsLoading(false);
            setContribution(response.data.contribution);
            setCultural(response.data.cultural_activities);
            setNss(response.data.NSS_activities);
            setSports(response.data.sports_activities);
            setFutureContribution(response.data.further_contributions);
            setCat(response.data.cat);
            setGre(response.data.gre);
            setIelts(response.data.ielts);
            setGate(response.data.gate);
            setTofel(response.data.tofel);
            setGmat(response.data.gmat);

            if(response.data.resume&&response.data.resume.length>0){
              setResume(response.data.resume);
            }
              
            if (response.data.academic_cgpa && response.data.academic_cgpa.length > 0) {
                let temp = Array.from(response.data.academic_cgpa);
                setCgpa(temp);
            }
            if (response.data.internships.length > 0) {
                let temp1 = Array.from(response.data.internships);
                for (let i = 0; i < temp1.length; i++) {
                    temp1[i].key = uuid();
                }
                setInternship(temp1);
            }
            if (response.data.achievements.length > 0) {
                let temp2 = Array.from(response.data.achievements);
                for (let i = 0; i < temp2.length; i++) {
                    temp2[i].key = uuid();
                }
                setAchievements(temp2);
            }
            if (response.data.publications.length > 0) {
                let temp3 = Array.from(response.data.publications);
                for (let i = 0; i < temp3.length; i++) {
                    temp3[i].key = uuid();
                }
                setResearchPapers(temp3);
            }
            if (response.data.projects.length > 0) {
                let temp4 = Array.from(response.data.projects);
                for (let i = 0; i < temp4.length; i++) {
                    temp4[i].key = uuid();
                }
                setProjects(temp4);
            }
            if (response.data.coursera&&response.data.coursera.length> 0) {
                let temp5 = Array.from(response.data.coursera);
                for (let i = 0; i < temp5.length; i++) {
                    temp5[i].key = uuid();
                }
                setCoursera(temp5);
            }
        }

        else {
            setIsLoading(false);
        }
    }

    function showDeleteModal() {
        setMsg("Are you sure you want to delete this user?");
        setModal(true);
    }

    function showEditModal() {
        setMsg("Are you sure you want to edit this user ?");
        setEditModal(true);
    }

    function logOut() {
        var tok = localStorage.getItem('token');
        if (tok) {
            localStorage.removeItem('token');
        }
        history.replace('/');
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
                </center>) : (
                    <div>
                    <UserNavbar type={5} />
                        <div>
                            <div className="customToasts">
                                <Toast onClose={() => setShowError(false)} show={showError} delay={3000} autohide bg="danger">
                                    <Toast.Body style={{ fontWeight: "bold", color: "white" }}>{message}</Toast.Body>
                                </Toast>
                            </div>
                            <Container className="customContainerWrapper">
                                <DeleteUserModal
                                    msg={msg}
                                    toggle={toggle}
                                    modal={modal}
                                    cancel={cancel}
                                    deleteDetails={() => { deleteDetails(data.sap_Id); }}
                                />
                                <EditUserModal
                                    msg={msg}
                                    toggle={edittoggle}
                                    modal={editmodal}
                                    cancel={editcancel}
                                    year_join={data.year_join}
                                    year_passed={data.year_passed}
                                    sapId={data.sap_Id}
                                    editDetails={editDetails}
                                />
                                <Row>
                                    <Col xs={7} sm={8} md={3} style={{
                                        marginBottom: "1%",
                                        marginTop: "1%",
                                        textAlign: 'center'

                                    }}
                                    >
                                        <img alt="profilePic" className="profilePic" src={data.profile_pic} />
                                    </Col>
                                    <Col xs={10} sm={12} md={9} style={{ marginTop: "1%", }} className="personal-details">
                                        <div className="customHeading">
                                            {/* FiEdit2,AiFillDelete */}
                                            <div style={{ display: "flex", alignItems: 'center', justifyContent: 'space-between' }}>
                                                {data.name}
                                                {isSuperAdmin ? <div style={{ display: "flex", alignItems: 'center', justifyContent: 'space-between' }}>
                                                    <FiEdit2 onClick={() => showEditModal()} style={{ color: "#032a81", cursor: "pointer" }} fontSize="24px" />
                                                    <AiFillDelete onClick={() => showDeleteModal()} style={{ marginLeft: "20px", color: "rgb(213 43 16)", cursor: "pointer" }} />
                                                </div> : <div />}
                                            </div>

                                            <p
                                                style={{ fontFamily: "cursive", fontSize: "23px", fontWeight: "300" }}>
                                                ({data.year_join} - {data.year_passed})
                                            </p>
                                        </div>
                                        <br />
                                        <p className="customSapId"><span className="customSpan">SAP ID</span> : {data.sap_Id}</p>
                                        <span
                                            style={{ paddingLeft: "1%", fontFamily: 'auto', fontSize: "20px", fontWeight: "350" }}
                                        >
                                            <span style={{ fontFamily: "monospace", fontWeight: "900", color: "#032a81" }}>CONTACT NO.</span> : {data.contact_no}
                                        </span>
                                        {resume&&resume.length>0?<p className="customUploadTag"><span className="customSpan">RESUME</span> : <a href={resume} rel="noreferrer" target="_blank"> LINK </a></p>:null}

                                        <p className="customDetails"><span className="customSpan">EMAIL ID</span> : {data.email}</p>

                                        <p className="customUploadTag"><span className="customSpan">LINKEDIN ID</span> : <a href={data.linkedin} rel="noreferrer" target="_blank"> LINK</a></p>

                                        {contribution && contribution.length > 0 ? <p className="customDetails"><span className="customSpan">DEPARTMENT CONTRIBUTION</span> : {contribution}</p> : null}
                                    </Col>
                                </Row>
                            </Container>

                            {cgpa.length > 0 ?
                                <Container className="customBox">
                                    <Col xs={10} sm={12} md={12} style={{ marginTop: "1%", }} className="personal-details">
                                        <div className="customHeading">
                                            CGPA
                                        </div>
                                        <br />
                                        {cgpa.map((value, index) => {

                                            if (value !== null) {
                                                return (
                                                    <div key={index}>

                                                        <p className="customSapId"><span className="customSpan">SEM {index + 3}</span>: {value}</p>

                                                    </div>
                                                );
                                            }
                                            else {
                                                return null;
                                            }
                                        })
                                        }
                                        <br />
                                    </Col>

                                </Container> : null}
                            {internship.length > 0 ?
                                <Container className="customBox">
                                    <Col xs={10} sm={12} md={12} style={{ marginTop: "1%", paddingBottom: "20px" }} className="personal-details">
                                        <div className="customHeading">
                                            Internship Details
                                        </div>
                                        <br />
                                        {internship.map((value, index) => {
                                            return (
                                                <div key={value.key}>
                                                    <p className="customSapId"><span className="customSpan">COMPANY NAME</span> : {value.name}</p>


                                                    <p className="customDetails"><span className="customSpan">ROLE</span> : {value.role}</p>
                                                    <p className="customDetails"><span className="customSpan">DESCRIPTION</span> : {value.description}</p>
                                                    <p className="customUploadTag"><span className="customSpan">PROOF</span> : <a href={value.proof_link} rel="noreferrer" target="_blank"> View Uploaded Document</a></p>

                                                    {internship.length - 1 !== index && <hr style={{ marginLeft: "35px", marginRight: "35px", height: "1px" }}></hr>}

                                                </div>
                                            )
                                        })
                                        }
                                    </Col>

                                </Container> : null}

                                {coursera.length > 0 ?
                                <Container className="customBox">
                                    <Col xs={10} sm={12} md={12} style={{ marginTop: "1%", paddingBottom: "20px" }} className="personal-details">
                                        <div className="customHeading">
                                            Coursera Courses
                                        </div>
                                        <br />
                                        {coursera.map((value, index) => {
                                            return (
                                                <div key={value.key}>
                                                    <p className="customDetails"><span className="customSpan">Course Name</span> : {value.course_name}</p>
                                                    <p className="customDetails"><span className="customSpan">University/Company</span> : {value.university}</p>
                                                    <p className="customDetails"><span className="customSpan">Duration(in weeks)</span> : {value.duration}</p>
                                                    <p className="customDetails"><span className="customSpan">Semester when course was completed</span> : {value.sem}</p>
                                                    <p className="customDetails"><span className="customSpan">Course Level</span> : {value.level}</p>
                                                    <p className="customUploadTag"><span className="customSpan">Certificate Link </span> : <a href={value.cert_link} rel="noreferrer" target="_blank">Certificate Link </a></p>
                                                    {coursera.length - 1 !== index && <hr style={{ marginLeft: "35px", marginRight: "35px", height: "1px" }}></hr>}
                                                </div>
                                            )
                                        })
                                        }
                                    </Col>
                                </Container> : null}
                                
                            {projects.length > 0 ?
                                <Container className="customBox">

                                    <Col xs={10} sm={12} md={12} style={{ marginTop: "1%", paddingBottom: "20px" }} className="personal-details">
                                        <div className="customHeading">
                                            Projects
                                        </div>
                                        <br />
                                        {projects.map((value, index) => {
                                            return (
                                                <div key={value.key}>
                                                    <p className="customDetails"><span className="customSpan">TITLE</span> : {value.title}</p>
                                                    <p className="customDetails"><span className="customSpan">DESCRIPTION</span> : {value.description}</p>
                                                    <p className="customUploadTag"><span className="customSpan">PROJECT LINK</span> : <a href={value.project_link} rel="noreferrer" target="_blank">PROJECT LINK</a></p>
                                                    {projects.length - 1 !== index && <hr style={{ marginLeft: "35px", marginRight: "35px", height: "1px" }}></hr>}
                                                </div>
                                            )
                                        })
                                        }
                                    </Col>
                                </Container> : null}


                            {researchPapers.length > 0 ?
                                <Container className="customBox">

                                    <Col xs={10} sm={12} md={12} style={{ marginTop: "1%", paddingBottom: "20px" }} className="personal-details">
                                        <div className="customHeading">
                                            RESEARCH PAPERS
                                        </div>
                                        <br />
                                        {researchPapers.map((value, index) => {
                                            return (
                                                <div key={value.key}>
                                                    <p className="customDetails"><span className="customSpan">TITLE</span> : {value.title}</p>
                                                    <p className="customDetails"><span className="customSpan">PUBLICATION</span> : {value.publication}</p>
                                                    <p className="customDetails"><span className="customSpan">CONFERENCE/JOURNAL</span> : {value.conference}</p>
                                                    <p className="customDetails"><span className="customSpan">AUTHORS</span> : {value.author}</p>
                                                    <p className="customDetails"><span className="customSpan">YEAR</span> : {value.year}</p>
                                                    {researchPapers.length - 1 !== index && <hr style={{ marginLeft: "35px", marginRight: "35px", height: "1px" }}></hr>}
                                                </div>
                                            )
                                        })
                                        }
                                    </Col>
                                </Container> : null}

                            {achievements.length > 0 ? <Container className="customBox">

                                <Col xs={10} sm={12} md={12} style={{ marginTop: "1%", paddingBottom: "20px" }} className="personal-details">
                                    <div className="customHeading">
                                        Achivements Details
                                    </div>
                                    <br />
                                    {achievements.map((value, index) => {
                                        return (
                                            <div key={value.key}>
                                                <p className="customDetails"><span className="customSpan">DESCRIPTION</span> : {value.description}</p>
                                                <p className="customUploadTag"><span className="customSpan">PROOF</span> : <a href={value.proof_link} rel="noreferrer" target="_blank"> View Uploaded Document</a></p>
                                                {achievements.length - 1 !== index && <hr style={{ marginLeft: "35px", marginRight: "35px", height: "1px" }}></hr>}
                                            </div>
                                        )
                                    })
                                    }
                                </Col>
                            </Container> : null}

                            {gate.length > 0 || gre.length > 0 || ielts.length > 0 || cat.length > 0 || tofel.length > 0 || gmat.length > 0 ?
                                <Container className="customBox">
                                    <Col xs={10} sm={12} md={12} style={{ marginTop: "1%", }} className="personal-details">
                                        <div className="customHeading">
                                            COMPETITIVE EXAMS
                                        </div>
                                        <br />
                                        {gre && gre.length > 0 ? <p className="customDetails"><span className="customSpan">GRE</span>        : {gre}</p> : null}
                                        {tofel && tofel.length > 0 ? <p className="customDetails"><span className="customSpan">TOFEL</span>  : {tofel}</p> : null}
                                        {ielts && ielts.length > 0 ? <p className="customDetails"><span className="customSpan">IELTS</span>  : {ielts}</p> : null}
                                        {cat && cat.length > 0 ? <p className="customDetails"><span className="customSpan">CAT</span>               : {cat}</p> : null}
                                        {gmat && gmat.length > 0 ? <p className="customDetails"><span className="customSpan">GMAT</span>      : {gmat}</p> : null}
                                        {gate && gate.length > 0 ? <p className="customDetails"><span className="customSpan">GATE</span>       : {gate}</p> : null}
                                    </Col>
                                    <br />
                                </Container> : null}


                            {((cultural && cultural.length > 0) || (sports && sports.length > 0) || (nss && nss.length > 0)) ?
                                <Container className="customBox">
                                    <Col xs={10} sm={12} md={12} style={{ marginTop: "1%", paddingBottom: "1%" }} className="personal-details">
                                        <div style={{ paddingLeft: "1%", color: "#8b1300", borderBottom: "2px solid lightgray", textTransform: "uppercase", fontFamily: "-webkit-pictograph", fontWeight: "800", fontSize: '29px', marginBottom: "-12px" }}>
                                            Curricular Activities
                                        </div>
                                        <br />
                                        {cultural && cultural.length > 0 ? <p style={{ paddingLeft: "1%", fontFamily: "monospace", fontWeight: "440", fontSize: "20px" }}><span className="customSpan">CULTURAL ACTIVITIES</span> : {cultural}</p> : null}

                                        {sports && sports.length > 0 ? <p style={{ paddingLeft: "1%", fontFamily: "monospace", fontWeight: "440", fontSize: "20px" }}><span className="customSpan">SPORTS ACTIVITIES</span> : {sports}</p> : null}

                                        {nss && nss.length > 0 ? <p style={{ paddingLeft: "1%", fontFamily: "monospace", fontWeight: "440", fontSize: "20px" }}><span className="customSpan">NSS ACTIVITY</span> : {nss}</p> : null}
                                    </Col>

                                </Container> : null}
                            {(futureContribution && futureContribution.length > 0) ?
                                <Container className="customBox">
                                    <Col xs={10} sm={12} md={12} style={{ marginTop: "1%", paddingBottom: "1%" }} className="personal-details">
                                        <div style={{ paddingLeft: "1%", color: "#8b1300", borderBottom: "2px solid lightgray", textTransform: "uppercase", fontFamily: "-webkit-pictograph", fontWeight: "800", fontSize: '29px', marginBottom: "-12px" }}>
                                            Future Contribution
                                        </div>
                                        <br />
                                        {futureContribution && futureContribution.length > 0 ? <p className="customDetails">{futureContribution}</p> : null}
                                    </Col>

                                </Container> : null}
                            <br />
                            <br />
                            <br />

                        </div>
                    </div>
                )}



        </div>
    )
}

export default Details