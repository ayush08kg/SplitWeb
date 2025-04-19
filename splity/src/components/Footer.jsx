// Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 rounded-t-4xl">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h2 className="text-lg font-semibold">HisaabHawk</h2>
          <p className="text-sm text-gray-400">
            Split bills easily, spend smartly.
          </p>
        </div>
        <div className="text-sm text-gray-400">
          © {new Date().getFullYear()} HisaabHawk. Crafted by{" "}
          <span className="text-white font-semibold">A.K.G</span>
          <br />
          <div className="mt-2 flex justify-between items-center">
            <a href="https://www.linkedin.com/in/akg08/">
              <img src="linkedin.png" alt="" className="h-7 w-7" />
            </a>
            <a href="https://github.com/ayush08kg">
              <img src="github.png" alt="" className="h-7 w-7" />
            </a>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=ayushkrgupta2003@gmail.com"
              target="_blank"
              rel="noopener noreferrer"            
              title="Hey mailing you regarding HisaabHawk"
            >
              <img src="gmail.png" alt="Gmail" className="w-7 h-7" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
