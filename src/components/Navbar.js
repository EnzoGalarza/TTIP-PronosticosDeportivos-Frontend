import React from "react"
import "../styles/Navbar.css"
import { useNavigate, useLocation } from "react-router-dom";
import logo from '../images/pd.png';

const Navbar = () => {

    const navigate = useNavigate(); 
    const location = useLocation();

    const home = () => {
        navigate("/home");
    }

    const register = () => {
        navigate("/register");
    }

    const logout = () => {
        localStorage.removeItem("token")
        navigate("/")
    }

    const isAuthenticated = !!localStorage.getItem("token")

    return (
        <nav className="Navbar">
            <div className="text-right">
                <div className="userContainer">
                    <img id="PDLogo" alt={"Not found"} src={logo} onClick={home}/>
                </div>
            </div>
            <div className="navbarTitle">
                Pronósticos deportivos
            </div>
            {(location.pathname === "/" || location.pathname === "/login") && (
                <>
                    <span id="RegisterTxt">
                        ¿No tenés tu cuenta aún?
                    </span>
                    <button id="RegisterBtn" type="button" className="btn btn-link" onClick={register}>
                        Registrarme
                    </button>
                </>
            )}
            {isAuthenticated && (
                <button id="LogoutBtn" type="button" className="btn btn-primary" onClick={logout}>
                    Logout
                </button>
            )}
        </nav>
    );

};

export default Navbar;