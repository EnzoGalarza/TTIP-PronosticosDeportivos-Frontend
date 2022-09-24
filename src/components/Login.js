import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import '../styles/Login.css';
import $ from "jquery";
import Navbar from "./Navbar";

const Login = () => {

    const navigate = useNavigate(); 

    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("")

    const handleInputChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value,
        });
    };

    useEffect(() => {
        $('#alertLogin').hide()
      }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate("/home");
    };

    return(
        <>
            <header>
                <Navbar />
            </header>
            <form className="Login-main" onSubmit={handleSubmit}>
                <h1 id="LoginTitle">
                    Ingresá
                </h1>
                <input 
                    id="LoginUserInput" 
                    name="email"
                    className="input" 
                    type="text"
                    placeholder="E-mail" 
                    value={data.email} 
                    onChange={handleInputChange}
                />
                <input 
                    id="LoginPassInput" 
                    name="password"
                    className="input" 
                    type="password" 
                    placeholder="Contraseña" 
                    value={data.password}
                    onChange={handleInputChange}
                /> 
                <button  type="submit" className="btn btn-primary">
                    Log in
                </button>
                <div id= "alertLogin" className="alert alert-danger" role="alert">
                    {error}
                </div>
            </form>
        </>
    )
}

export default Login