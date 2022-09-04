import React from "react"
import "../styles/Navbar.css"
import { useNavigate } from "react-router-dom";
import logo from '../images/pd.png';

const Navbar = () => {

    const navigate = useNavigate(); 

    const home = () => {
        navigate("/home");
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
        </nav>
    );

};

export default Navbar;