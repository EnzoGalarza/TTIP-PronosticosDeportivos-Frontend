import React, { useState, useEffect} from "react";
import { login } from "../../api/Requests"
import { useNavigate } from "react-router-dom";
import '../../styles/Login.css';
import '../../styles/index.css'
import $ from "jquery";
import Navbar from "../Navbar";

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

    const showError = (message) => {
        setError(message)
        $('#alertReg').fadeTo(2000, 500).slideUp(500, () => {
            $('#alertReg').slideUp(500)
        })
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
                if(error.response.data){
                    showError(error.response.data)
                }
                else {
                    showError("Falló la conexión con el servidor")
                }
            });
    };

    return(
        <>
            <header>
                <Navbar />
            </header>
            <div className="register">
                <span data-testid="register-text" id="RegisterTxt">
                    ¿No tenés tu cuenta aún?
                </span>
                <button data-testid="register-button" id="RegisterBtn" type="button" className="btn btn-link" onClick={register}>
                    Registrarme
                </button>
            </div>
            <form className="Login-main" onSubmit={handleSubmit}>
                <h1 data-testid="login-title" id="LoginTitle">
                    Ingresá
                </h1>
                <input 
                    data-testid="login-email"
                    id="LoginUserInput" 
                    name="username"
                    className="input" 
                    type="text"
                    placeholder="E-mail" 
                    value={data.username} 
                    onChange={handleInputChange}
                />
                <input 
                    data-testid="login-password"
                    id="LoginPassInput" 
                    name="password"
                    className="input" 
                    type="password" 
                    placeholder="Contraseña" 
                    value={data.password}
                    onChange={handleInputChange}
                /> 
                <button data-testid="login-button" type="submit" className="btn btn-primary">
                    Log in
                </button>
                <div data-testid="login-error" id= "alertLogin" className="alert alert-danger" role="alert">
                    {error}
                </div>
            </form>
        </>
    )
}

export default Login