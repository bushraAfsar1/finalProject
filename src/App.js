import { useState , useEffect, useContext} from 'react';
import './App.css';
import Login from './components/Login';
import Dashboard from './components/dashboard';
import Signup from './components/Signup';
import CreateChat from './components/CreateChat';
import ChatStart from './components/ChatStart';
import { auth } from './config/firebase'
import {BrowserRouter as Router, Routes , Route} from 'react-router-dom';

function App() {

   return (
    <>
      
      <div className="App">
        {/* <div>{currentUser.displayName}</div> */}

          <Router>
            <Routes>
              <Route path='/' element={<Signup />}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/dashboard' element={<Dashboard />}/>
              <Route path='/dashboard/chatss' element={<CreateChat/>}/>
              <Route path='/msgs/:id' element={<ChatStart/>}/>
            </Routes>
          </Router>
     
          
      </div>
    </>
  );
}

export default App;
