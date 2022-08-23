import './App.css';
import React from "react"
import {BrowserRouter, Link, Route, Routes} from "react-router-dom"
import { useState } from 'react';
import { UserContext } from './contexts/User';
import Reviews from './components/Reviews';

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
            <Link to="/reviews">Reviews</Link>
          </div>
        </nav>

        <UserContext.Provider value={{currentUser, setCurrentUser}}>
          <Routes>
            <Route path="/reviews" element={<Reviews />}/>
            <Route path="/reviews/category/:category" element={<Reviews />}/>
          </Routes>
        </UserContext.Provider>

      </div>
    </BrowserRouter>
  );
}

export default App;
