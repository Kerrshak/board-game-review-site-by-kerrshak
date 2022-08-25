import './App.css';
import React from "react"
import {BrowserRouter, Link, Route, Routes} from "react-router-dom"
import { useState } from 'react';
import { UserContext } from './contexts/User';
import Reviews from './components/Reviews';
import SingleReview from './components/SingleReview';
import UserLogin from './components/UserLogin';

function App() {
  const [currentUser, setCurrentUser] = useState("tickle122")

  return (
    <BrowserRouter>
      <div className="App">
        
        <header className="App-header">
          Welcome {currentUser}
        </header>
      
        <nav>
          <div id='nav-buttons'>
            <Link to="/users">User login</Link>
            <Link to="/reviews">Reviews</Link>
          </div>
        </nav>

        <UserContext.Provider value={{currentUser, setCurrentUser}}>
          <Routes>
            <Route path="/users" element={<UserLogin />}/>
            <Route path="/reviews" element={<Reviews />}/>
            <Route path="/reviews/category/:category" element={<Reviews />}/>
            <Route path="/reviews/:reviewID" element={<SingleReview />}/>
          </Routes>
        </UserContext.Provider>

      </div>
    </BrowserRouter>
  );
}

export default App;
