import React from 'react';
import { useHistory } from 'react-router';
import { Button, Navbar,} from "react-bootstrap";
import '../css/UserNavbar.css'

function UserNavbar(props) {
    const history = useHistory();

    function logOut() {
        var tok = localStorage.getItem('token');
        if (tok) {
            localStorage.removeItem('token');
        }
        localStorage.removeItem('isAdmin');
        history.push('/');
    }
    return (
        <div>
            <Navbar style={{backgroundColor:"#fff",boxShadow:"0px 4px 4px rgba(0, 0, 0, 0.25)",color:"black",paddingTop:"0px",paddingBottom:"0px"}} expand="xl">
                
                    <Navbar.Brand className="navBrand">
                        <img className="logoImage" height="80px" width="80px" alt="logo" src="/images/college_logo.jpg"></img>
                            <div className="logoTitle">
                                <h5 className="djsce">DJSCE</h5>
                                <h5 className="it">INFORMATION TECHNOLOGY</h5>
                            </div>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    {props.type&&props.type===1?
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <Button href="/#initiative" className="navButtons">About this initiative</Button>
                        <Button href="/#faq" className="navButtons">FAQs</Button>
                        <Button href="/#contact" className="navButtons">Contact Us</Button>
                        <Button href="/#team" className="navButtons">Our Team</Button>     
                    </Navbar.Collapse>:props.type===2?
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                   <Button className="navButtons" onClick={()=>{history.replace('/welcome')}}>Home</Button>
                   <Button className="navButtons" onClick={()=>{logOut();}}>Logout</Button>   
               </Navbar.Collapse>:props.type===3?
               <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                   <Button className="navButtons" onClick={()=>{history.replace('/view')}}>View Profile</Button>
                   <Button className="navButtons" onClick={()=>{logOut();}}>Logout</Button>   
               </Navbar.Collapse>:props.type===4?
               <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                   <Button className="navButtons" onClick={()=>{history.replace('/register')}}>Register</Button>
                   <Button className="navButtons" onClick={()=>{logOut();}}>Logout</Button>   
               </Navbar.Collapse>:props.type===5? <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                   <Button className="navButtons" onClick={()=>{history.replace('/admin-panel')}}>Admin</Button>
                   <Button className="navButtons" onClick={()=>{logOut();}}>Logout</Button>   
               </Navbar.Collapse>:<Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                   <Button className="navButtons" onClick={()=>{logOut();}}>Logout</Button>   
               </Navbar.Collapse>
               }
                {/*
                1 for HOMEPAGE
                2 for view profile
                3 for edit profile page
                4 for admin panel 
                5 for admin register 
                6 for logout 
                */}
                </Navbar>
        </div>
    );
}

export default UserNavbar;