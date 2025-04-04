import React from 'react';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-container">

                {/* Left Section - Logo and Tagline */}
                <div className="footer-brand">
                    <h2>🎮 GameVerse</h2>
                    <p>Your trusted hub for everything gaming.</p>
                </div>

                {/* Middle Section - Navigation Links */}
                <div className="footer-links">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/">Browse Games</a></li>
                        <li><a href="/library">Bookmarks</a></li>
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                </div>

                {/* Right Section - Contact Info & Social Icons */}
                <div className="footer-social">
                    <h4>Connect</h4>
                    <p>Email: support@gameverse.com</p>
                    <div className="social-icons">
                        <a href="#"><i className="fab fa-twitter" aria-hidden="true"></i></a>
                        <a href="#"><i className="fab fa-discord" aria-hidden="true"></i></a>
                        <a href="#"><i className="fab fa-github" aria-hidden="true"></i></a>
                    </div>
                </div>
            </div>

            {/* Bottom Text */}
            <div className="footer-bottom">
                <p>© {currentYear} GameVerse. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
