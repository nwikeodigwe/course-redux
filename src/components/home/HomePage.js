import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => (
  <div className="p-5 mb-4 bg-body-tertiary rounded-3">
    <h1>Administrator</h1>
    <p>React redux and react router</p>
    <Link to="about" className="btn btn-primary btn-lg">
      About
    </Link>
  </div>
);

export default HomePage;
