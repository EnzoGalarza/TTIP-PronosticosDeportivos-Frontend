import React from "react"
import "../styles/Navbar.css"
import Menu from "./Menu";
import { useNavigate } from "react-router-dom";
import logo from '../images/pd.png';

const Navbar = () => {

    const navigate = useNavigate(); 

    const home = () => {
        navigate("/home");
    }

    const profile = () => {
        navigate("/profile");
    }

    const isAuthenticated = !!localStorage.getItem("token")

    return (
        <nav className="Navbar">
            {isAuthenticated && (
                <span className="profile">
                    <img src={localStorage.getItem("profileImage")} className="profilePicture" alt={localStorage.getItem("user")} onClick={profile}/>
                </span>
            )}
            <span className="logo">
                <span className="userContainer">
                    <img id="PDLogo" alt={"Pronósticos deportivos"} src={logo} onClick={home}/>
                </span>
            </span>
            {isAuthenticated && (
                <span className="menu">
                    <Menu/>
                </span>
            )}
        </nav>
    );


};

export default Navbar;