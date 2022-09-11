import './App.css';
import React from "react"
import {BrowserRouter, Link, Route, Routes} from "react-router-dom"
import { useState } from 'react';
import { UserContext } from './contexts/User';
import Reviews from './components/Reviews';
import SingleReview from './components/SingleReview';
import UserLogin from './components/UserLogin';
import InvalidEndpoint from './components/InvalidEndpoint';

function App() {
  const [currentUser, setCurrentUser] = useState("")

  document.title = "Boardgame reviews"

  return (
    <BrowserRouter>
      <div className="App">
        
        <header className="App-header">
          Welcome {currentUser}
        </header>
      
        <nav>
          <div id='nav-bar'>
            <Link to="/users" className='nav-buttons'>User login</Link>
            <Link to="/reviews" className='nav-buttons'>Reviews</Link>
          </div>
        </nav>

        <UserContext.Provider value={{currentUser, setCurrentUser}}>
          <Routes>
            <Route path="/users" element={<UserLogin />}/>
            <Route path="/reviews" element={<Reviews />}/>
            <Route path="/reviews/category" element={<InvalidEndpoint />} />
            <Route path="/reviews/category/:category" element={<Reviews />}/>
            <Route path="/reviews/:reviewID" element={<SingleReview />}/>
            <Route path="/:invalid" element={<InvalidEndpoint />} />
            <Route path="/users/:invalid" element={<InvalidEndpoint />} />
          </Routes>
        </UserContext.Provider>

        <p id='bottom-text'>This is a website made by Jack Kerr. For enquiries please email jack723@hotmail.co.uk</p>

      </div>
    </BrowserRouter>
  );
}

export default App;
