import React from 'react';
import '../css/login.css'
import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { initializeApp } from 'firebase/app';

import config from '../firebase-config';
import { getFirestore, doc, setDoc, updateDoc, arrayUnion } from "firebase/firestore"
import { getAuth, onAuthStateChanged } from "firebase/auth";





export default class createNewGroup extends React.Component {
    constructor(props) {
        super(props);
        this.app = initializeApp(config)
        this.auth = getAuth();
        this.db = getFirestore();
        this.auth = getAuth();
        this.userId = ""
        this.state = {
            groupName: '',
            groupID: '',
        };

        this.createGroup = this.createGroup.bind(this)
    }

    componentDidMount = () => {
        onAuthStateChanged(this.auth, (user) => {
            if (user) {
                this.userId = user.uid
            }
        })

    }


    createGroup = async (event) => {
        try {
            event.preventDefault();
            await setDoc(doc(this.db, "groups", this.state.groupName), {
                name: this.state.groupName,
                groupId: this.state.groupID,
                admins: [this.userId],
                members: []
            });

            await updateDoc(doc(this.db, "users", this.userId), {
                groups: arrayUnion(this.state.groupName),
            });

        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }


    render() {
        return (
            <div id="page">
                <Container className="container-fluid h-100">
                    <Row className="row justify-content-center align-content-center h-100">
                        <Col className="col-5">
                            <h1 className="display-4">Create Group</h1>
                            <div className="card light">
                                <div className="card-body ">
                                    <Form onSubmit={this.createGroup}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Group Name</Form.Label>
                                            <Form.Control type="text" placeholder="Enter Group Name" onChange={(e) => this.state.groupName = e.target.value} />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicID">
                                            <Form.Label>Group ID</Form.Label>
                                            <Form.Control type="text" placeholder="Groud ID" onChange={(e) => this.state.groupID = e.target.value} />
                                        </Form.Group>
                                        <input type='submit' id='submit-btn' className='btn btn-dark w-50 mt-2' value='Create Group' />
                                    </Form>
                                    <a className='btn btn-outline-primary m-2 w-50' href="/home">home</a>
                                </div>
                            </div>
                        </Col>
                        <Col className="col-5">
                            <h1 className="display-4">Join Group</h1>
                            <div className="card light">
                                <div className="card-body ">
                                    <Form onSubmit={this.createAccout}>
                                        <Form.Group className="mb-3" controlId="formBasicID">
                                            <Form.Label>Group ID</Form.Label>
                                            <Form.Control type="text" placeholder="Groud ID" />
                                        </Form.Group>
                                        <input type='submit' id='submit-btn' className='btn btn-dark w-50 mt-2' value='Join' />
                                    </Form>
                                    <a className='btn btn-outline-primary m-2 w-50' href="/home">home</a>
                                </div>
                            </div>
                        </Col>
                    </Row>


                </Container>
            </div>
        )
    }

}