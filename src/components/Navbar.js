import React from "react"
import "../styles/Navbar.css"
import { useNavigate, useLocation } from "react-router-dom";
import logo from '../images/pd.png';

const Navbar = () => {

    const navigate = useNavigate(); 

    const home = () => {
        navigate("/home");
    }

    const profile = () => {
        navigate("/profile");
    }

    const logout = () => {
        localStorage.removeItem("token")
        navigate("/")
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
                <button id="LogoutBtn" type="button" className="btn btn-link" onClick={logout}>
                    Cerrar sesión
                </button>
            )}
        </nav>
    );


};

export default Navbar;