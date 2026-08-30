import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-contain-left">
          <img src={assets.logo} alt="" />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo eum in
            inventore debitis officia repellendus perferendis blanditiis
            pariatur magni aperiam. Dignissimos consectetur pariatur, vitae
            minima animi quibusdam laborum dolor nesciunt?
          </p>
          <div className="footer-social-item">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-contain-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>privacy Policy</li>
          </ul>
        </div>

        <div className="footer-contain-right">
          <h2> GET IN TOUCH</h2>
          <ul>
            <li>+1-212-458-7896</li>
            <li>contact@tomato.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        © 2026 Tomato. All rights reserved. | Privacy Policy | Terms &
        Conditions
      </p>
    </div>
  );
};

export default Footer;
