import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white-800 text-black p-4 text-center">
      <div className="container mx-auto">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Project Management. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;