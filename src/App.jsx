import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react'
import Header from './components/Header'
import Footer from './components/Footer' 
import HomePage from './pages/HomePage'
import GameDetailPage from './pages/GameDetail'
import LibraryPage from './pages/LibraryPage'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/game/:id" element={<GameDetailPage />} />
            <Route
              path="/library"
              element={
                <>
                  <SignedIn>
                    <LibraryPage />
                  </SignedIn>
                  <SignedOut>
                    <RedirectToSignIn />
                  </SignedOut>
                </>
              }
            />
          </Routes>
        </main>
        <Footer /> 
      </div>
    </Router>
  )
}

export default App;
 