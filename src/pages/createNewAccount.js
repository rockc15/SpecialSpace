import React from 'react';
import '../css/login.css'
import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import config from '../firebase-config';





export default class createNewAccount extends React.Component {
    constructor(props) {
        super(props);
        this.app = initializeApp(config)
        this.auth = getAuth();
        this.state = {
            email: '',
            password: '',
        };

        this.createAccout = this.createAccout.bind(this)
    }


    createAccout = async (event) => {
        try {
            event.preventDefault();
            createUserWithEmailAndPassword(this.auth, this.state.email, this.state.password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log(user)
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorMessage)
                });
            return false
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
                            <h1 className="display-2">Create New Account</h1>
                            <div className="card light">
                                <div className="card-body ">
                                    <Form onSubmit={this.createAccout}>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Email address</Form.Label>
                                            <Form.Control type="email" placeholder="Enter email" onChange={(e) => this.state.email = e.target.value} />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control type="password" placeholder="Password" onChange={(e) => this.state.password = e.target.value} />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicID">
                                            <Form.Label>Group ID</Form.Label>
                                            <Form.Control type="text" placeholder="Groud ID" />
                                        </Form.Group>
                                        <input type='submit' id='submit-btn' className='btn btn-dark w-50 mt-2' value='Create Account' />
                                    </Form>
                                    <a className='btn btn-outline-primary m-2 w-50' href="/">back to login</a>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }

}