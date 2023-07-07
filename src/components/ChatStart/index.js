import React, { useState, useEffect, useRef } from 'react';
import {useParams} from 'react-router-dom';
import { getAllUsersData, getUserData, chatData } from '../../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebase";
import './style.css'



const Chat = () => {
  const [user, setUser] = useState()
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user.uid)
        console.log("user...", user)
      } else {
      }
    });
  }, []);
  const {id} = useParams()
  console.log(id)
  const [getUser, setGetUser] = useState([]);
  const getUserData = async () => {
    const res = await getAllUsersData();
    setGetUser(res.data);

  }
  useEffect(() => {
    getUserData()
  }, [])
  console.log("alu",getUser)
  const filterUser = getUser.filter(item => {
    if (item.uid == id) {
      return item
    }
  }); 
  
  const [ message, setMessage] = useState("")
  const send = async () => {
    // Handle sending the message
    console.log('Message sent:', message);
    setMessage('');
    const chatDataRes = await chatData(message,id,user)
  };
  // kkk
  const [chatMessages, setChatMessages] = useState([]);
useEffect(() => {
    const chatCollectionRef = collection(db, "AllChatData");
    const chatQuery = query(chatCollectionRef);
  
    const unsubscribe = onSnapshot(chatQuery, (snapshot) => {
      const messages = snapshot.docs.map((doc) => doc.data());
      setChatMessages(messages);
    });
  
    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);
  const filterChats = chatMessages
  .filter((chat) => {
    const isCurrentUser = chat.id === user;
    const isChatPerson =
      (chat.id === user && chat.personId === id) ||
      (chat.id === id && chat.personId === user);

    return isChatPerson;
  })
  .sort((a, b) => {
    if (a.timestamp && b.timestamp) {
      return a.timestamp.toDate() - b.timestamp.toDate();
    }
    return 0;
  });
  console.log(filterChats)
  return (
    <>
    <div className='mainContainer'>
      <div className='scndDiv'>
        {
          filterUser.map((i) => {
            return(
              <>
              <div className='chat'>   
              <img  src={i.url}/>
              <h3 >{i.name}</h3>
              </div>
              </>
            )
          })
        }
         <>
      <p className='messages'>
        {filterChats.map((i) => {
          return(<>
          {/* <p >{i.message}</p> */}
          <p className={`chat-message ${i.id==user ? 'msg1' : 'mymsgs'}`}>{i.message} </p>

          </>)
        })}
      </p>
      <div className='chatFooter'>
      <input
        onChange={(e) => setMessage(e.target.value)}
        type='text' placeholder='enter new chat...' />
        <button onClick={send}>Send</button>
        </div>
      </>
      </div>
     
    </div>
    </>
  );
};

export default Chat;