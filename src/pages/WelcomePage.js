import React, { useEffect } from "react";
import { useHistory } from 'react-router';
import { Button, Container, Row, Col, Accordion } from "react-bootstrap";
import '../css/Home.css'
import UserNavbar from "./UserNavbar";
function WelcomePage() {
    const history = useHistory();
    useEffect(() => {
        var tok = localStorage.getItem('token');
        var admin=localStorage.getItem('isAdmin');
        if (tok&&admin==="false") {

        }
        else {
            history.replace('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div>
            <UserNavbar type={7} />
            <div className="welcomeDiv" >
                <div style={{ display: "flex", justifyContent: "space-around", }}>
                    <div className="titleDiv" style={{ marginTop: '1%' }}>
                        <br />
                        <br />
                        <label className="mainHeading">Welcome User</label>
                        <label className="subHeadingsProfile">Click below to view your profile</label>
                        <br />
                        <Button style={{ background: "#293E6F", color: "#FFF", width: "200px", fontSize: "20px", border: "none" }} onClick={() => { history.push('/view'); }}>View My Profile</Button>
                        <br />
                    </div>
                    <div className="welcomeImageDiv" style={{ marginTop: '1%' }}>
                        <img alt="illustration" src="/images/illustration.svg" className="welcomeImage"></img>
                    </div>
                </div>
            </div>

            <div>
            <br/>
                <div style={{ textAlign: "center", marginTop: "1%" }} id="initiative">
                    <label className="divHeadings">About this initiative</label>
                </div>
                <br />
                <Container >
                    <Row>
                        <Col md={7} lg={8}>
                            <div className="landingPara">
                                <label className="subHeadingsProfile1">Why should I build my profile?</label>
                                <label className="introPara">Profile helps you to showcase your personality, skills, achievements, areas of expertise , advancements in career and so much more. The increase in competition calls for a more effective way of evaluation beyond academics to gauge student caliber. Having an effective profile helps employers/teachers to know you better and help you find relevant opportunities.</label>
                            </div>
                        </Col>
                        <Col md={5} lg={4}>
                            <img alt="illustration1" src="/images/buildProfile_illustration.svg" className="welcomeImage"></img>
                        </Col>
                    </Row>
                </Container>

                <Container>
                    <Row>
                        <Col md={5} lg={4}>
                            <img alt="logo" src="/images/bridgeTheGap_illustration.svg" className="welcomeImage"></img>
                        </Col>
                        <Col md={7} lg={8}>
                            <div className="landingPara1">
                                <label className="subHeadingsProfile1">What does this student profile portal do?</label>
                                <label className="introPara">The substantial aim of this portal is to bridge the gap between faculty mentors and students. It acts as a credible source of student information. It allows the students to showcase  their academia along with their professional and interpersonal skills & ongoing six-monthly progress on this portal.</label>
                            </div>
                        </Col>
                    </Row>
                </Container>

                <Container>
                    <Row>
                        <Col md={7} lg={8}>
                            <div className="landingPara" >
                                <label className="subHeadingsProfile1">How will this profile portal benefit undergraduates?</label>
                                <label className="introPara">This profile portal assists the faculty mentors to identify the key skills and expertise of students to write effective LORs for them. It also gives students a chance to display their academic and professional competence in a well articulated manner. </label>
                                <br />
                            </div>
                        </Col>
                        <Col md={5} lg={4} className="colImageDiv">
                            <img alt="illustration2" src="/images/wall_illustration.svg" className="welcomeImage"></img>
                        </Col>
                    </Row>
                </Container>
            </div>

            <Container id="faq">
                <div style={{ textAlign: "center", marginTop: "1%" }}>
                    <label className="divHeadings">FAQ</label>
                </div>
                <Col style={{ marginTop: "1%" }}>
                    <Accordion  >
                        <Accordion.Item eventKey="0" style={{ background: "#ACD6DD" }}  >
                            <Accordion.Header > What is the purpose of profile?</Accordion.Header>
                            <Accordion.Body >
                                Profile helps you to showcase your personality, skills, achievements, areas of expertise , advancements in career and so much more. The increase in competition calls for a more effective way of evaluation beyond academics to gauge student caliber. Having an effective profile helps employers/teachers to know you better and help you find relevant opportunities.
                            </Accordion.Body>
                        </Accordion.Item>
                        <br/>
                        <Accordion.Item eventKey="1" style={{ background: "#ACD6DD" }} >
                            <Accordion.Header>How can I create my profile?</Accordion.Header>
                            <Accordion.Body>
                                It’s very simple. Login into your account and fill your details by navigating through the various profile sections one by one. Finally, submit your details once you are done building your profile.
                            </Accordion.Body>
                        </Accordion.Item>
                        <br/>
                        <Accordion.Item eventKey="2" style={{ background: "#ACD6DD" }} >
                            <Accordion.Header>Who can see my profile?</Accordion.Header>
                            <Accordion.Body>
                                Your respective mentors, college faculties and guides can see your profile and monitor your progress.
                            </Accordion.Body>
                        </Accordion.Item>
                        <br/>
                        <Accordion.Item eventKey="3" style={{ background: "#ACD6DD" }} >
                            <Accordion.Header>How can I update my profile?</Accordion.Header>
                            <Accordion.Body>
                                We got you covered. You can always come back to your profile to add and delete sections, update your current roles & modify details conveniently in the same way as building your profile. I have lost access to my password. How to reset it?
                                No problem. Click on the forgot password option on the login page which will further redirect you to the process of resetting your password.
                            </Accordion.Body>
                        </Accordion.Item>
                        <br/>
                        <Accordion.Item eventKey="4" style={{ background: "#ACD6DD" }} >
                            <Accordion.Header> How to correct my year of joining/passing?</Accordion.Header>
                            <Accordion.Body>
                                These details are autofilled, hence you do not have the access to modify them. Get in touch with the head of department, Dr. Vinaya Sawant ma’am to get them corrected.
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Col>
            </Container>




            <Container id="contact" className="mb-5 contactus pt-5">
                <div style={{ textAlign: "center" }}>
                    <h3 style={{ fontSize: "25px", lineHeight: "25px", fontWeight: "600", fontFamily: "Poppins", color: "#293E6F" }}>Contact Us</h3>
                    <p style={{ marginTop: "34px", fontSize: "17px", lineHeight: "29px", fontWeight: "400", fontFamily: "Poppins", color: "#293E6F" }}>Are you stuck with a problem and can’t find a way out? No need to worry! <br></br>We have got you covered.</p>
                </div>
                <Row>
                    <Col className="firstPara" style={{ textAlign: "center", marginTop: "2px", }} md={6}>
                        <p className="contactHeading">Get in touch</p>

                        <div style={{ display: "flex", alignItems: 'center', justifyContent: "center" }}>
                            <img alt="logo" src="/images/message.png"></img>
                            <p className="email">djsceitdepartment@gmail.com</p>
                        </div>
                        <div style={{ display: "flex", alignItems: 'center', justifyContent: "center", marginTop: "16px" }}>
                            <img height="40px" alt="logo" src="/images/phone.png"></img>
                            <div style={{ marginLeft: "20px" }}>
                                <p className="faculty">Dr. Vinaya Sawant</p>
                                <p className="phoneNumber">+91 9867248114</p>
                            </div>
                        </div>


                        <div style={{ display: "flex", alignItems: 'center', justifyContent: "center", marginTop: "16px" }}>
                            <img height="40px" alt="logo" src="/images/phone.png"></img>
                            <div style={{ marginLeft: "20px" }}>
                                <p className="faculty">Dr. Neha Katre</p>
                                <p className="phoneNumber">+91 9867550661</p>
                            </div>
                        </div>

                    </Col>
                    <Col style={{ textAlign: "center" }} md={6}>
                        <p className="contactHeading">Connect with us</p>
                        <div style={{ display: "flex", alignItems: 'center', justifyContent: "center" }}>
                            <a href="https://www.instagram.com/djsce.it"><img height="40px" alt="logo" src="/images/instagram.png"></img></a>
                            <img height="40px" style={{ marginLeft: "15px", marginRight: "15px" }} alt="logo" src="/images/linkedIn.png"></img>
                            <img height="40px" alt="logo" src="/images/facebook.png"></img>
                        </div>
                        <div style={{ display: "flex", alignItems: 'center', justifyContent: "center" }}>
                            <p className="paragraph">Follow on our socials to stay updated with the latest news and information about IT department!</p>
                        </div>
                    </Col>
                </Row>
            </Container>


            <Container id="team" className="mb-5 ourteam pt-5">
                <div style={{ textAlign: "center" }}>
                    <h3 style={{ fontSize: "25px", lineHeight: "25px", fontWeight: "600", fontFamily: "Poppins", color: "#293E6F" }}>Our Team</h3>

                </div>
                <Row>
                    <Col style={{ textAlign: "center", marginTop: "35px" }} md={6}>
                        <div style={{ display: "flex", alignItems: 'center', justifyContent: "center" }}>
                            <div>
                                <img className="user" alt="logo" src="/images/Dhrumil.png"></img>
                                <div className="username">Dhrumil Thakore</div>
                                <div className="role">Web Developer</div>
                            </div>
                        </div>
                    </Col>
                    <Col style={{ textAlign: "center", marginTop: "35px" }} md={6}>
                        <div style={{ display: "flex", alignItems: 'center', justifyContent: "center" }}>
                            <div>
                                <img className="user" alt="logo" src="/images/Chirag.png"></img>
                                <div className="username">Chirag Jain</div>
                                <div className="role">Web Developer</div>
                            </div>
                        </div>
                    </Col>
                    <Col style={{ textAlign: "center", marginTop: "35px" }} md={6}>
                        <div style={{ display: "flex", alignItems: 'center', justifyContent: "center" }}>
                            <div>
                                <img className="user" alt="logo" src="/images/Shivam.png"></img>
                                <div className="username">Shivam Vora</div>
                                <div className="role">UI/UX Developer</div>
                            </div>
                        </div>
                    </Col>
                    <Col style={{ textAlign: "center", marginTop: "35px" }} md={6}>
                        <div style={{ display: "flex", alignItems: 'center', justifyContent: "center" }}>
                            <div>
                                <img className="user" alt="logo" src="/images/Bhoomika.png"></img>
                                <div className="username">Bhoomika Valani</div>
                                <div className="role">UI/UX Developer</div>
                            </div>
                        </div>
                    </Col>
                    <Col style={{ textAlign: "center", marginTop: "35px" }} md={6}>
                        <div style={{ display: "flex", alignItems: 'center', justifyContent: "center" }}>
                            <div>
                                <img className="user" alt="logo" src="/images/Devanshi.png"></img>
                                <div className="username">Devanshi Jhaveri </div>
                                <div className="role">Graphic Designer</div>
                            </div>
                        </div>
                    </Col>
                    <Col style={{ textAlign: "center", marginTop: "35px" }} md={6}>
                        <div style={{ display: "flex", alignItems: 'center', justifyContent: "center" }}>
                            <div>
                                <img className="user" alt="logo" src="/images/Tanvi.png"></img>
                                <div className="username">Tanvi Save</div>
                                <div className="role">Graphic Designer</div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
            <div className="footer">
                <h3 className="footerLine">© All Copyrights Reserved.</h3>
            </div>
        </div>
    );
};
export default WelcomePage;