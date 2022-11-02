import React, { useState, useEffect} from "react";
import { login } from "../api/Requests"
import { useNavigate } from "react-router-dom";
import '../styles/Login.css';
import $ from "jquery";
import Navbar from "./Navbar";

const Login = () => {

    const navigate = useNavigate(); 

    const [data, setData] = useState({
        username: "",
        password: "",
    });

    const [error, setError] = useState("")

    const handleInputChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value,
        });
    };

    const register = () => {
        navigate("/register");
    }

    useEffect(() => {
        $('#alertLogin').hide()
      }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        login(data)
            .then((response) => {
                localStorage.setItem("token", response.headers.authentication);
                localStorage.setItem("userId", response.data.id)
                localStorage.setItem("user", response.data.username)
                localStorage.setItem("profileImage", response.data.profileImage)
                navigate("/home");
            })
            .catch((error) => {
                if(error.response){
                    setError(error.response.data)
                }
                else {
                    setError("Usuario o contraseña incorrectos")
                }
                $('#alertLogin').fadeTo(2000, 500).slideUp(500, () => {
                    $('#alertLogin').slideUp(500)
                })
            });
    };

    return(
        <>
            <header>
                <Navbar />
            </header>
            <div className="register">
                <span id="RegisterTxt">
                    ¿No tenés tu cuenta aún?
                </span>
                <button id="RegisterBtn" type="button" className="btn btn-link" onClick={register}>
                    Registrarme
                </button>
            </div>
            <form className="Login-main" onSubmit={handleSubmit}>
                <h1 id="LoginTitle">
                    Ingresá
                </h1>
                <input 
                    id="LoginUserInput" 
                    name="username"
                    className="input" 
                    type="text"
                    placeholder="E-mail" 
                    value={data.username} 
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