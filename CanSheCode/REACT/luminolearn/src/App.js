import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Lumi from "./Lumi";

const App = () => {
  return (
    <Router>
      <nav>
          <ul>
            <li>
              <Link to="/">About</Link>
            </li>
            <li>
              <Link to="/programs">Programs</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/login">Login / Signin</Link>
            </li>
          </ul>
        </nav>

      <div className="App">
        <header>
          <h1>Welcome to LuminoLearn Academy</h1>
          <p>Explore our unique teaching methods and programs!</p>
        </header>

        
        <div>
          <Routes>
            <Route path="/" element={<AboutPage />} />
            <Route path="/programs" element={<ProgramsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </div>
        <Lumi />
      </div>
    </Router>
  );
};

const AboutPage = () => (
  <div>
    <h2>About Us</h2>
    <p>Learn more about our mission and values at LuminoLearn Academy.</p>
  </div>
);
const ProgramsPage = () => (
  <div id="programs">
    <h2>Our Programs</h2>
    <ul>
      <div>
        <li>Language and Literacy Development</li>
        <button>Let's discuss</button>
      </div>
      <div>
        <li>STEM Education</li>
        <button>Let's try</button>
      </div>
      <div>
        <li>Creative and Artistic Development</li>
        <button>Let's create</button>
      </div>
      <div>
        <li>Social and Emotional Skills</li>
        <button>Don't be shy</button>
      </div>
    </ul>
  </div>
);

const ContactPage = () => (
  <div id="contact">
    <h2>Contact Us</h2>
    <p>Get in touch to learn more about how we can help your child.</p>
  </div>
);

const LoginPage = () => (
  <div>
    <h2>Login / Signin</h2>
    <p>Please login or sign in to access your account.</p>
  </div>
);

export default App;
