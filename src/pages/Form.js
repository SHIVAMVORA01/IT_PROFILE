import React, { useEffect, useState, useRef } from "react";
import { Col, Row, Button, Form, Container, Spinner, Toast, OverlayTrigger, Tooltip, ButtonGroup } from "react-bootstrap";
import uuid from 'react-uuid'
import { getEndPoint, postEndPoint } from "../components/request";
import '../css/Form.css'
import { useHistory } from 'react-router';
import { AiFillDelete, BsEye, GrAddCircle } from 'react-icons/all';
import UserNavbar from "./UserNavbar";
const Forms = () => {
    const CurrentYear = new Date().getFullYear();
    const [name, setName] = useState("");
    const [sapId, setSapId] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [linkdin, setLinkdin] = useState("");
    const [yearOfJoining, setYearOfJoining] = useState(CurrentYear - 3);
    const [yearOfPassing, setYearOfPassing] = useState(CurrentYear + 1);
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
    const [coursera, setCoursera] = useState([{ key: uuid(), course_name: "", university: "", duration: "", sem: "", cert_link: "", level: "" }]);
    const [internship, setInternship] = useState([{ key: uuid(), name: "", role: "", description: "", proof_link: "", start_date: "", end_date: "" }]);
    const [achievements, setAchievements] = useState([{ key: uuid(), description: "", proof_link: "" }]);
    const [researchPapers, setResearchPapers] = useState([{ key: uuid(), title: "", publication: "", author: "", year: "", conference: "" }]);
    const [projects, setProjects] = useState([{ key: uuid(), title: "", description: "", project_link: "" }]);
    const [invalidName, setInvalidName] = useState(false);
    const [invalidSapId, setinvalidSapId] = useState(false);
    const [invalidPhoneNumber, setInvalidPhoneNumber] = useState(false);
    const [invalidLinkdin, setInavlidLinkdin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [invalidCgpaSem3, setInvalidCgpaSem3] = useState(false);
    const [invalidCgpaSem4, setInvalidCgpaSem4] = useState(false);
    const [invalidCgpaSem5, setInvalidCgpaSem5] = useState(false);
    const [invalidCgpaSem6, setInvalidCgpaSem6] = useState(false);
    const [invalidCgpaSem7, setInvalidCgpaSem7] = useState(false);
    const [invalidCgpaSem8, setInvalidCgpaSem8] = useState(false);
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [invalidGre, setInvalidGre] = useState(false);
    const [invalidGate, setInvalidGate] = useState(false);
    const [invalidIelts, setInvalidIelts] = useState(false);
    const [invalidCat, setInvalidCat] = useState(false);
    const [invalidGmat, setInvalidGmat] = useState(false);
    const [invalidTofel, setInvalidTofel] = useState(false);
    const [profile, setProfile] = useState("https://res.cloudinary.com/chiragjain55551/image/upload/v1627317877/StudentProject/vdjmvqojsnx3hckyuwm6.jpg");
    const [show, setShow] = useState(false);
    const [showError, setShowError] = useState(false);
    const [message, setMessage] = useState("");
    const [dataChanged, setDataChanged] = useState(false);
    const history = useHistory();
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var URLexpression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
    var URLregex = new RegExp(URLexpression);
    const activeTabColor = "#293E6F";
    const inactiveTabColor = "#FFFFFF";
    const inactiveText = "#524F63";
    const [tab, setTab] = useState([true, false, false, false, false, false, false, false, false, false, false, false]);
    const profilePicDiv = useRef(null);
    const basicDetails = useRef(null);
    const cgpas = useRef(null);
    const coCurricular = useRef(null);
    const internshipDiv = useRef(null);
    const achievementsDiv = useRef(null);
    const paperDiv = useRef(null);
    const projectDiv = useRef(null);
    const scoreDiv = useRef(null);
    const resumeDiv = useRef(null);
    const futureDiv = useRef(null);
    const courseraDiv = useRef(null);
    useEffect(() => {
        var tok = localStorage.getItem('token');
        var admin = localStorage.getItem('isAdmin');
        if (tok && admin === "false") {
            setData();
        }
        else {
            logOut();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataChanged]);



    async function setData() {
        /*FUNCTION TO SET DATA INITIALLY FROM API*/

        setIsLoading(true);
        const response = await getEndPoint('/data', null);
        if (response) {
            setInvalidName(false);
            setInvalidPhoneNumber(false);
            setInvalidPhoneNumber(false);
            setInvalidCgpaSem3(false);
            setInvalidCgpaSem4(false);
            setInvalidCgpaSem5(false);
            setInvalidCgpaSem6(false);
            setInvalidCgpaSem7(false);
            setInvalidCgpaSem8(false);
            setIsLoading(false);
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
            if (response.data.coursera && response.data.coursera.length > 0) {
                let temp5 = Array.from(response.data.coursera);
                for (let i = 0; i < temp5.length; i++) {
                    temp5[i].key = uuid();
                }
                setCoursera(temp5);
            }
            addListner();
        }
        else {
            setIsLoading(false);
            setMessage("OPPPS WE ARE FACING ERROS");
            setShowError(true);
        }
    }

    function ValidationOnChange(event) {
        //FUNCTION TO VALIDATE FIELDS
        let PhoneValidRegex = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
        switch (event.target.name) {
            case "Name":
                setName(event.target.value);
                if (name || name.length > 0) {
                    setInvalidName(false);

                }
                else {
                    setInvalidName(true);
                }
                break;

            case "SapId":
                setSapId(event.target.value);
                if (sapId && sapId.length > 0) {
                    setinvalidSapId(false);

                }
                else {
                    setinvalidSapId(true);
                }
                break;
            case "Email":
                setEmail(event.target.value);
                if (mailformat.test(event.target.value) === true) {
                    setInvalidEmail(false);
                }
                else {
                    setInvalidEmail(true);
                }
                break;
            case "Linkdin":
                setLinkdin(event.target.value);
                if (event.target.value.match(URLregex)) {
                    setInavlidLinkdin(false);
                }
                else {
                    setInavlidLinkdin(true);
                }
                break;

            case "ContactNumber":
                setPhoneNumber(event.target.value);
                if (phoneNumber && PhoneValidRegex.test(event.target.value)) {
                    setInvalidPhoneNumber(false);

                }
                else {
                    setInvalidPhoneNumber(true);
                }
                break;

            case "Contribution":
                setContribution(event.target.value);

                break;
            case "Cultural":
                setCultural(event.target.value);

                break;
            case "Nss":
                setNss(event.target.value);
                break;
            case "Sports":
                setSports(event.target.value);
                break;

            case "Internship":
                let temp1 = Array.from(internship);
                let t1 = event.target.id.toString().split(",")[1];
                for (let index1 = 0; index1 < temp1.length; index1++) {
                    if (temp1[index1].key === t1) {
                        temp1[index1].name = event.target.value;
                        break;
                    }
                }
                setInternship(temp1);
                break;

            case "InternshipRole":
                let temp2 = Array.from(internship);

                let t2 = event.target.id.toString().split(",")[1];
                for (let index2 = 0; index2 < temp2.length; index2++) {
                    if (temp2[index2].key === t2) {
                        temp2[index2].role = event.target.value;
                        break;
                    }
                }
                setInternship(temp2);
                break;

            case "InternshipDescription":
                let temp4 = Array.from(internship);

                let t4 = event.target.id.toString().split(",")[1];

                for (let index4 = 0; index4 < temp4.length; index4++) {
                    if (temp4[index4].key === t4) {

                        temp4[index4].description = event.target.value;

                        break;
                    }
                }
                setInternship(temp4);
                break;

            case "InternshipProof":
                let temp3 = Array.from(internship);
                let t3 = event.target.id.toString().split(",")[1];
                for (let index3 = 0; index3 < temp3.length; index3++) {
                    if (temp3[index3].key === t3) {
                        temp3[index3].proof_link = event.target.value;
                        break;
                    }
                }
                setInternship(temp3);
                break;

            case "AchievementDescription":
                let temp5 = Array.from(achievements);

                let t5 = event.target.id.toString().split(",")[1];
                for (let index5 = 0; index5 < temp5.length; index5++) {
                    if (temp5[index5].key === t5) {
                        temp5[index5].description = event.target.value;
                        break;
                    }
                }
                setAchievements(temp5);
                break;

            case "TitleOfPaper":
                let temp6 = Array.from(researchPapers);
                let t6 = event.target.id.toString().split(",")[1];
                for (let index6 = 0; index6 < temp6.length; index6++) {
                    if (temp6[index6].key === t6) {
                        temp6[index6].title = event.target.value;
                        break;
                    }
                }

                setResearchPapers(temp6);
                break;

            case "Publication":
                let temp7 = Array.from(researchPapers);
                let t7 = event.target.id.toString().split(",")[1];
                for (let index7 = 0; index7 < temp7.length; index7++) {
                    if (temp7[index7].key === t7) {
                        temp7[index7].publication = event.target.value;
                        break;
                    }
                }
                setResearchPapers(temp7);
                break;

            case "Authors":
                let temp8 = Array.from(researchPapers);
                let t8 = event.target.id.toString().split(",")[1];
                for (let index8 = 0; index8 < temp8.length; index8++) {
                    if (temp8[index8].key === t8) {
                        temp8[index8].author = event.target.value;
                        break;
                    }
                }
                setResearchPapers(temp8);
                break;

            case "Year":
                let temp9 = Array.from(researchPapers);
                let t9 = event.target.id.toString().split(",")[1];
                for (let index9 = 0; index9 < temp9.length; index9++) {
                    if (temp9[index9].key === t9) {
                        temp9[index9].year = event.target.value.toString();
                        break;
                    }
                }
                setResearchPapers(temp9);
                break;
            case "Conference":

                let temp10 = Array.from(researchPapers);
                let t10 = event.target.id.toString().split(",")[1];
                for (let index10 = 0; index10 < temp10.length; index10++) {
                    if (temp10[index10].key === t10) {
                        temp10[index10].conference = event.target.value;
                        break;
                    }
                }

                setResearchPapers(temp10);
                break;

            case "TitleOfProject":

                let temp11 = Array.from(projects);
                let t11 = event.target.id.toString().split(",")[1];
                for (let index11 = 0; index11 < temp11.length; index11++) {

                    if (temp11[index11].key === t11) {
                        temp11[index11].title = event.target.value;
                        break;
                    }


                }

                setProjects(temp11);
                break;

            case "ProjectDescription":

                let temp12 = Array.from(projects);
                let t12 = event.target.id.toString().split(",")[1];
                for (let index12 = 0; index12 < temp12.length; index12++) {
                    if (temp12[index12].key === t12) {
                        temp12[index12].description = event.target.value;
                        break;
                    }
                }
                setProjects(temp12);
                break;

            case "ProjectLink":
                let temp13 = Array.from(projects);
                let t13 = event.target.id.toString().split(",")[1];
                for (let index13 = 0; index13 < temp13.length; index13++) {
                    if (temp13[index13].key === t13) {
                        temp13[index13].project_link = event.target.value;
                        break;
                    }
                }
                setProjects(temp13);
                break;

            case "FutureContribution":
                setFutureContribution(event.target.value);
                break;


            case "CourseName":
                let temp15 = Array.from(coursera);
                let t15 = event.target.id.toString().split(",")[1];
                for (let index15 = 0; index15 < temp15.length; index15++) {
                    if (temp15[index15].key === t15) {
                        temp15[index15].course_name = event.target.value;
                        break;
                    }
                }
                setCoursera(temp15);
                break;

            case "CourseraUniversity":
                let temp16 = Array.from(coursera);
                let t16 = event.target.id.toString().split(",")[1];
                for (let index16 = 0; index16 < temp16.length; index16++) {
                    if (temp16[index16].key === t16) {
                        temp16[index16].university = event.target.value;
                        break;
                    }
                }
                setCoursera(temp16);
                break;

            case "CourseSem":
                let temp17 = Array.from(coursera);
                let t17 = event.target.id.toString().split(",")[1];

                for (let index17 = 0; index17 < temp17.length; index17++) {
                    if (temp17[index17].key === t17) {
                        if (event.target.value >= 1 && event.target.value <= 8) {
                            temp17[index17].sem = event.target.value;
                            break;
                        }
                        else {
                            temp17[index17].sem = -1;
                            break;
                        }
                    }
                }
                setCoursera(temp17);
                break;


            case "CourseDuration":
                let temp18 = Array.from(coursera);
                let t18 = event.target.id.toString().split(",")[1];

                for (let index18 = 0; index18 < temp18.length; index18++) {
                    if (temp18[index18].key === t18) {
                        if (event.target.value > 0) {
                            temp18[index18].duration = event.target.value;
                            break;
                        }
                        else {
                            temp18[index18].duration = 0;
                            break;
                        }
                    }
                }
                setCoursera(temp18);
                break;

            case "CourseLevel":
                let temp19 = Array.from(coursera);
                let t19 = event.target.id.toString().split(",")[1];
                for (let index19 = 0; index19 < temp19.length; index19++) {
                    if (temp19[index19].key === t19) {
                        temp19[index19].level = event.target.value;
                        break;
                    }
                }
                setCoursera(temp19);
                break;


            case "CourseCerti":
                if (event.target.value.match(URLregex)) {
                    let temp20 = Array.from(coursera);
                    let t20 = event.target.id.toString().split(",")[1];
                    for (let index20 = 0; index20 < temp20.length; index20++) {
                        if (temp20[index20].key === t20) {
                            temp20[index20].cert_link = event.target.value;
                            break;
                        }
                    }
                    setCoursera(temp20);
                }
                else {
                    let temp20 = Array.from(coursera);
                    let t20 = event.target.id.toString().split(",")[1];
                    for (let index20 = 0; index20 < temp20.length; index20++) {
                        if (temp20[index20].key === t20) {
                            temp20[index20].cert_link = "";
                            break;
                        }
                    }
                    setCoursera(temp20);
                }
                break;


            case "Gre":
                setGre(event.target.value);
                if (event.target.value && event.target.value > 0 && event.target.value <= 340) {
                    setInvalidGre(false);
                }
                else if (event.target.value === "") {
                    setInvalidGre(false);
                }
                else {
                    setInvalidGre(true);
                }
                break;

            case "Gate":
                setGate(event.target.value);
                if (event.target.value && event.target.value > 0 && event.target.value <= 100) {
                    setInvalidGate(false);
                }
                else if (event.target.value === "") {
                    setInvalidGate(false);
                }
                else {
                    setInvalidGate(true);
                }
                break;

            case "Tofel":
                setTofel(event.target.value);
                if (event.target.value && event.target.value > 0 && event.target.value <= 120) {
                    setInvalidTofel(false);
                }
                else if (event.target.value === "") {
                    setInvalidTofel(false);
                }
                else {
                    setInvalidTofel(true);
                }
                break;

            case "Ielts":
                setIelts(event.target.value);
                if (event.target.value && event.target.value > 0 && event.target.value <= 9) {
                    setInvalidIelts(false);
                }
                else if (event.target.value === "") {
                    setInvalidIelts(false);
                }
                else {
                    setInvalidIelts(true);
                }
                break;

            case "Gmat":
                setGmat(event.target.value);
                if (event.target.value && event.target.value > 0 && event.target.value <= 800) {
                    setInvalidGmat(false);
                }
                else if (event.target.value === "") {
                    setInvalidGmat(false);
                }
                else {
                    setInvalidGmat(true);
                }
                break;

            case "Cat":
                setCat(event.target.value);
                if (event.target.value && event.target.value > 0 && event.target.value <= 100) {
                    setInvalidCat(false);
                }
                else if (event.target.value === "") {
                    setInvalidCat(false);
                }
                else {
                    setInvalidCat(true);
                }
                break;

            case "Cgpa":
                let temp = Array.from(cgpa);
                if (event.target.value && event.target.value > 0 && event.target.value <= 10) {
                    if (event.target.id === "sem3") {
                        setInvalidCgpaSem3(false);
                        temp[0] = event.target.value;
                        setCgpa(temp);
                    }
                    else if (event.target.id === "sem4") {
                        setInvalidCgpaSem4(false);
                        temp[1] = event.target.value;
                        setCgpa(temp);
                    }
                    else if (event.target.id === "sem5") {
                        setInvalidCgpaSem5(false);
                        temp[2] = event.target.value;
                        setCgpa(temp);
                    }
                    else if (event.target.id === "sem6") {
                        setInvalidCgpaSem6(false);
                        temp[3] = event.target.value;
                        setCgpa(temp);
                    }
                    else if (event.target.id === "sem7") {
                        setInvalidCgpaSem7(false);
                        temp[4] = event.target.value;
                        setCgpa(temp);
                    }
                    else if (event.target.id === "sem8") {
                        setInvalidCgpaSem8(false);
                        temp[5] = event.target.value;
                        setCgpa(temp);
                    }
                }
                else {
                    if (event.target.id === "sem3") {
                        setInvalidCgpaSem3(true);

                    }
                    else if (event.target.id === "sem4") {
                        setInvalidCgpaSem4(true);

                    }
                    else if (event.target.id === "sem5") {
                        setInvalidCgpaSem5(true);
                    }
                    else if (event.target.id === "sem6") {
                        setInvalidCgpaSem6(true);
                    }
                    else if (event.target.id === "sem7") {
                        setInvalidCgpaSem7(true);

                    }
                    else if (event.target.id === "sem8") {
                        setInvalidCgpaSem8(true);

                    }
                }
                break;

            default:
                break;
        }
    }

    async function SubmitDetails() {
        //FUNCTION TO SUBMIT VALUES
        try {
            let invalidAchivements = false;
            let invalidInternship = false;
            let invalidProjects = false;
            let invalidResearch = false;
            let invalidCoursera = false;
            let PhoneValidRegex = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;

            if (achievements.length >= 1) {
                if (achievements.length > 1) {
                    for (var k0 = 0; k0 < achievements.length; k0++) {
                        if (achievements[k0].description.length > 0 && achievements[k0].proof_link.length > 0) {
                            continue;
                        }
                        else {
                            invalidAchivements = true;
                            break;
                        }

                    }
                }
                else {
                    if (achievements[0].description.length > 0) {
                        if (achievements[0].proof_link.length > 0) {
                            invalidAchivements = false;
                        }
                        else {
                            invalidAchivements = true;
                        }
                    }
                }
            }

            if (internship.length >= 1) {
                if (internship.length > 1) {
                    for (var k = 0; k < internship.length; k++) {
                        if (internship[k].name.length > 0 && internship[k].role.length > 0 && internship[k].description.length > 0 && internship[k].proof_link.length > 0) {
                            continue;
                        }
                        else {
                            invalidInternship = true;
                            break;
                        }

                    }
                }
                else {
                    if (internship[0].name.length > 0) {
                        if (internship[0].role.length > 0 && internship[0].description.length > 0 && internship[0].proof_link.length > 0) {
                            invalidInternship = false;
                        }
                        else {
                            invalidInternship = true;

                        }
                    }
                }
            }

            if (researchPapers.length >= 1) {
                if (researchPapers.length > 1) {
                    for (var k3 = 0; k3 < researchPapers.length; k3++) {
                        if (researchPapers[k3].title.length > 0 && researchPapers[k3].publication.length > 0 && researchPapers[k3].author.length > 0 && researchPapers[k3].conference.length > 0) {
                            continue;
                        }
                        else {
                            invalidResearch = true;
                            break;
                        }

                    }
                }
                else {
                    if (researchPapers[0].title.length > 0) {
                        if (researchPapers[0].publication.length > 0 && researchPapers[0].author.length > 0 && researchPapers[0].conference.length > 0) {
                            invalidResearch = false;
                        }
                        else {
                            invalidResearch = true;
                        }
                    }
                }
            }

            if (projects.length >= 1) {
                if (projects.length > 1) {
                    for (var k1 = 0; k1 < projects.length; k1++) {
                        if (projects[k1].description.length > 0 && projects[k1].project_link.length > 0 && projects[k1].project_link.match(URLregex) && projects[k1].title.length > 0) {
                            continue;
                        }
                        else {
                            invalidProjects = true;
                            break;
                        }

                    }
                }
                else {
                    if (projects[0].title.length > 0) {
                        if (projects[0].description.length > 0 && projects[0].project_link.length > 0) {
                            invalidProjects = false;
                        }
                        else {
                            invalidProjects = true;
                        }
                    }
                }
            }




            if (coursera.length >= 1) {
                if (coursera.length > 1) {
                    for (var k4 = 0; k4 < coursera.length; k4++) {
                        if (coursera[k4].course_name.length > 0 && coursera[k4].university.length > 0 && coursera[k4].duration > 0 && coursera[k4].cert_link.length > 0 && coursera[k4].cert_link.match(URLregex) && coursera[k4].sem > 0 && coursera[k4].sem <= 8) {
                            continue;
                        }
                        else {
                            invalidCoursera = true;
                            break;
                        }

                    }
                }
                else {
                    if (coursera[0].course_name.length > 0) {

                        if (coursera[0].university.length > 0 && coursera[0].duration > 0 && coursera[0].cert_link.length > 0 && coursera[0].cert_link.match(URLregex) && coursera[0].sem > 0 && coursera[0].sem <= 8) {
                            invalidCoursera = false;
                        }
                        else {
                            invalidCoursera = true;
                        }
                    }
                }
            }


            if (name.length > 0 && sapId.length > 0 && email.length > 0 && mailformat.test(email) === true && PhoneValidRegex.test(phoneNumber) && linkdin.match(URLregex) && linkdin.length > 0 && invalidCoursera === false && invalidAchivements === false && invalidInternship === false && invalidProjects === false && invalidResearch === false && invalidCgpaSem3 === false && invalidCgpaSem4 === false && invalidCgpaSem5 === false && invalidCgpaSem6 === false && invalidCgpaSem7 === false && invalidCgpaSem8 === false) {
                let temp12 = Array.from(achievements);
                let temp13 = Array.from(internship);
                let temp14 = Array.from(researchPapers);
                let temp15 = Array.from(projects);
                let temp16 = Array.from(coursera);

                if (temp16.length === 1 && temp16[0].course_name.length <= 0) {
                    temp16.splice(0, temp16.length);

                }

                if (temp15.length === 1 && temp15[0].title.length <= 0) {
                    temp15.splice(0, temp15.length);

                }
                if (temp14.length === 1 && temp14[0].title.length <= 0) {
                    temp14.splice(0, temp14.length);
                }

                if (temp13.length === 1 && temp13[0].name.length <= 0) {

                    temp13.splice(0, temp13.length);

                }
                if (temp12.length === 1 && temp12[0].description.length <= 0) {
                    temp12.splice(0, temp12.length);
                }

                setIsLoading(true);
                console.log({
                    sap_Id: sapId,
                    name: name,
                    email: email,
                    contact_no: phoneNumber,
                    linkedin: linkdin,
                    year_join: yearOfJoining.toString(),
                    year_passed: yearOfPassing.toString(),
                    profile_pic: profile.toString(),
                    contribution: contribution,
                    academic_cgpa: cgpa,
                    cultural_activities: cultural,
                    sports_activities: sports,
                    NSS_activities: nss,
                    internships: temp13,
                    Achievements: temp12,
                    Projects: temp15,
                    further_contributions: futureContribution,
                    Publications: temp14,
                    gre: gre,
                    ielts: ielts,
                    tofel: tofel,
                    cat: cat,
                    gmat: gmat,
                    gate: gate,
                    resume: resume,
                    coursera: coursera,
                });
                const response = await postEndPoint('/data', {
                    sap_Id: sapId,
                    name: name,
                    email: email,
                    contact_no: phoneNumber,
                    linkedin: linkdin,
                    year_join: yearOfJoining.toString(),
                    year_passed: yearOfPassing.toString(),
                    profile_pic: profile.toString(),
                    contribution: contribution,
                    academic_cgpa: cgpa,
                    cultural_activities: cultural,
                    sports_activities: sports,
                    NSS_activities: nss,
                    internships: temp13,
                    achievements: temp12,
                    projects: temp15,
                    further_contributions: futureContribution,
                    publications: temp14,
                    gre: gre,
                    ielts: ielts,
                    tofel: tofel,
                    cat: cat,
                    gmat: gmat,
                    gate: gate,
                    resume: resume,
                    coursera: temp16,
                }, null);;
                const { data } = response;
                if (data) {
                    setDataChanged(true);
                    setIsLoading(false);
                    setShow(true);
                }
                else {
                    setIsLoading(false);
                    setMessage("OOPS WE RAN INTO ERROR!!!");
                    setShowError(true);
                }
            }
            else {
                var mess0 = "";
                if (name.length <= 0) {
                    setInvalidName(true);
                    mess0 = "Please Enter Required  Details";
                }
                if (sapId.length <= 0) {
                    setinvalidSapId(true);
                    mess0 = "Please Enter Required  Details";
                }

                if (mailformat.test(email) === false) {
                    setInvalidEmail(true);
                    mess0 = "Please Enter Required  Details";
                }

                if (!linkdin.match(URLregex) || linkdin.length < 0) {
                    setInavlidLinkdin(true);
                    mess0 = "Please Enter Required  Details";
                }
                if (!PhoneValidRegex.test(phoneNumber)) {
                    setInvalidPhoneNumber(true);
                    mess0 = "Please Enter Required  Details";
                }

                if (invalidInternship) {
                    mess0 = mess0 + ", Please Enter Correct Internship Details";
                }

                if (invalidAchivements) {
                    mess0 = mess0 + ", Please Enter Correct Achivements Details";

                }
                if (invalidProjects) {
                    mess0 = mess0 + ",Please Enter Valid Project Details";
                }
                if (invalidResearch) {
                    mess0 = mess0 + ",Please Enter Valid Publication Details";

                }
                if (invalidCoursera) {
                    mess0 = mess0 + ",Please Enter Valid Coursera Details";
                }
                setMessage(mess0);
                setShowError(true);

            }
        }
        catch (err) {
            if (err.response.data.msg) {
                setMessage(err.response.data.msg)
                setShowError(true);
            }
            else {
                setMessage("OOPS AN ERROR OCCURED TRY AGAIN LATER!!");
                setShowError(true);
            }
        }
    }

    function checkBeforeUpload(type, id, index) {
        if (type === 1) {
            if (profile.length > 0 && profile !== "https://res.cloudinary.com/chiragjain55551/image/upload/v1627317877/StudentProject/vdjmvqojsnx3hckyuwm6.jpg") {
                setShowError(true);
                setMessage("Delete The document first!");
                return false;
            }
            else {
                return true;
            }
        }
        else if (type === 2 && id && index >= 0) {

            let temp3 = Array.from(internship);
            if (temp3[index].proof_link.length > 0) {
                setShowError(true);
                setMessage("Delete The document first!");
                return false;
            }
            else {
                return true;
            }


        }
        else if (type === 3 && id && index >= 0) {
            let temp3 = Array.from(achievements);
            if (temp3[index].proof_link.length > 0) {
                setShowError(true);
                setMessage("Delete The document first!");
                return false;
            }
            else {
                return true;
            }

        }
        else if (type === 4 && id) {

            if (resume.length > 0) {
                setShowError(true);
                setMessage("Delete The document first!");
                return false;
            }
            else {
                return true;
            }
        }
    }


    function uploadFiles(type, id, index) {
        /*FUNCTION TO UPLOAD DOCS*/
        if (checkBeforeUpload(type, id, index) === true) {
            let uploadPreset = "";
            let folder = "";
            let fileName = "";
            if (type === 1) {
                uploadPreset = "profile_pic_present";
                folder = sapId
                fileName = sapId.toString() + "_ProfilePic_" + uuid().toString();
            }
            else {
                uploadPreset = "document_present"
                folder = sapId
                if (type === 2) {
                    fileName = sapId.toString() + "_Internship_" + uuid().toString();
                }
                else if (type === 3) {
                    fileName = sapId.toString() + "_Achivements_" + uuid().toString();
                }
                else if (type === 4) {
                    fileName = sapId.toString() + "_Resume_" + uuid().toString();
                }
            }

            window.cloudinary.openUploadWidget({
                cloudName: "djsceit", uploadPreset: uploadPreset, sources: ["local"], showAdvancedOptions: false, cropping: false, multiple: false, defaultSource: "local", folder: folder, public_id: fileName,
                styles: {
                    palette: { window: "#FFFFFF", windowBorder: "#90A0B3", tabIcon: "#0078FF", menuIcons: "#5A616A", textDark: "#000000", textLight: "#FFFFFF", link: "#0078FF", action: "#FF620C", inactiveTabIcon: "#0E2F5A", error: "#F44235", inProgress: "#0078FF", complete: "#20B832", sourceBg: "#E4EBF1" },
                    fonts: { default: { active: true } }
                }
            },
                (error, result) => {
                    if (!error && result.event === "success") {
                        setShow(true);
                        const url = result.info.secure_url;
                        if (type === 1) {
                            setProfile(url);
                        }
                        else if (type === 2 && id && index >= 0) {

                            let temp3 = Array.from(internship);
                            temp3[index].proof_link = url;
                            setInternship(temp3);

                        }
                        else if (type === 3 && id && index >= 0) {
                            let temp3 = Array.from(achievements);
                            temp3[index].proof_link = url;
                            setAchievements(temp3);

                        }
                        else if (type === 4 && id) {
                            setResume(url);
                        }

                    }
                    else if (error) {
                        setMessage("OOOPS WE RAN INTO ERROR!")
                        setShowError(true);
                    }
                }
            );
        }
    }

    function deleteUploadedDoc(type, id, index) {
        /*FUNCTION TO DELETE DOCS*/
        if (type === 1) {
            setProfile("https://res.cloudinary.com/chiragjain55551/image/upload/v1627317877/StudentProject/vdjmvqojsnx3hckyuwm6.jpg");
        }
        else if (type === 2 && id && index >= 0) {

            let temp3 = Array.from(internship);
            temp3[index].proof_link = "";
            setInternship(temp3);

        }
        else if (type === 3 && id && index >= 0) {
            let temp3 = Array.from(achievements);
            temp3[index].proof_link = "";
            setAchievements(temp3);

        }
        else if (type === 4) {
            setResume("");
        }

    }

    function DeleteDetails(type, index) {
        //FUNCTION TO DELETE  FORM
        if (type === 1) {
            if (index >= 0 && index < internship.length && internship.length > 1) {

                let temp = Array.from(internship);
                temp.splice(index, 1);
                setInternship(temp);
            }
        }
        else if (type === 2) {
            if (index >= 0 && index < achievements.length && achievements.length > 1) {

                let temp = Array.from(achievements);
                temp.splice(index, 1);
                setAchievements(temp);
            }
        }
        else if (type === 3) {
            if (index >= 0 && index < researchPapers.length && researchPapers.length > 1) {

                let temp = Array.from(researchPapers);
                temp.splice(index, 1);
                setResearchPapers(temp);
            }
        }
        else if (type === 4) {
            if (index >= 0 && index < projects.length && projects.length > 1) {

                let temp = Array.from(projects);
                temp.splice(index, 1);
                setProjects(temp);
            }

        }
        else if (type === 5) {
            if (index >= 0 && index < coursera.length && coursera.length > 1) {
                let temp = Array.from(coursera);
                temp.splice(index, 1);
                setCoursera(temp);
            }
        }
    }

    function AddDetails(type) {
        //FUNCTION TO ADD Details FORM
        if (type === 1) {
            let temp2 = Array.from(internship);
            let valid2 = false;
            if (temp2.length > 0) {
                for (var i2 = 0; i2 < temp2.length; i2++) {
                    var value2 = temp2[i2]
                    if (value2.role.length > 0 && value2.name.length > 0 && value2.description.length > 1) {
                        valid2 = true;
                    }
                    else {
                        valid2 = false;
                        break;
                    }
                }
            }
            else {
                valid2 = true;
            }
            if (valid2) {
                temp2.push({ key: uuid(), name: "", role: "", description: "", proof_link: "" });
                setInternship(temp2);
            }

            else if (!valid2) {
                setMessage("Please fill the previous details!!");
                setShowError(true);
            }
        }
        else if (type === 2) {
            let temp = Array.from(achievements);
            let valid = false;
            if (temp.length > 0) {
                for (var i = 0; i < temp.length; i++) {
                    var value = temp[i]
                    if (value.description.length > 0) {
                        valid = true;
                    }
                    else {
                        valid = false;
                        break;
                    }
                }
            }
            else {
                valid = true;
            }
            if (valid) {
                temp.push({ key: uuid(), description: "", proof_link: "" });
                setAchievements(temp);
            }

            else {
                setMessage("Please fill the previous details!!");
                setShowError(true);
            }
        }
        else if (type === 3) {
            let temp5 = Array.from(researchPapers);
            let valid5 = false;
            if (temp5.length > 0) {
                for (var i5 = 0; i5 < temp5.length; i5++) {
                    var value5 = temp5[i5]
                    if (value5.title.length > 0 && value5.author.length > 0 && value5.conference.length > 0 && value5.year.length > 0) {
                        valid5 = true;
                    }
                    else {
                        valid5 = false;
                        break;
                    }
                }
            }
            else {
                valid5 = true;
            }
            if (valid5) {
                temp5.push({ key: uuid(), title: "", publication: "", author: "", year: "", conference: "" });
                setResearchPapers(temp5);
            }

            else if (!valid5) {
                setMessage("Please fill the previous details!!");
                setShowError(true);
            }
        }
        else if (type === 4) {
            let temp3 = Array.from(projects);
            let valid3 = false;
            if (temp3.length > 0) {
                for (var i3 = 0; i3 < temp3.length; i3++) {
                    var value3 = temp3[i3];
                    if (value3.description.length > 0 && value3.title.length > 0 && value3.project_link.length > 0) {
                        valid3 = true;
                    }
                    else {
                        valid3 = false;
                        break;
                    }
                }
            }
            else {
                valid3 = true;
            }
            if (valid3) {
                temp3.push({ key: uuid(), title: "", description: "", project_link: "" });
                setProjects(temp3);
            }
            else if (!valid3) {
                setMessage("Please fill the previous details!!");
                setShowError(true);
            }
        }
        else if (type === 5) {
            let temp5 = Array.from(coursera);
            let valid5 = false;
            if (temp5.length > 0) {
                for (var i7 = 0; i7 < temp5.length; i7++) {
                    var value55 = temp5[i7];
                    if (value55.course_name.length > 0 && value55.university.length > 0 && value55.sem > 0 && value55.duration > 0 && value55.cert_link.length > 0 && value55.cert_link.match(URLregex) && value55.sem <= 8) {
                        valid5 = true;
                    }
                    else {
                        valid5 = false;
                        break;
                    }
                }
            }
            else {
                valid5 = true;
            }
            if (valid5) {
                temp5.push({ key: uuid(), course_name: "", university: "", duration: "", sem: "", cert_link: "", level: "" });
                setCoursera(temp5);
            }
            else {
                setMessage("Please fill the previous details!!");
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

    function reColor(index) {
        /*FUNCTION TO COLOR TABS */
        let tempTab = Array.from(tab);
        for (var i = 0; i < tempTab.length; i++) {
            tempTab[i] = false;
        }
        tempTab[index] = true;
        setTab(tempTab);

    }

    function addListner() {
        /*FUNCTION TO ADD LISTENERS */
        document.addEventListener('scroll', function () {
            if (profilePicDiv && basicDetails && cgpas && coCurricular && internshipDiv && achievementsDiv && paperDiv && scoreDiv && resumeDiv && futureDiv && courseraDiv) {

                if (isInViewport(profilePicDiv.current)) {
                    reColor(0);
                }
                else if (isInViewport(basicDetails.current)) {
                    reColor(1);
                }
                else if (isInViewport(cgpas.current)) {
                    reColor(2);
                }
                else if (isInViewport(coCurricular.current)) {
                    reColor(3);
                }
                else if (isInViewport(internshipDiv.current)) {
                    reColor(4);
                }
                else if (isInViewport(courseraDiv.current)) {
                    reColor(5);
                }
                else if (isInViewport(achievementsDiv.current)) {
                    reColor(6);
                }
                else if (isInViewport(paperDiv.current)) {
                    reColor(7);
                }
                else if (isInViewport(projectDiv.current)) {
                    reColor(8);
                }
                else if (isInViewport(scoreDiv.current)) {
                    reColor(9);
                }

                else if (isInViewport(resumeDiv.current)) {
                    reColor(10);
                }
                else if (isInViewport(futureDiv.current)) {
                    reColor(11);
                }
                else {

                }
            }
        });

    }
    function isInViewport(el) {
        if (el) {
            const rect = el.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)

            );
        }
        else {
            return false
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
            <div className="customToastMessage">
                <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide bg="success">
                    <Toast.Body style={{ fontWeight: "bold", color: "white" }}>Successfully uploaded!</Toast.Body>
                </Toast>
            </div>
            <div className="customToastMessage">
                <Toast onClose={() => setShowError(false)} show={showError} delay={3000} autohide bg="danger">
                    <Toast.Body style={{ fontWeight: "bold", color: "white" }}>{message}</Toast.Body>
                </Toast>
            </div>
            <div style={{ background: "#EFF2F7" }}>

                <UserNavbar type={3} />

                <Container style={{ marginTop: "2%", marginBottom: "2%" }}>
                    {/* LEFT SIDE TAB */}
                    <Row>
                        <Col xs={10} sm={5} md={4} lg={3}>
                            <ButtonGroup vertical className="bottonTabColumn"  >
                                <Button style={{ fontFamily: "Poppins", fontStyle: "normal", fontWeight: "500", fontSize: "18px", lineHeight: "27px", color: tab[0] ? inactiveTabColor : inactiveText, backgroundColor: tab[0] ? activeTabColor : inactiveTabColor, border: "none", textAlign: "start" }} href="#profilePic" onClick={() => { reColor(0); }}>Profile Pic</Button>
                                <Button style={{ fontFamily: "Poppins", fontStyle: "normal", fontWeight: "500", fontSize: "18px", lineHeight: "27px", color: tab[1] ? inactiveTabColor : inactiveText, backgroundColor: tab[1] ? activeTabColor : inactiveTabColor, border: "none", textAlign: "start" }} href="#basicDetail" onClick={() => { reColor(1); }}>Basic Profile</Button>
                                <Button style={{ fontFamily: "Poppins", fontStyle: "normal", fontWeight: "500", fontSize: "18px", lineHeight: "27px", color: tab[2] ? inactiveTabColor : inactiveText, backgroundColor: tab[2] ? activeTabColor : inactiveTabColor, border: "none", textAlign: "start" }} href="#CGPA" onClick={() => { reColor(2); }}>C.G.P.A</Button>
                                <Button style={{ fontFamily: "Poppins", fontStyle: "normal", fontWeight: "500", fontSize: "18px", lineHeight: "27px", color: tab[3] ? inactiveTabColor : inactiveText, backgroundColor: tab[3] ? activeTabColor : inactiveTabColor, border: "none", textAlign: "start" }} href="#Co-curricular" onClick={() => { reColor(3); }}>Co-curricular activities</Button>
                                <Button style={{ fontFamily: "Poppins", fontStyle: "normal", fontWeight: "500", fontSize: "18px", lineHeight: "27px", color: tab[4] ? inactiveTabColor : inactiveText, backgroundColor: tab[4] ? activeTabColor : inactiveTabColor, border: "none", textAlign: "start" }} href="#internship" onClick={() => { reColor(4); }}>Internship Details </Button>
                                <Button style={{ fontFamily: "Poppins", fontStyle: "normal", fontWeight: "500", fontSize: "18px", lineHeight: "27px", color: tab[5] ? inactiveTabColor : inactiveText, backgroundColor: tab[5] ? activeTabColor : inactiveTabColor, border: "none", textAlign: "start" }} href="#coursera" onClick={() => { reColor(5); }}>Coursera</Button>
                                <Button style={{ fontFamily: "Poppins", fontStyle: "normal", fontWeight: "500", fontSize: "18px", lineHeight: "27px", color: tab[6] ? inactiveTabColor : inactiveText, backgroundColor: tab[6] ? activeTabColor : inactiveTabColor, border: "none", textAlign: "start" }} href="#achivements" onClick={() => { reColor(6); }}>Achievements</Button>
                                <Button style={{ fontFamily: "Poppins", fontStyle: "normal", fontWeight: "500", fontSize: "18px", lineHeight: "27px", color: tab[7] ? inactiveTabColor : inactiveText, backgroundColor: tab[7] ? activeTabColor : inactiveTabColor, border: "none", textAlign: "start" }} href="#research" onClick={() => { reColor(7); }}>Research Paper</Button>
                                <Button style={{ fontFamily: "Poppins", fontStyle: "normal", fontWeight: "500", fontSize: "18px", lineHeight: "27px", color: tab[8] ? inactiveTabColor : inactiveText, backgroundColor: tab[8] ? activeTabColor : inactiveTabColor, border: "none", textAlign: "start" }} href="#projects" onClick={() => { reColor(8); }}>Projects</Button>
                                <Button style={{ fontFamily: "Poppins", fontStyle: "normal", fontWeight: "500", fontSize: "18px", lineHeight: "27px", color: tab[9] ? inactiveTabColor : inactiveText, backgroundColor: tab[9] ? activeTabColor : inactiveTabColor, border: "none", textAlign: "start" }} href="#score" onClick={() => { reColor(9); }}>Competitive Exams</Button>
                                <Button style={{ fontFamily: "Poppins", fontStyle: "normal", fontWeight: "500", fontSize: "18px", lineHeight: "27px", color: tab[10] ? inactiveTabColor : inactiveText, backgroundColor: tab[10] ? activeTabColor : inactiveTabColor, border: "none", textAlign: "start" }} href="#resume" onClick={() => { reColor(10); }}>Resume</Button>
                                <Button style={{ fontFamily: "Poppins", fontStyle: "normal", fontWeight: "500", fontSize: "18px", lineHeight: "27px", color: tab[11] ? inactiveTabColor : inactiveText, backgroundColor: tab[11] ? activeTabColor : inactiveTabColor, border: "none", textAlign: "start" }} href="#future" onClick={() => { reColor(11); }}>Future contributions</Button>
                            </ButtonGroup>

                        </Col>

                        <Col xs={12} sm={12} md={8} lg={8}>
                            {/*FORMS ON RIGHT*/}

                            <div className="mainBox" id="profilePic" ref={profilePicDiv}>
                                {/*PROFILE PICTURE SECTION*/}
                                <h3 className="headings">Profile picture</h3>
                                <label className="subHeadings">Please update profile details here</label>
                                <hr></hr>
                                <div className="Profile">
                                    {profile && profile.length > 0 && profile === "https://res.cloudinary.com/chiragjain55551/image/upload/v1627317877/StudentProject/vdjmvqojsnx3hckyuwm6.jpg" ? <Button style={{ border: "none", outline: "none", background: "#050558", fontWeight: "500", color: "#fff", paddingLeft: "20px", paddingRight: "20px", marginTop: "5%", width: "150px", height: "50px" }} variant="info" onClick={() => { uploadFiles(1, null, null); }}>Upload  Pic</Button> : null}
                                    {profile && profile.length > 0 && profile !== "https://res.cloudinary.com/chiragjain55551/image/upload/v1627317877/StudentProject/vdjmvqojsnx3hckyuwm6.jpg" ? <Button style={{ color: "white", cursor: "pointer", background: "red", marginLeft: "1%", paddingLeft: "20px", paddingRight: "20px", marginTop: "5%", width: "150px", height: "50px", border: "none" }} onClick={() => { deleteUploadedDoc(1, null, null); }}><AiFillDelete /> Delete </Button> : null}
                                    <div className="ProfilePicCard">
                                        <h3 className="headings" style={{ padding: "5px" }}>Current Profile Image</h3>
                                        <img className="ProfileImage" style={{ marginTop: "1%", border: "3px solid #050558" }} src={profile} alt="profile_pic" />
                                    </div>
                                </div>
                            </div>
                            <br />
                            <br />
                            <br />

                            <Form onSubmit={(event) => { event.preventDefault(); }}>

                                <div className="mainBox" style={{ marginTop: "3%" }} id="basicDetail" ref={basicDetails}>
                                    {/*PROFILE  SECTION*/}
                                    <h3 className="headings">Basic Profile</h3>
                                    <label className="subHeadings">Please update profile details here</label>
                                    <hr></hr>
                                    <Form.Group as={Row} className="mb-3"  >
                                        <Col sm={4} md={5} lg={4}>
                                            <Form.Label className="BoldTextHeading" >Name  <label className="invalidWarning">*</label></Form.Label>
                                        </Col>
                                        <Col sm={6} md={6} lg={5} >
                                            <Form.Control name="Name" type="text" className="customInputField" value={name} onInput={(event) => { ValidationOnChange(event); }} isInvalid={invalidName} />
                                            {invalidName ? <h5 className="invalidWarning">Invalid value entered</h5> : null}
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3" >
                                        <Col sm={4} md={5} lg={4}>
                                            <Form.Label className="BoldTextHeading">Sap Id <label className="invalidWarning">*</label></Form.Label>
                                        </Col>
                                        <Col sm={6} md={6} lg={5} >
                                            <Form.Control name="SapId" type="number" className="customInputField" rows={8} value={sapId} disabled={true} isInvalid={invalidSapId} />
                                            {invalidSapId ? <h5 className="invalidWarning">Invalid value entered</h5> : null}
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3" >
                                        <Col sm={4} md={5} lg={4}>
                                            <Form.Label className="BoldTextHeading">Email <label className="invalidWarning">*</label> </Form.Label>
                                        </Col>
                                        <Col sm={6} md={6} lg={5} >
                                            <Form.Control name="Email" id="Email" type="email" className="customInputField" rows={5} value={email} onInput={(event) => { ValidationOnChange(event); }} isInvalid={invalidEmail} />
                                            {invalidEmail ? <h5 className="invalidWarning">Invalid value entered</h5> : null}
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3" >
                                        <Col sm={4} md={5} lg={4}>
                                            <Form.Label className="BoldTextHeading">Contact Number <label className="invalidWarning">*</label></Form.Label>
                                        </Col>
                                        <Col sm={6} md={6} lg={5} >
                                            <Form.Control name="ContactNumber" type="text" rows={5} className="customInputField" value={phoneNumber} onInput={(event) => { ValidationOnChange(event); }} isInvalid={invalidPhoneNumber} />
                                            {invalidPhoneNumber ? <h5 className="invalidWarning">Invalid value entered</h5> : null}
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3" >
                                        <Col sm={4} md={5} lg={4}>
                                            <Form.Label className="BoldTextHeading">Linkedin Profile Link <label className="invalidWarning">*</label></Form.Label>
                                        </Col>
                                        <Col sm={6} md={6} lg={5} >
                                            <Form.Control name="Linkdin" type="text" rows={5} className="customInputField" value={linkdin} onInput={(event) => { ValidationOnChange(event); }} isInvalid={invalidLinkdin} />
                                            {invalidLinkdin ? <h5 className="invalidWarning">Invalid value entered</h5> : null}
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3" >
                                        <Col sm={4} md={5} lg={4}>
                                            <Form.Label className="BoldTextHeading">Year of Joining <label className="invalidWarning">*</label></Form.Label>
                                        </Col>
                                        <Col sm={6} md={6} lg={5} >
                                            <Form.Control type="number" className="customInputField" rows={5} value={yearOfJoining} disabled={true} />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3" >
                                        <Col sm={4} md={5} lg={4}>
                                            <Form.Label className="BoldTextHeading">Year of Passing <label className="invalidWarning">*</label></Form.Label>
                                        </Col>
                                        <Col sm={6} md={6} lg={5} >
                                            <Form.Control type="number" className="customInputField" rows={5} value={yearOfPassing} disabled={true} />
                                        </Col>
                                    </Form.Group>
                                </div>
                                <br /><br />
                                <div className="mainBox" id="3" style={{ marginTop: "3%" }}>
                                    <Form.Group as={Row} className="mb-3" >

                                        <Form.Label className="headings">What are your contributions towards the department during the 3 years of engineering?</Form.Label>
                                        <label className="subHeadings">Please update details below </label>
                                        <Col  >
                                            <Form.Control name="Contribution" className="customInputField" as="textarea" value={contribution} onInput={(event) => { ValidationOnChange(event); }} />
                                        </Col>

                                    </Form.Group>
                                </div>
                                <br /><br />



                                <div className="mainBox" style={{ marginTop: "3%" }} id="CGPA" ref={cgpas}>
                                    {/*CGPA  SECTION*/}
                                    <h4 className="headings" >Enter CGPA (out of 10)  </h4>
                                    <label className="subHeadings">Please update detials below </label>
                                    <hr />
                                    <Form.Group as={Row} className="mb-3" >
                                        <Col sm={4} md={5} lg={4}>
                                            <Form.Label className="BoldTextHeading">SEM 3  </Form.Label>
                                        </Col>
                                        <Col sm={6} md={6} lg={5} >
                                            <Form.Control name="Cgpa" className="customInputField" id="sem3" type="number" rows={5} defaultValue={cgpa[0] ? cgpa[0] : ""} onInput={(event) => { ValidationOnChange(event); }} isInvalid={invalidCgpaSem3} />
                                            {invalidCgpaSem3 ? <h5 className="invalidWarning">Invalid value entered</h5> : null}
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3" >
                                        <Col sm={4} md={5} lg={4}>
                                            <Form.Label className="BoldTextHeading"  >SEM 4 </Form.Label>
                                        </Col>
                                        <Col sm={6} md={6} lg={5} >
                                            <Form.Control name="Cgpa" className="customInputField" id="sem4" type="number" rows={5} defaultValue={cgpa[1] ? cgpa[1] : ""} onInput={(event) => { ValidationOnChange(event); }} isInvalid={invalidCgpaSem4} />
                                            {invalidCgpaSem4 ? <h5 className="invalidWarning">Invalid value entered</h5> : null}
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3" >
                                        <Col sm={4} md={5} lg={4}>
                                            <Form.Label className="BoldTextHeading">SEM 5 </Form.Label>
                                        </Col>
                                        <Col sm={6} md={6} lg={5} >
                                            <Form.Control name="Cgpa" className="customInputField" id="sem5" type="number" rows={5} defaultValue={cgpa[2] ? cgpa[2] : ""} onInput={(event) => { ValidationOnChange(event); }} isInvalid={invalidCgpaSem5} />
                                            {invalidCgpaSem5 ? <h5 className="invalidWarning">Invalid value entered</h5> : null}
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3" >
                                        <Col sm={4} md={5} lg={4}>
                                            <Form.Label className="BoldTextHeading">SEM 6 </Form.Label>
                                        </Col>
                                        <Col sm={6} md={6} lg={5} >
                                            <Form.Control name="Cgpa" className="customInputField" id="sem6" type="number" rows={5} defaultValue={cgpa[3] ? cgpa[3] : ""} onInput={(event) => { ValidationOnChange(event); }} isInvalid={invalidCgpaSem6} />
                                            {invalidCgpaSem6 ? <h5 className="invalidWarning">Invalid value entered</h5> : null}
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3" >
                                        <Col sm={4} md={5} lg={4}>
                                            <Form.Label className="BoldTextHeading">SEM 7  </Form.Label>
                                        </Col>
                                        <Col sm={6} md={6} lg={5} >
                                            <Form.Control name="Cgpa" className="customInputField" id="sem7" type="number" rows={5} defaultValue={cgpa[4] ? cgpa[4] : ""} onInput={(event) => { ValidationOnChange(event); }} isInvalid={invalidCgpaSem7} />
                                            {invalidCgpaSem7 ? <h5 className="invalidWarning">Invalid value entered</h5> : null}
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3" >
                                        <Col sm={4} md={5} lg={4}>
                                            <Form.Label className="BoldTextHeading">SEM 8  </Form.Label>
                                        </Col>
                                        <Col sm={6} md={6} lg={5} >
                                            <Form.Control name="Cgpa" className="customInputField" id="sem8" type="number" rows={5} defaultValue={cgpa[5] ? cgpa[5] : ""} onInput={(event) => { ValidationOnChange(event); }} isInvalid={invalidCgpaSem8} />
                                            {invalidCgpaSem8 ? <h5 className="invalidWarning">Invalid value entered</h5> : null}
                                        </Col>
                                    </Form.Group>
                                </div>

                                <br /><br />


                                <div className="mainBox" style={{ marginTop: "3%" }} id="Co-curricular" ref={coCurricular}>
                                    {/*Co-curricular activities SECTION*/}
                                    <h3 className="headings">Co-curricular activities</h3>
                                    <label className="subHeadings">Please update co-curricular activities</label>
                                    <hr></hr>
                                    <Form.Group as={Row} className="mb-3" >
                                        <Col sm={4} md={5} lg={4}>
                                            <Form.Label className="BoldTextHeading">Mention your Cultural  activities</Form.Label>
                                        </Col>
                                        <Col sm={6} md={6} lg={5} >
                                            <Form.Control name="Cultural" className="customInputField" as="textarea" value={cultural} onInput={(event) => { ValidationOnChange(event); }} />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3" >
                                        <Col sm={4} md={5} lg={4}>
                                            <Form.Label className="BoldTextHeading">Mention your  activities in NSS</Form.Label>
                                        </Col>
                                        <Col sm={6} md={6} lg={5} >
                                            <Form.Control name="Nss" className="customInputField" as="textarea" value={nss} onInput={(event) => { ValidationOnChange(event); }} />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3" >
                                        <Col sm={4} md={5} lg={4}>
                                            <Form.Label className="BoldTextHeading">Mention your  activities in Sports</Form.Label>
                                        </Col>
                                        <Col sm={6} md={6} lg={5} >
                                            <Form.Control name="Sports" className="customInputField" as="textarea" value={sports} onInput={(event) => { ValidationOnChange(event); }} />
                                        </Col>
                                    </Form.Group>
                                </div>
                                <br /><br />


                                <div className="mainBox" style={{ marginTop: "3%" }} id="internship" ref={internshipDiv}>
                                    {/*INTERNSHIP SECTION*/}
                                    <h4 className="headings">Internship Details</h4>
                                    <label className="subHeadings">Please enter internship details (Note: Proof of internship should contain evalutation report filled by company and your certificate/LOR given by the company)</label>
                                    <hr />
                                    {
                                        internship.map((value, index) => {

                                            return (
                                                <div className="mainContainer" style={{ marginTop: "3%", }} key={value.key}>
                                                    {internship.length > 1 ? <div><h4 className="headings" >Internship {index + 1} </h4> <hr /></div> : null}
                                                    <Form.Group className="mb-3 mt-3" >
                                                        <Row>
                                                            <Col sm={4} md={5} lg={4}>
                                                                <Form.Label className="BoldTextHeading">Name of Company</Form.Label>{/*{ _id: uuid(), name: "", role: "", description: "", proof_link: "",start_date:"", end_date:"" }*/}
                                                            </Col>
                                                            <Col sm={6} md={6} lg={5} >
                                                                <Form.Control name="Internship" className="customInputField" id={"NameOfCompany," + value.key} type="text" rows={5} defaultValue={value.name && value.name.length > 0 ? value.name : ""} onInput={(event) => { ValidationOnChange(event); }} />
                                                            </Col>
                                                        </Row>
                                                        <br />
                                                        <Row>
                                                            <Col sm={4} md={5} lg={4}>
                                                                <Form.Label className="BoldTextHeading">Role</Form.Label>
                                                            </Col>
                                                            <Col sm={6} md={6} lg={5} >
                                                                <Form.Control name="InternshipRole" className="customInputField" id={"Role," + value.key} type="text" rows={5} defaultValue={value.role && value.description.length > 0 ? value.role : ""} onInput={(event) => { ValidationOnChange(event); }} />
                                                            </Col>
                                                        </Row>
                                                        <br />
                                                        <Row>
                                                            <Col sm={4} md={5} lg={4}>
                                                                <Form.Label className="BoldTextHeading">Description</Form.Label>
                                                            </Col>
                                                            <Col sm={6} md={6} lg={5} >
                                                                <Form.Control name="InternshipDescription" className="customInputField" id={"Description," + value.key} as="textarea" rows={5} defaultValue={value.description && value.description.length > 0 ? value.description : ""} onInput={(event) => { ValidationOnChange(event); }} />
                                                            </Col>
                                                        </Row>
                                                        <div className="mainDocumentDiv" style={{ marginTop: "12px", alignItems: "center" }}>
                                                            <div className="documentDiv">
                                                                <Form.Label className="BoldTextHeading" style={{ marginRight: "2%" }}>Proof of Internship</Form.Label>
                                                                <Button style={{ border: "none", outline: "none", background: "#050558", fontWeight: "500", paddingLeft: "20px", paddingRight: "20px", marginTop: "0.5%" }} onClick={() => { uploadFiles(2, value.key, index); }}>Upload Document</Button>
                                                            </div>
                                                            {value.proof_link && value.proof_link.length > 1 ?
                                                                <div className="documentIconsDiv" style={{ display: "flex", justifyContent: "flex-start" }}>
                                                                    <OverlayTrigger
                                                                        placement={"top"}
                                                                        overlay={<Tooltip>View uploaded document</Tooltip>}>
                                                                        <a href={value.proof_link} rel="noreferrer" target="_blank"><BsEye className="eyeIcon" /></a>
                                                                    </OverlayTrigger>
                                                                    <OverlayTrigger
                                                                        placement={"top"}
                                                                        overlay={<Tooltip>Delete uploaded document</Tooltip>}
                                                                    >
                                                                        <label style={{ color: "red", cursor: "pointer" }} onClick={() => { deleteUploadedDoc(2, value.key, index); }}>
                                                                            <AiFillDelete style={{ fontSize: "28px", marginRight: "12px", marginLeft: "10px" }} />
                                                                        </label>
                                                                    </OverlayTrigger>
                                                                </div>
                                                                : null}
                                                        </div>
                                                        {index !== 0 ?
                                                            <OverlayTrigger
                                                                placement={"top"}
                                                                overlay={<Tooltip>Delete this Internship</Tooltip>}
                                                            >
                                                                <div className="deleteButton">
                                                                    <Button variant="danger" style={{ fontWeight: "500", marginTop: "1.5%", backgroundColor: "#7f0a15", borderColor: "#7f0a15" }} onClick={() => { DeleteDetails(1, index); }}>
                                                                        Delete
                                                                    </Button>
                                                                </div>
                                                            </OverlayTrigger> : null}
                                                    </Form.Group>
                                                </div>
                                            );
                                        })
                                    }
                                    <br />
                                    <div onClick={() => { AddDetails(1); }} style={{ display: 'flex', alignItems: "center", color: " #2323a4", cursor: "pointer" }}>
                                        <GrAddCircle style={{ fontSize: "25px" }} /><span style={{ marginLeft: "5px", fontSize: "15px", fontFamily: "monospace" }}>Add More Internships</span>
                                    </div>
                                </div>
                                <br /><br />



                                <div className="mainBox" id="coursera" ref={courseraDiv}>
                                    {/*Coursera*/}
                                    <h4 className="headings">Coursera Details</h4>
                                    <label className="subHeadings">Please enter the coursera details(if you have/had taken coursera )</label>  { /* key: uuid(), course_name: "", university:"",duration: "",sem:"",cert_link: "", level:"" */}
                                    <hr />
                                    {
                                        coursera.map((value, index) => {
                                            return (
                                                <div className="mainContainer" style={{ marginTop: "3%" }} key={value.key}>
                                                    {coursera.length > 1 ? <div> <h4 className="headings">Course {index + 1} </h4> <hr /> </div> : null}
                                                    <Form.Group className="mb-3" >
                                                        <Row>
                                                            <Col sm={4} md={5} lg={4}>
                                                                <Form.Label className="BoldTextHeading">Course name</Form.Label>
                                                            </Col>
                                                            <Col sm={6} md={6} lg={5} >
                                                                <Form.Control className="customInputField" name="CourseName" id={"CourseName," + value.key} defaultValue={value.course_name && value.course_name.length > 0 ? value.course_name : ""} type="text" rows={5} onInput={(event) => { ValidationOnChange(event); }} />
                                                            </Col>
                                                        </Row>
                                                        <br />
                                                        <Row>
                                                            <Col sm={4} md={5} lg={4}>
                                                                <Form.Label className="BoldTextHeading">Company/University</Form.Label>
                                                            </Col>
                                                            <Col sm={6} md={6} lg={5} >
                                                                <Form.Control className="customInputField" name="CourseraUniversity" id={"University," + value.key} defaultValue={value.university && value.university.length > 0 ? value.university : ""} type="text" rows={5} onInput={(event) => { ValidationOnChange(event); }} />
                                                            </Col>
                                                        </Row>
                                                        <br />
                                                        <Row>
                                                            <Col sm={4} md={5} lg={4}>
                                                                <Form.Label className="BoldTextHeading">Semester in which you completed this</Form.Label>
                                                            </Col>
                                                            <Col sm={6} md={6} lg={5} >
                                                                <Form.Control className="customInputField" name="CourseSem" id={"CourseSem," + value.key} type="number" min={1} max={8} defaultValue={value.sem && value.sem.length > 0 ? value.sem : ""} rows={5} onInput={(event) => { ValidationOnChange(event); }} />
                                                            </Col>
                                                        </Row>
                                                        <br />
                                                        <Row>
                                                            <Col sm={4} md={5} lg={4}>
                                                                <Form.Label className="BoldTextHeading">Duration(in weeks)</Form.Label>
                                                            </Col>
                                                            <Col sm={6} md={6} lg={5} >
                                                                <Form.Control className="customInputField" name="CourseDuration" id={"CourseDuration," + value.key} type="number" rows={5} defaultValue={value.duration && value.duration.length > 0 ? value.duration : ""} onInput={(event) => { ValidationOnChange(event); }} />
                                                            </Col>
                                                        </Row>
                                                        <br />
                                                        <Row>
                                                            <Col sm={4} md={5} lg={4}>
                                                                <Form.Label className="BoldTextHeading">Level of Course</Form.Label>
                                                            </Col>
                                                            <Col sm={6} md={6} lg={5} >
                                                                <Form.Control className="customInputField" name="CourseLevel" id={"CourseLevel," + value.key} type="text" rows={5} defaultValue={value.level && value.level.length > 0 ? value.level : ""} onInput={(event) => { ValidationOnChange(event); }} />
                                                            </Col>
                                                        </Row>
                                                        <br />
                                                        <Row>
                                                            <Col sm={4} md={5} lg={4}>
                                                                <Form.Label className="BoldTextHeading">Certificate Link</Form.Label>
                                                            </Col>
                                                            <Col sm={6} md={6} lg={5} >
                                                                <Form.Control className="customInputField" name="CourseCerti" id={"CourseCerti," + value.key} type="text" rows={5} defaultValue={value.cert_link && value.cert_link.length > 0 ? value.cert_link : ""} onInput={(event) => { ValidationOnChange(event); }} />
                                                            </Col>
                                                        </Row>

                                                        {index !== 0 ?
                                                            <OverlayTrigger
                                                                placement={"top"}
                                                                overlay={<Tooltip>Delete this Course</Tooltip>}
                                                            >
                                                                <div className="deleteButton">
                                                                    <Button variant="danger" style={{ fontWeight: "500", marginTop: "2rem", backgroundColor: "#7f0a15", borderColor: "#7f0a15" }} onClick={() => { DeleteDetails(5, index); }}>
                                                                        Delete
                                                                    </Button>
                                                                </div>
                                                            </OverlayTrigger>
                                                            : null}
                                                    </Form.Group>
                                                </div>
                                            );
                                        })
                                    }
                                    <br />
                                    <div onClick={() => { AddDetails(5); }} style={{ display: 'flex', alignItems: "center", color: " #2323a4", cursor: "pointer" }}>
                                        <GrAddCircle style={{ fontSize: "25px" }} /><span style={{ marginLeft: "5px", fontSize: "15px", fontFamily: "monospace" }}>Add More Course</span>
                                    </div>
                                </div>
                                <br />





                                <div className="mainBox" id="achivements" ref={achievementsDiv}>
                                    {/*ACHIVEMENTS SECTION */}
                                    <h4 className="headings">Mention your Co-curricular activities /achievements (Hackathon / competitions / committee member/ online courses / certifications)</h4>
                                    <label className="subHeadings">Please update co-curricular achivements/activities</label>
                                    <hr />
                                    {
                                        achievements.map((value, index) => {
                                            return (
                                                <div className="mainContainer" style={{ marginTop: "3%", border: "1px solid lightgray", borderRadius: "12px" }} key={value.key}>
                                                    {achievements.length > 1 ? <div> <h4 className="headings">Achivement {index + 1} </h4> <hr /> </div> : null}
                                                    <Form.Group className="mb-3" >
                                                        <Row>
                                                            <Col sm={4} md={5} lg={4}>
                                                                <Form.Label className="BoldTextHeading" >Description</Form.Label>
                                                            </Col>
                                                            <Col sm={6} md={6} lg={5} >
                                                                <Form.Control name="AchievementDescription" className="customInputField" id={"AchievementDescription," + value.key} as="textarea" rows={3} defaultValue={value.description && value.description.length > 0 ? value.description : ""} onInput={(event) => { ValidationOnChange(event); }} />
                                                            </Col>
                                                        </Row>
                                                        <div className="mainDocumentDiv" style={{ marginTop: "12px", alignItems: "center" }}>
                                                            <div className="documentDiv">
                                                                <Form.Label className="BoldTextHeading" style={{ marginRight: "2%" }}>Proof of Achievement</Form.Label>
                                                                <Button onClick={() => { uploadFiles(3, value.key, index); }} style={{ border: "none", outline: "none", background: "#050558", fontWeight: "500", paddingLeft: "20px", paddingRight: "20px", marginTop: "0.5%" }} >Upload Documents</Button>
                                                            </div>
                                                            {value.proof_link && value.proof_link.length > 1 ?
                                                                <div className="documentIconsDiv" style={{ display: "flex", justifyContent: "flex-start" }}>
                                                                    <OverlayTrigger
                                                                        placement={"top"}
                                                                        overlay={<Tooltip>View uploaded document</Tooltip>}>
                                                                        <a href={value.proof_link} rel="noreferrer" target="_blank"><BsEye className="eyeIcon" /></a>
                                                                    </OverlayTrigger>

                                                                    <OverlayTrigger
                                                                        placement={"top"}
                                                                        overlay={<Tooltip>Delete uploaded document</Tooltip>}
                                                                    >
                                                                        <label style={{ color: "red", cursor: "pointer" }} onClick={() => { deleteUploadedDoc(3, value.key, index); }}>
                                                                            <AiFillDelete style={{ fontSize: "28px", marginRight: "12px", marginLeft: "10px" }} />
                                                                        </label>
                                                                    </OverlayTrigger>
                                                                </div>
                                                                : null}
                                                        </div>
                                                        {index !== 0 ?
                                                            <OverlayTrigger
                                                                placement={"top"}
                                                                overlay={<Tooltip>Delete this Achivement</Tooltip>}
                                                            >
                                                                <div className="deleteButton">
                                                                    <Button variant="danger" style={{ fontWeight: "500", marginTop: "1.5%", backgroundColor: "#7f0a15", borderColor: "#7f0a15" }} onClick={() => { DeleteDetails(2, index); }}>
                                                                        Delete
                                                                    </Button>
                                                                </div>
                                                            </OverlayTrigger> : null}
                                                    </Form.Group>
                                                </div>
                                            );
                                        })
                                    }
                                    <br />
                                    <div onClick={() => { AddDetails(2); }} style={{ display: 'flex', alignItems: "center", color: " #2323a4", cursor: "pointer" }}>
                                        <GrAddCircle style={{ fontSize: "25px" }} /><span style={{ marginLeft: "5px", fontSize: "15px", fontFamily: "monospace" }}>Add More Achivements</span>
                                    </div>
                                </div>
                                <br /><br />




                                <div className="mainBox" id="research" ref={paperDiv}>
                                    {/*PUBLICATION*/}
                                    <h4 className="headings">Mention your publications (National/International Journal /Conference, Book Chapters).</h4>
                                    <label className="subHeadings">Please enter the details of any research paper that you have published</label>
                                    <hr />
                                    {
                                        researchPapers.map((value, index) => {
                                            return (
                                                <div className="mainContainer" style={{ marginTop: "3%" }} key={value.key}>
                                                    {researchPapers.length > 1 ? <div> <h4 className="headings">Paper {index + 1} </h4> <hr /> </div> : null}
                                                    <Form.Group className="mb-3" >
                                                        <Row>
                                                            <Col sm={4} md={5} lg={4}>
                                                                <Form.Label className="BoldTextHeading">Title </Form.Label>
                                                            </Col>
                                                            <Col sm={6} md={6} lg={5} >
                                                                <Form.Control className="customInputField" name="TitleOfPaper" id={"TitleOfPaper," + value.key} defaultValue={value.title && value.title.length > 0 ? value.title : ""} type="text" rows={5} onInput={(event) => { ValidationOnChange(event); }} />
                                                            </Col>
                                                        </Row>
                                                        <br />
                                                        <Row>
                                                            <Col sm={4} md={5} lg={4}>
                                                                <Form.Label className="BoldTextHeading">Publication</Form.Label>
                                                            </Col>
                                                            <Col sm={6} md={6} lg={5} >
                                                                <Form.Control className="customInputField" name="Publication" id={"Publication," + value.key} defaultValue={value.publication && value.publication.length > 0 ? value.publication : ""} type="text" rows={5} onInput={(event) => { ValidationOnChange(event); }} />
                                                            </Col>
                                                        </Row>
                                                        <br />
                                                        <Row>
                                                            <Col sm={4} md={5} lg={4}>
                                                                <Form.Label className="BoldTextHeading">Authors(If multiple please sperate them with commas)</Form.Label>
                                                            </Col>
                                                            <Col sm={6} md={6} lg={5} >
                                                                <Form.Control className="customInputField" name="Authors" id={"Authors," + value.key} type="text" defaultValue={value.author && value.author.length > 0 ? value.author : ""} rows={5} onInput={(event) => { ValidationOnChange(event); }} />
                                                            </Col>
                                                        </Row>
                                                        <br />
                                                        <Row>
                                                            <Col sm={4} md={5} lg={4}>
                                                                <Form.Label className="BoldTextHeading">Year</Form.Label>
                                                            </Col>
                                                            <Col sm={6} md={6} lg={5} >
                                                                <Form.Control className="customInputField" name="Year" id={"Year," + value.key} type="number" rows={5} defaultValue={value.year && value.year.length > 0 ? value.year : ""} onInput={(event) => { ValidationOnChange(event); }} />
                                                            </Col>
                                                        </Row>
                                                        <br />
                                                        <Row>
                                                            <Col sm={4} md={5} lg={4}>
                                                                <Form.Label className="BoldTextHeading">Conference or Journal Name</Form.Label>
                                                            </Col>
                                                            <Col sm={6} md={6} lg={5} >
                                                                <Form.Control className="customInputField" name="Conference" id={"Conference," + value.key} type="text" rows={5} defaultValue={value.conference && value.conference.length > 0 ? value.conference : ""} onInput={(event) => { ValidationOnChange(event); }} />
                                                            </Col>
                                                        </Row>
                                                        {index !== 0 ?
                                                            <OverlayTrigger
                                                                placement={"top"}
                                                                overlay={<Tooltip>Delete this Publication</Tooltip>}
                                                            >
                                                                <div className="deleteButton">
                                                                    <Button variant="danger" style={{ fontWeight: "500", marginTop: "2rem", backgroundColor: "#7f0a15", borderColor: "#7f0a15" }} onClick={() => { DeleteDetails(3, index); }}>
                                                                        Delete
                                                                    </Button>
                                                                </div>
                                                            </OverlayTrigger>
                                                            : null}
                                                    </Form.Group>
                                                </div>
                                            );
                                        })
                                    }
                                    <br />
                                    <div onClick={() => { AddDetails(3); }} style={{ display: 'flex', alignItems: "center", color: " #2323a4", cursor: "pointer" }}>
                                        <GrAddCircle style={{ fontSize: "25px" }} /><span style={{ marginLeft: "5px", fontSize: "15px", fontFamily: "monospace" }}>Add More Publications</span>
                                    </div>
                                </div>
                                <br />
                                <br />



                                <div className="mainBox" id="projects" ref={projectDiv} >
                                    {/*PROJECT SECTION*/}
                                    <h4 className="headings">Mention your Projects.</h4>
                                    <label className="subHeadings">Please add your project details.</label>
                                    <hr />
                                    {
                                        projects.map((value, index) => {
                                            return (
                                                <div className="mainContainer" style={{ marginTop: "3%" }} key={value.key}>
                                                    {projects.length > 1 ? <div> <h4 className="headings">Project {index + 1} </h4> <hr /></div> : null}
                                                    <Form.Group className="mb-3" >
                                                        <Row>
                                                            <Col sm={4} md={5} lg={4}>
                                                                <Form.Label className="BoldTextHeading" >Title </Form.Label>
                                                            </Col>
                                                            <Col sm={6} md={6} lg={5} >
                                                                <Form.Control className="customInputField" name="TitleOfProject" id={"TitleOfProject," + value.key} type="text" rows={5} defaultValue={value.title && value.title.length > 0 ? value.title : ""} onInput={(event) => { ValidationOnChange(event); }} />
                                                            </Col>
                                                        </Row>
                                                        <br />
                                                        <Row>
                                                            <Col sm={4} md={5} lg={4}>
                                                                <Form.Label className="BoldTextHeading">Description</Form.Label>
                                                            </Col>
                                                            <Col sm={6} md={6} lg={5} >
                                                                <Form.Control className="customInputField" name="ProjectDescription" id={"ProjectDescription," + value.key} as="textarea" rows={5} defaultValue={value.description && value.description.length > 0 ? value.description : ""} onInput={(event) => { ValidationOnChange(event); }} />
                                                            </Col>
                                                        </Row>
                                                        <br />
                                                        <Row>
                                                            <Col sm={4} md={5} lg={4}>
                                                                <Form.Label className="BoldTextHeading">Project Link(Github or Kaggle or any other link)</Form.Label>
                                                            </Col>
                                                            <Col sm={6} md={6} lg={5} >
                                                                <Form.Control className="customInputField" name="ProjectLink" id={"project_link," + value.key} type="text" rows={5} defaultValue={value.project_link && value.project_link.length > 0 ? value.project_link : ""} onInput={(event) => { ValidationOnChange(event); }} />
                                                            </Col>
                                                        </Row>

                                                        {index !== 0 ?
                                                            <OverlayTrigger
                                                                placement={"top"}
                                                                overlay={<Tooltip>Delete this Project</Tooltip>}
                                                            >
                                                                <div className="deleteButton">
                                                                    <Button variant="danger" style={{ fontWeight: "500", marginTop: "2rem", backgroundColor: "#7f0a15", borderColor: "#7f0a15" }} onClick={() => { DeleteDetails(4, index); }}>
                                                                        Delete
                                                                    </Button>
                                                                </div>
                                                            </OverlayTrigger>
                                                            : null}
                                                    </Form.Group>
                                                </div>
                                            );
                                        })
                                    }
                                    <br />
                                    <div onClick={() => { AddDetails(4); }} style={{ display: 'flex', alignItems: "center", color: " #2323a4", cursor: "pointer" }}>
                                        <GrAddCircle style={{ fontSize: "25px" }} /><span style={{ marginLeft: "5px", fontSize: "15px", fontFamily: "monospace" }}>Add More</span>
                                    </div>
                                </div>
                                <br />
                                <br />



                                <div className="mainBox" id="score" ref={scoreDiv}>
                                    {/*SCORE SECTION*/}
                                    <h4 className="headings">Competitive Exams</h4>
                                    <label className="subHeadings">Add details of the exams you have given</label>
                                    <hr />
                                    <Form.Group as={Row} className="mb-3"  >
                                        <Col sm={4} md={5} lg={4}>
                                            <Form.Label className="BoldTextHeading" >GRE Marks </Form.Label>
                                        </Col>
                                        <Col sm={6} md={6} lg={5} >
                                            <Form.Control className="customInputField" name="Gre" type="number" rows={5} value={gre} onInput={(event) => { ValidationOnChange(event); }} isInvalid={invalidGre} />
                                            {invalidGre ? <h5 className="invalidWarning">Invalid value entered</h5> : null}
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3"  >
                                        <Col sm={4} md={5} lg={4}>
                                            <Form.Label className="BoldTextHeading" >Ielts Marks </Form.Label>
                                        </Col>
                                        <Col sm={6} md={6} lg={5} >
                                            <Form.Control className="customInputField" name="Ielts" type="number" rows={5} value={ielts} onInput={(event) => { ValidationOnChange(event); }} isInvalid={invalidIelts} />
                                            {invalidIelts ? <h5 className="invalidWarning">Invalid value entered</h5> : null}
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3"  >
                                        <Col sm={4} md={5} lg={4}>
                                            <Form.Label className="BoldTextHeading" >Tofel Marks </Form.Label>
                                        </Col>
                                        <Col sm={6} md={6} lg={5} >
                                            <Form.Control className="customInputField" name="Tofel" type="number" rows={5} value={tofel} onInput={(event) => { ValidationOnChange(event); }} isInvalid={invalidTofel} />
                                            {invalidTofel ? <h5 className="invalidWarning">Invalid value entered</h5> : null}
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3"  >
                                        <Col sm={4} md={5} lg={4}>
                                            <Form.Label className="BoldTextHeading" >GMAT Marks </Form.Label>
                                        </Col>
                                        <Col sm={6} md={6} lg={5} >
                                            <Form.Control className="customInputField" name="Gmat" type="number" rows={5} value={gmat} onInput={(event) => { ValidationOnChange(event); }} isInvalid={invalidGmat} />
                                            {invalidGmat ? <h5 className="invalidWarning">Invalid value entered</h5> : null}
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3"  >
                                        <Col sm={4} md={5} lg={4}>
                                            <Form.Label className="BoldTextHeading" >CAT Marks </Form.Label>
                                        </Col>
                                        <Col sm={6} md={6} lg={5} >
                                            <Form.Control className="customInputField" name="Cat" type="number" rows={5} value={cat} onInput={(event) => { ValidationOnChange(event); }} isInvalid={invalidCat} />
                                            {invalidCat ? <h5 className="invalidWarning">Invalid value entered</h5> : null}
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3"  >
                                        <Col sm={4} md={5} lg={4}>
                                            <Form.Label className="BoldTextHeading" >GATE Marks </Form.Label>
                                        </Col>
                                        <Col sm={6} md={6} lg={5} >
                                            <Form.Control className="customInputField" name="Gate" type="number" rows={5} value={gate} onInput={(event) => { ValidationOnChange(event); }} isInvalid={invalidGate} />
                                            {invalidGate ? <h5 className="invalidWarning">Invalid value entered</h5> : null}
                                        </Col>
                                    </Form.Group>
                                </div>
                                <br /><br />




                                <div className="mainBox" style={{ marginTop: "3%" }} id="resume" ref={resumeDiv}>
                                    {/*RESUME SECTION*/}
                                    <div className="mainDocumentDiv" style={{ alignItems: 'center', marginTop: "13px" }}>
                                        <div className="documentDiv" style={{ display: "flex", justifyContent: 'flex-start', alignItems: 'center' }}>
                                            <h4 className="headings">Upload Resume</h4>
                                            <Button style={{ border: "none", outline: "none", background: "#050558", fontWeight: "500", paddingLeft: "20px", paddingRight: "20px", marginLeft: "2%", marginTop: "0.5%" }} onClick={() => { uploadFiles(4, "resume", null); }}>Upload </Button>

                                        </div>
                                        {resume && resume.length > 1 ?

                                            <div style={{ display: "flex", justifyContent: "flex-start", marginTop: "5px" }}>
                                                <OverlayTrigger
                                                    placement={"top"}
                                                    overlay={<Tooltip>View uploaded resume</Tooltip>}>

                                                    <a href={resume} rel="noreferrer" target="_blank"><BsEye style={{ fontSize: "28px", marginRight: "8px" }} /></a>
                                                </OverlayTrigger>

                                                <OverlayTrigger
                                                    placement={"top"}
                                                    overlay={<Tooltip>Delete uploaded resume</Tooltip>}
                                                >
                                                    <label style={{ color: "red", cursor: "pointer" }} onClick={() => { deleteUploadedDoc(4, null, null); }}>
                                                        <AiFillDelete style={{ fontSize: "28px", marginRight: "12px", marginLeft: "10px" }} />
                                                    </label>
                                                </OverlayTrigger>
                                            </div>
                                            : null}
                                    </div>
                                </div>
                                <br /><br />


                                <div className="mainBox" style={{ marginTop: "3%" }} id="future" ref={futureDiv}>
                                    {/*FUTURE SECTION*/}

                                    <h4 className="headings">Future contributions </h4>
                                    <label className="subHeadings">Please mention your  contribution (if any) </label>
                                    <hr />

                                    <Form.Group as={Row} className="mb-3" >
                                        <Col sm={4} md={5} lg={4}>
                                            <Form.Label className="BoldTextHeading">In future, how will you contribute towards the department?</Form.Label>
                                        </Col>
                                        <Col sm={6} md={6} lg={5} >
                                            <Form.Control name="FutureContribution" className="customInputField" as="textarea" value={futureContribution} onInput={(event) => { ValidationOnChange(event); }} />
                                        </Col>
                                    </Form.Group>
                                </div>
                                <br /><br />
                                <br />


                                <div style={{ display: "flex", justifyContent: "center" }}>
                                    <Button variant="success" style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", border: "none", outline: "none", background: "#050558", fontWeight: "500", paddingLeft: "30px", paddingRight: "30px", margin: "auto", fontSize: "25px" }} onClick={() => { SubmitDetails(); }} >
                                        Submit
                                    </Button>
                                </div>
                                <br />
                                <br />
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>

    );

}
export default Forms;