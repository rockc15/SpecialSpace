import React, { useState } from 'react';
import config from '../firebase-config';
import { initializeApp } from 'firebase/app';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { getFirestore, onSnapshot, query, doc } from "firebase/firestore"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import groupIcon from '../assets/groupIcon.jpg'
import addGroup from '../assets/addGroupIcon.png'

import '../css/user.css'

export default class User extends React.Component {
    constructor(props) {
        super(props);
        this.app = initializeApp(config)
        this.auth = getAuth();
        this.db = getFirestore();
        this.state = {
            first_name: "",
            last_name: "",
            groups: [],

        };
        this.userId = ""
    }

    componentDidMount() {
        onAuthStateChanged(this.auth, (user) => {
            if (user) {
                this.userId = user.uid
                this.updateUserInfo()
                console.log(this.userId)
            }
        })
    }

    updateUserInfo = () => {
        try {
            const q = query(doc(this.db, "users", this.userId));
            onSnapshot(doc(this.db, "users", this.userId), (doc) => {

                this.setState({
                    first_name: doc.data().first_name,
                    last_name: doc.data().last_name,
                    groups: doc.data().groups

                })
                console.log(doc.data())
            });
        } catch (error) {
            console.log(error)
        }
    }


    render() {
        const listGroups = Object.values(this.state.groups).map(group => {
            let groupLink = "/chatroom/" + group
            return (
                <Col id={"Col-" + group} >
                    <Card className="groupCard" onClick={() => {
                        window.location = groupLink
                    }} id={group} style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={groupIcon} />
                        <Card.Body>
                            <Card.Title>{group}</Card.Title>
                            {/* <Button variant="primary" href={groupLink}>Chat</Button> */}
                        </Card.Body>
                    </Card >
                </Col >

            )
        })
        return (
            <Container className=" h-100">
                <h1>{"Hello " + this.state.first_name + " " + this.state.last_name}</h1>
                <Container style={{ padding: '3%' }}>
                    <Row>
                        {listGroups}
                        <Col>
                            <Card className="groupCard" id="CreateGroup" onClick={() => {
                                window.location = "/createNewGroup"
                            }} style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={addGroup} />
                                <Card.Body>
                                    <Card.Title>Add Group</Card.Title>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </Container>
        )
    }

}