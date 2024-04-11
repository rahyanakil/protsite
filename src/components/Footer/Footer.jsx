import React from "react";
import "./Footer.css";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container container">
        <h1 className="footer__title waviy">
          <span>R</span>
          <span>a</span>
          <span>h</span>
          <span>y</span>
          <span>a</span>
          <span>n</span>
        </h1>

        <ul className="footer__list animate-link">
          <li>
            <a href="#about" className="footer__link">
              About
            </a>
          </li>
          <li>
            <a href="#projects" className="footer__link">
              Projects
            </a>
          </li>
          <li>
            <a href="#contact" className="footer__link">
              Contact
            </a>
          </li>
        </ul>

        <div className="footer__social">
          <a
            href="https://www.facebook.com/rahyan.shamsiakil.1"
            className="footer__social-link"
            target="_blank"
            rel="noreferrer"
          >
            <i className="bx bxl-facebook"></i>
          </a>
          <a
            href="https://www.facebook.com/rahyan.shamsiakil.1"
            className="footer__social-link"
            target="_blank"
            rel="noreferrer"
          >
            <i className="bx bxl-instagram"></i>
          </a>
          <a
            href="https://twitter.com/Rahyan_Akil4"
            className="footer__social-link"
            target="_blank"
            rel="noreferrer"
          >
            <i className="bx bxl-twitter"></i>
          </a>
        </div>

        <span className="footer__copy animate-link">
          &#169; Rahyan Shamsi Akil. All rigths reserved
        </span>
      </div>
    </footer>
  );
};

export default Footer;
