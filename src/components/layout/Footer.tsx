"use client";

import { useState, useEffect } from "react";
import "./footer.css"

export default function Footer() {
  const [year, setYear] = useState("");

  useEffect(() => {
    setYear(new Date().getFullYear().toString());
  }, []);

  return (
    <footer className="footer-container">
      <section className="max-width">
        <div className="footer-nav">
          <div>
            <h1 className="footer-heading">About Us</h1>
            <p className="footer-dec">Sumer Store is your trusted online destination for top-quality appliances and devices.</p>
            <img src="/social-media.png" className="footer-social" />
          </div>

          <div>
            <h1 className="footer-heading">Quick Links</h1>
            <p className="footer-link">My Account</p>
            <p className="footer-link">Login</p>
            <p className="footer-link">Create Account</p>
            <p className="footer-link">My Wishlist</p>
            <p className="footer-link">Contact Us</p>
          </div>

          <div>
            <h1 className="footer-heading">Legal</h1>
            <p className="footer-link">Privacy Policy</p>
            <p className="footer-link">POPIA Policy</p>
            <p className="footer-link">Letter of Authority</p>
            <p className="footer-link">Complaints Management Policy</p>
          </div>


        </div>

        <div className="footer-footer">
          <img src="/card-support.png" />
          <p>&copy; Sumer {year}.</p>

        </div>
      </section>
    </footer>
  );
}
