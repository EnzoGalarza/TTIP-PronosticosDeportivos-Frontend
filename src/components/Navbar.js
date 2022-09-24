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
                        No tenés tu cuenta aún?
                    </span>
                    <button id="RegisterBtn" type="button" className="btn btn-link" onClick={register}>
                        Registrarme
                    </button>
                </>
            )}
        </nav>
    );

};

export default Navbar;