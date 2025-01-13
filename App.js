import React, { useState, createContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./components/nav"; // Nav component in the components folder
import Register from "./components/register"; // Register component in the components folder
import Login from "./components/login"; // Login component in the components folder
import Home from "./components-1/home"; // Home component in the components-1 folder
import Profile from "./components-1/profile"; // Profile component in the components-1 folder
import ShowBuses from "./components-1/showbuses"; // ShowBuses component in the components-1 folder
import Book from "./components-1/book"; // Import the Book component
import Busdetails from "./components-1/busdetails"; // Import the Busdetails component


// Create context to store the token and data
export const store = createContext();
export const store1 = createContext();

const App = () => {
  const [token, setToken] = useState(null); // Store token state
  const [data, setData] = useState(null); // Store data state

  return (
    <store.Provider value={[token, setToken]}>
      <store1.Provider value={[data, setData]}>
        <div>
          <BrowserRouter>
            <Nav /> {/* Navigation bar component */}
            <Routes>
              {/* Routes for different pages */}
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/showbuses" element={<ShowBuses />} />
              <Route path="/book" element={<Book />} /> {/* Book route */}
              <Route path="/busdetails" element={<Busdetails />} />
            </Routes>
          </BrowserRouter>
        </div>
      </store1.Provider>
    </store.Provider>
  );
};

export default App;
