import React from 'react';
import config from '../firebase-config';
import { getFirestore, collection, onSnapshot, query, doc, where } from "firebase/firestore";
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default class Posts extends React.Component {
    constructor(props) {
        super(props);
        this.groupName = props.group
        this.app = initializeApp(config)
        this.db = getFirestore();
        this.auth = getAuth();
        this.state = { posts: [] };
    }

    componentDidMount = () => {
        onAuthStateChanged(this.auth, (user) => {
            if (user) {
                this.updatesPost()

            }
        })

    }

    updatesPost = (groupName) => {
        try {
            const q = query(collection(this.db, "groups", this.groupName, "posts"));

            onSnapshot(q, (snapshot) => {
                let snap_post = []
                snapshot.forEach((doc) => {
                    snap_post.push(doc.data().text)
                })
                this.setState({
                    posts: snap_post
                })
            });

        } catch (error) {
            console.log(error)
        }
    }

    render() {
        const requestsPosts = Object.values(this.state.posts).map(post => {
            return (
                <li>
                    {post}
                </li>
            )
        })
        return (
            <div className="messages">
                {requestsPosts}
            </div>
        )
    }

}