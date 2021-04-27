import { Link } from "react-router-dom";
import * as React from "react";

export function Navbar() {
  return (
    <div className="navbar-container">
        <li><Link className="navbar-link" to={"/"}>
            Front Page
        </Link></li>
        <li><Link className="navbar-link" to={"/message"}>
            Send Message
        </Link></li>
        <li><Link className="navbar-link" to={"/log"}>
            Message Log
        </Link></li>
        <li><Link className="navbar-link" to={"/profile"}>
            Profile
        </Link></li>
        <li><Link className="navbar-link" to={"/login"}>
            Login
        </Link></li>
    </div>
  );
}
