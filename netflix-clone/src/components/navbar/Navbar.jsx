import React, { useEffect, useState } from "react";
import "./navbar.css";

function Navbar() {
  const [show, handleShow] = useState(false);

  useEffect(() => {
    const scrollHandler = () => {
      if (window.scrollY > 70) {
        handleShow(true);
      } else {
        handleShow(false);
      }
    };

    window.addEventListener("scroll", scrollHandler);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  return (
    <div className={`nav ${show && "nav_black"}`}>
      <img
        className="nav_logo"
        src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
        alt="Netflix"
      ></img>
      <img
        className="nav_avatar"
        src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
        alt="Avatar"
      ></img>
    </div>
  );
}

export default Navbar;
