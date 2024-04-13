// eslint-disable-next-line no-unused-vars
import React from "react";

const Social = () => {
  return (
    <div className="home__social animate-link">
      <a
        href="https://www.instagram.com/rahyan_akil/"
        className="home__social-icon"
        target="_blank"
        rel="noreferrer"
      >
        <i className="uil uil-instagram"></i>
      </a>
      <a
        href="https://www.linkedin.com/in/rahyanshamsi/"
        className="home__social-icon"
        target="_blank"
        rel="noreferrer"
      >
        <i className="uil uil-linkedin"></i> {/* Corrected the class name */}
      </a>
      <a
        href="https://github.com/rahyanakil"
        className="home__social-icon"
        target="_blank"
        rel="noreferrer"
      >
        <i className="uil uil-github-alt"></i>
      </a>
    </div>
  );
};

export default Social;
