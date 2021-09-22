import React from 'react';
import config from '../firebase-config';
import { getFirestore, collection, onSnapshot, query } from "firebase/firestore"; 
import { initializeApp } from 'firebase/app';

export default class Posts extends React.Component {
    constructor(props) {
        super(props);
        this.app = initializeApp(config)
        this.db = getFirestore();
        this.state = { posts: [] };
    }

    componentDidMount = () => {
        this.updatesPost()
      }
    
    updatesPost = () =>{
        try{
            const q = query(collection(this.db, "posts"));
            onSnapshot(q, (querySnapshot) => {
              const queryPosts = [];
              querySnapshot.forEach((doc) => {
                queryPosts.push(doc.data())
              }); 
              this.setState({ posts: queryPosts  })
            });
        }catch(error){
            console.log(error)
        } 
    }

    render(){
        const requestsPosts = Object.values(this.state.posts).map(post => {
            return (
              <li>
                  {post.text}
              </li>
            )
        })
        return(
            <div className="messages">
                {requestsPosts}
            </div>
        ) 
    }

}