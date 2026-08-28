import React from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import { Routes, Route } from 'react-router-dom';
import NewListing from "./components/NewListing";
import SignUp from "./components/SignUp";
import ListingSingle from "./components/ListingSingle";
import EditListing from "./components/EditListing";
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <div className="app-container">
      <Header />
      <Toaster 
        position="top-center" 
        toastOptions={{
          style: {
            fontFamily: 'var(--font-family)',
            borderRadius: '10px',
            background: '#0f172a',
            color: '#ffffff',
            fontSize: '0.9rem'
          }
        }} 
      />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:listingId" element={<ListingSingle />} />
          <Route path="/edit/:listingId" element={<EditListing />} />
          <Route path="/addlisting" element={<NewListing />} />
          <Route path="/login" element={<SignUp isloggedIn={true} />} />
          <Route path="/signup" element={<SignUp isloggedIn={false} />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
