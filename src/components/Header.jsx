import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Navbar,
  Container,
  Nav,
  Button
} from "react-bootstrap";
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton
} from "@clerk/clerk-react";
import { FaGamepad, FaBookmark } from "react-icons/fa";
import SearchBar from "./SearchBarLayout";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="header">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <FaGamepad size={24} className="logo-icon" /> GameVerse
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar-nav" />

        <Navbar.Collapse id="main-navbar-nav">
          <SearchBar className="mx-auto search-container" />

          <Nav className="ms-auto d-flex align-items-center">
            <Nav.Link as={Link} to="/library" className="library-link">
              <FaBookmark className="me-1" />
              Library
            </Nav.Link>

            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>

            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="outline-light">Sign In</Button>
              </SignInButton>
            </SignedOut>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
