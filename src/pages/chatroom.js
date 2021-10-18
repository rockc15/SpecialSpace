import React from 'react';
import Chats from '../components/chats';
import Posts from '../components/posts'
import { initializeApp } from 'firebase/app';
import config from '../firebase-config';
import '../css/Chatroom.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { getFirestore, onSnapshot, query, doc, collection } from "firebase/firestore"
import { getAuth, onAuthStateChanged } from "firebase/auth";


export default class Chatroom extends React.Component {
    constructor(props) {
        super(props)
        this.app = initializeApp(config)
        this.auth = getAuth();
        this.db = getFirestore();
        this.state = {
            group_name: "",
            users: [],
            admins: []
        };
        this.userRole = ''
        this.groupName = window.location.pathname.replace('/chatroom/', '')
    }

    componentDidMount() {
        onAuthStateChanged(this.auth, (user) => {
            if (user) {
                this.getGroupInfo(this.groupName, user.uid)

            }
        })
        console.log(this.state)
    }



    getGroupInfo = (groupName, userID) => {
        try {
            onSnapshot(doc(this.db, "groups", groupName), (doc) => {
                console.log(doc.data())
                this.setState({
                    group_name: doc.data().name,
                    admins: doc.data().admins,
                    members: doc.data().members
                })


            });

            if (this.state.admins.includes(userID)) {
                console.log("Admin" + userID)
                this.userRole = 'admin'
            } else {
                console.log("Member" + userID)
                this.userRole = 'user'
            }
        } catch (error) {
            console.log("error" + error)
        }
    }





    render() {
        if (this.userRole == "user" || this.userRole == "admin") {
            return (
                <div id="page" >
                    <Navbar bg="light" expand="lg">
                        <Container>
                            <Navbar.Brand href="#Chatroom">Special Space</Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <Nav.Link href="/home">Home</Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                    <h1> {this.state.group_name}</h1>
                    <Container className="container-fluid h-100">
                        <Posts group={this.groupName} />
                        <Chats group={this.groupName} />
                    </Container>
                </div>

            )
        } else {
            return ("Loading Page")
        }

    }

}