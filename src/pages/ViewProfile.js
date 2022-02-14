import React, { useState, useEffect } from "react";
import { Button, Container, Spinner, Toast, Row, Col } from "react-bootstrap";
import { getEndPoint } from "../components/request";
import { useHistory } from 'react-router';
import uuid from 'react-uuid'
import '../css/ViewProfile.css';
import UserNavbar from "./UserNavbar";

const ViewProfile = () => {
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory();
    const [name, setName] = useState("");
    const [sapId, setSapId] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [linkdin, setLinkdin] = useState("");
    const [yearOfJoining, setYearOfJoining] = useState();
    const [yearOfPassing, setYearOfPassing] = useState();
    const [contribution, setContribution] = useState("");
    const [futureContribution, setFutureContribution] = useState("");
    const [cgpa, setCgpa] = useState([]);
    const [cultural, setCultural] = useState("");
    const [sports, setSports] = useState("");
    const [nss, setNss] = useState("");
    const [resume, setResume] = useState("");
    const [gre, setGre] = useState("");
    const [ielts, setIelts] = useState("");
    const [gate, setGate] = useState("");
    const [cat, setCat] = useState("");
    const [gmat, setGmat] = useState("");
    const [tofel, setTofel] = useState("");
    const [internship, setInternship] = useState([]);
    const [achievements, setAchievements] = useState([]);
    const [coursera, setCoursera] = useState([]);
    const [researchPapers, setResearchPapers] = useState([]);
    const [projects, setProjects] = useState();
    const [profile, setProfile] = useState("https://res.cloudinary.com/chiragjain55551/image/upload/v1627317877/StudentProject/vdjmvqojsnx3hckyuwm6.jpg");
    const [showError, setShowError] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        var tok = localStorage.getItem('token');
        var admin=localStorage.getItem('isAdmin');
        if (tok&&admin==="false") {
            setData();
        }
        else {
            history.replace('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    /* function logOut() {
         var tok = localStorage.getItem('token');
         if (tok) {
             localStorage.removeItem('token');
         }
         history.replace('/');
     }*/

    async function setData() {
        /*FUNCTION TO SET DATA INITIALLY FROM API*/

        setIsLoading(true);
        const response = await getEndPoint('/data', null);
        if (response) {
            setSapId(response.data.sap_Id);
            setName(response.data.name);
            setLinkdin(response.data.linkedin);
            setPhoneNumber(response.data.contact_no);
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
            setResume(response.data.resume);
            setGmat(response.data.gmat);
            setEmail(response.data.email);
            if (response.data.academic_cgpa && response.data.academic_cgpa.length > 0) {
                let temp = Array.from(response.data.academic_cgpa);
                setCgpa(temp);
            }
            if (response.data.profile_pic && response.data.profile_pic.length > 0) {
                setProfile(response.data.profile_pic);
            }
            if (response.data.year_join && response.data.year_passed && response.data.year_passed.length > 0 && response.data.year_join.length > 0) {
                setYearOfJoining(Number(response.data.year_join));
                setYearOfPassing(Number(response.data.year_passed));
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
            if (response.data.coursera && response.data.coursera.length> 0) {
                let temp5 = Array.from(response.data.coursera);
                for (let i = 0; i < temp5.length; i++) {
                    temp5[i].key = uuid();
                }
                setCoursera(temp5);
            }
            setIsLoading(false);
        }
        else {
            setMessage("OPPPS WE ARE FACING ERROS");
            setShowError(true);
        }
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

                    <div style={{ display: "absolute", backgroundColor: "#EFF2F7" }}>
                        <UserNavbar type={2} />
                        <div>
                            <div className="customToasts">
                                <Toast onClose={() => setShowError(false)} show={showError} delay={3000} autohide bg="danger">
                                    <Toast.Body style={{ fontWeight: "bold", color: "white" }}>{message}</Toast.Body>
                                </Toast>
                            </div>

                            <div className="displayCard">
                                <div>
                                    <img height="200px" width="200px" className="profilePictures" src={profile} alt="profilePic" />
                                </div>
                                <div className="displayCardColumn">
                                    <p className="heading1" >{name ? name : "Anonymous"}</p>
                                    <p className="subTitle1">IT Department , {yearOfPassing}</p>
                                    <Button style={{ background: "#FFF", color: "#293E6F", width: "50%" }} onClick={() => { history.replace('/homePage') }}>Edit Profile</Button>
                                </div>
                            </div>

                            <Container className="mainBox">
                                <div>
                                    <Col xs={10} sm={12} md={12} style={{ marginTop: "1%", }} >
                                        <div className="sectionHeadings">
                                            Basic Details
                                        </div>
                                        <hr />
                                        <br />
                                        <Row>
                                            <Col>
                                                <span className="titles">Name: </span>
                                            </Col>
                                            <Col>
                                                <p className="subHeadings1"> {name.length>0?name:"Anonymous"} </p> </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <span className="titles">SapId: </span>
                                            </Col>
                                            <Col>
                                                <p className="subHeadings1">{sapId} </p> </Col>

                                        </Row>
                                        <Row>
                                            <Col><span className="titles">Email  :  </span></Col><Col><p className="subHeadings1">{email} </p> </Col>
                                        </Row>
                                        {phoneNumber.length>0?<Row>
                                            <Col><span className="titles">Contact No  :  </span></Col><Col><p className="subHeadings1">{phoneNumber} </p> </Col>
                                        </Row>:null}
                                        <Row>
                                            <Col><span className="titles">Joining Year  :  </span></Col><Col><p className="subHeadings1">{yearOfJoining} </p> </Col>
                                        </Row>
                                        <Row>
                                            <Col><span className="titles">Graduation Year  :  </span></Col><Col><p className="subHeadings1">{yearOfPassing} </p> </Col>
                                        </Row>
                                        {linkdin ? <Row>
                                            <Col><span className="titles">Linkedin  :  </span></Col><Col><p className="subHeadings1"><a href={linkdin} rel="noreferrer" target="_blank">Profile Link</a></p></Col>
                                        </Row> : null}
                                        {resume ? <Row>
                                            <Col><span className="titles">Resume  :  </span></Col><Col><p className="subHeadings1"><a href={resume} rel="noreferrer" target="_blank">Resume Link</a></p></Col>
                                        </Row> : null}
                                        {contribution ? <Row>
                                            <Col><span className="titles">Contributions  :  </span></Col><Col><p className="subHeadings1">{contribution} </p> </Col>
                                        </Row> : null}
                                    </Col>
                                </div>
                            </Container>

                            {cgpa && cgpa.length > 0 ?
                                <Container className="mainBox">
                                    <div>
                                        <Col xs={10} sm={12} md={12} style={{ marginTop: "1%", }} >
                                            <div className="sectionHeadings">
                                                CGPA
                                            </div>
                                            <hr />
                                            <br />
                                            {cgpa.map((value, index) => {

                                                if (value !== null) {
                                                    return (
                                                        <div key={index}>

                                                            <Row>
                                                                <Col><span className="titles">SEM {index + 3}  :  </span></Col><Col><p className="subHeadings1">{value} </p> </Col>
                                                            </Row>
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

                                    </div>
                                </Container> : null}

                            {((cultural && cultural.length > 0) || (sports && sports.length > 0) || (nss && nss.length > 0)) ?
                                <Container className="mainBox">
                                    <div>
                                        <Col xs={10} sm={12} md={12} style={{ marginTop: "1%", paddingBottom: "1%" }} >
                                            <div className="sectionHeadings">
                                                Curricular Activities
                                            </div>
                                            <hr />
                                            <br />
                                            {cultural && cultural.length > 0 ? <Row>
                                                <Col><span className="titles">Cultural Activities :</span></Col>
                                                <Col><p className="subHeadings1"> {cultural} </p> </Col>  </Row> : null}

                                            {sports && sports.length > 0 ? <Row>
                                                <Col>
                                                    <span className="titles">Sports Activities: </span>
                                                </Col><Col><p className="subHeadings1"> {sports} </p> </Col>  </Row> : null}

                                            {nss && nss.length > 0 ? <Row><Col>
                                                <span className="titles">NSS Activities: </span>
                                            </Col>
                                                <Col>
                                                    <p className="subHeadings1">
                                                        {nss} </p> </Col>
                                            </Row> : null}
                                        </Col>

                                    </div></Container> : null}

                            {internship && internship.length > 0 ?
                                <Container className="mainBox">
                                    <div>
                                        <Col xs={10} sm={12} md={12} style={{ marginTop: "1%", paddingBottom: "20px" }} >
                                            <div className="sectionHeadings">
                                                Internship Details
                                            </div>
                                            <hr />
                                            <br />
                                            {internship.map((value, index) => {
                                                return (
                                                    <div key={value.key}>

                                                        <Row>
                                                            <p className="subHeadings2">Internship {index + 1}<br /><hr /></p>
                                                        </Row>
                                                        <Row>
                                                            <Col><span className="titles">Company Name  :  </span></Col><Col><p className="subHeadings1">{value.name} </p> </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col><span className="titles">Role  :  </span></Col><Col><p className="subHeadings1">{value.role} </p> </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col><span className="titles">Description  :  </span></Col><Col><p className="subHeadings1">{value.description} </p> </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col><span className="titles">Proof  :  </span></Col><Col><p className="subHeadings1"><a href={value.proof_link} rel="noreferrer" target="_blank"> View Uploaded Document</a></p></Col>
                                                        </Row>
                                                    </div>
                                                )
                                            })
                                            }
                                        </Col>

                                    </div> </Container> : null}


                            {coursera && coursera.length > 0 ?
                                <Container className="mainBox">
                                    <div>

                                        <Col xs={10} sm={12} md={12} style={{ marginTop: "1%", paddingBottom: "20px" }} >
                                            <div className="sectionHeadings">
                                                Coursera Courses
                                            </div>
                                            <hr />
                                            <br />
                                            {coursera.map((value, index) => {
                                                return (
                                                    <div key={value.key}>

                                                        <Row>
                                                            <p className="subHeadings2">Course {index + 1}<br /><hr /></p>
                                                        </Row>
                                                        <Row>
                                                            <Col><span className="titles">Course Name  :  </span></Col><Col><p className="subHeadings1">{value.course_name} </p> </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col><span className="titles">University/Company  :  </span></Col><Col><p className="subHeadings1">{value.university} </p> </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col><span className="titles">Duration(in weeks)  :  </span></Col><Col><p className="subHeadings1">{value.duration} </p> </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col><span className="titles">Semester when course was completed  :  </span></Col><Col><p className="subHeadings1">{value.sem} </p> </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col><span className="titles">Course Level  :  </span></Col><Col><p className="subHeadings1">{value.level} </p> </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col><span className="titles">Certificate Link  :  </span></Col><Col><p className="subHeadings1"><a href={value.cert_link} rel="noreferrer" target="_blank">Certification Link</a></p></Col>
                                                        </Row>
                                                    </div>
                                                )
                                            })
                                            }
                                        </Col>
                                    </div> </Container> : null}

                            {achievements && achievements.length > 0 ?

                                <Container className="mainBox">
                                    <div>

                                        <Col xs={10} sm={12} md={12} style={{ marginTop: "1%", paddingBottom: "20px" }} >
                                            <div className="sectionHeadings">
                                                Achivements Details
                                            </div>
                                            <hr />
                                            <br />
                                            {achievements.map((value, index) => {
                                                return (
                                                    <div key={value.key}>
                                                        <Row>
                                                            <p className="subHeadings2">Achievement  {index + 1}<br /><hr /></p>
                                                        </Row>
                                                        <Row>
                                                            <Col><span className="titles">Description  :  </span></Col><Col><p className="subHeadings1">{value.description} </p> </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col><span className="titles">Proof  :  </span></Col><Col><p className="subHeadings1"><a href={value.proof_link} rel="noreferrer" target="_blank"> View Uploaded Document</a></p></Col>
                                                        </Row>
                                                    </div>
                                                )
                                            })
                                            }
                                        </Col>
                                    </div> </Container> : null}

                            {researchPapers && researchPapers.length > 0 ?
                                <Container className="mainBox">
                                    <div>

                                        <Col xs={10} sm={12} md={12} style={{ marginTop: "1%", paddingBottom: "20px" }} >
                                            <div className="sectionHeadings">
                                                Research Papers
                                            </div>
                                            <hr />
                                            <br />
                                            {researchPapers.map((value, index) => {
                                                return (
                                                    <div key={value.key}>

                                                        <Row>
                                                            <p className="subHeadings2">Paper {index + 1}<br /><hr /></p>
                                                        </Row>
                                                        <Row>
                                                            <Col><span className="titles">Title  :  </span></Col><Col><p className="subHeadings1">{value.title} </p> </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col><span className="titles">Publication  :  </span></Col><Col><p className="subHeadings1">{value.publication} </p> </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col><span className="titles">Conference/Journal  :  </span></Col><Col><p className="subHeadings1">{value.conference} </p> </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col><span className="titles">Authors  :  </span></Col><Col><p className="subHeadings1">{value.author} </p> </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col><span className="titles">Year  :  </span></Col><Col><p className="subHeadings1">{value.year} </p> </Col>
                                                        </Row>
                                                    </div>
                                                )
                                            })
                                            }
                                        </Col>
                                    </div> </Container> : null}

                            {projects && projects.length > 0 ?
                                <Container className="mainBox">
                                    <div>

                                        <Col xs={10} sm={12} md={12} style={{ marginTop: "1%", paddingBottom: "20px" }} >
                                            <div className="sectionHeadings">
                                                Projects
                                            </div>
                                            <hr />
                                            <br />
                                            {projects.map((value, index) => {
                                                return (
                                                    <div key={value.key}>
                                                        <Row>
                                                            <p className="subHeadings2">Project {index + 1}<br /><hr /></p>
                                                        </Row>
                                                        <Row>
                                                            <Col><span className="titles">Title  :  </span></Col><Col><p className="subHeadings1">{value.title} </p> </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col><span className="titles">Description  :  </span></Col><Col><p className="subHeadings1">{value.description} </p> </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col><span className="titles">Project Link  :  </span></Col><Col><p className="subHeadings1"><a href={value.project_link} rel="noreferrer" target="_blank">Project Link</a></p></Col>
                                                        </Row>
                                                    </div>
                                                )
                                            })
                                            }
                                        </Col>
                                    </div></Container> : null}

                            {gate.length > 0 || gre.length > 0 || ielts.length > 0 || cat.length > 0 || tofel.length > 0 || gmat.length > 0 ?
                                <Container className="mainBox">
                                    <div>
                                        <Col xs={10} sm={12} md={12} style={{ marginTop: "1%", }} >
                                            <div className="sectionHeadings">
                                                Competitive Exams
                                            </div>
                                            <hr />
                                            <br />
                                            {gre && gre.length > 0 ? <Row>
                                                <Col><span className="titles">GRE  :  </span></Col><Col><p className="subHeadings1">{gre} </p> </Col>  </Row> : null}
                                            {tofel && tofel.length > 0 ? <Row>
                                                <Col><span className="titles">TOEFL : </span></Col><Col><p className="subHeadings1"> {tofel} </p> </Col>  </Row> : null}
                                            {ielts && ielts.length > 0 ? <Row> <Col><span className="titles">IELTS  : </span> </Col><Col><p className="subHeadings1">{ielts} </p> </Col> </Row> : null}
                                            {cat && cat.length > 0 ? <Row><Col><span className="titles">CAT  :  </span></Col><Col><p className="subHeadings1">{cat} </p> </Col>  </Row> : null}
                                            {gmat && gmat.length > 0 ? <Row><Col><span className="titles">GMAT  :  </span></Col><Col><p className="subHeadings1">{gmat} </p> </Col>  </Row> : null}
                                            {gate && gate.length > 0 ? <Row><Col><span className="titles">GATE  :  </span></Col><Col><p className="subHeadings1">{gate} </p> </Col>  </Row> : null}
                                        </Col>
                                        <br />
                                    </div></Container> : null}

                            {(futureContribution && futureContribution.length > 0) ?
                                <Container className="mainBox">
                                    <div>
                                        <Col xs={10} sm={12} md={12} style={{ marginTop: "1%", paddingBottom: "1%" }} >
                                            <div className="sectionHeadings">
                                                Future Contribution
                                            </div>
                                            <hr />
                                            <br />
                                            {futureContribution && futureContribution.length > 0 ? <p className="subHeadings1">{futureContribution} </p> : null}
                                        </Col>
                                    </div>
                                </Container> : null}
                            <br />
                        </div>
                    </div>
                )}
        </div>
    )
}

export default ViewProfile;