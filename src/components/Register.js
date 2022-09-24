import '../styles/Register.css';
import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import Navbar from "./Navbar";
import genericprofile from '../images/genericprofile.jpg';

const RegisterUser = () => {

    useEffect(() => {
        $('#alertReg').hide()
      }, []);

    const navigate = useNavigate(); 

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        image: genericprofile
    });

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })

    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("")

    const handleInputChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        });
    };

    const handleImageInputChange = (event) => {
        setData({
            ...data,
            image: URL.createObjectURL(event.target.files[0])
        });
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    useEffect(() => {
        setLoginData({
            email : data.email,
            password : data.password
        })
    },[data.email, data.password]);
    
    const handleSubmit = (event) => {
        event.preventDefault();
        if(data.password === confirmPassword){
            //Registrar usuario y logearlo.
        } else {
            setError("Las contraseñas no coinciden")
            $('#alertReg').fadeTo(2000, 500).slideUp(500, () => {
                $('#alertReg').slideUp(500)
            })
        }
    };

    return(
        <>
            <header>
                <Navbar />
            </header>
            <form className="Register-main" onSubmit={handleSubmit}>
                <h1 id="RegisterTitle">
                    Registrarme
                </h1>
                {(data.image !== genericprofile) && <img id="ProfilePicture" src={data.image}/>}
                <input 
                    id="RegisterNameInput" 
                    name = "name"
                    className="registerInput" 
                    type="text"
                    placeholder="User name"
                    value={data.name}
                    onChange={handleInputChange}
                />
                <input 
                    id="RegisterEmailInput" 
                    name = "email"
                    className="registerInput" 
                    placeholder="E-mail"
                    type="text"
                    value={data.email}
                    onChange={handleInputChange}
                /> 
                <input 
                    id="RegisterPassInput" 
                    name="password"
                    className="registerInput" 
                    type="password" 
                    placeholder="Password"
                    value={data.password}
                    onChange={handleInputChange}    
                />
                <input 
                    id="RegisterConfirmPassInput" 
                    name="confirmPassword"
                    className="registerInput" 
                    type="password" 
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                />
                <label id="SelectLabel" for="image">Elegí tu foto de perfil</label>
                <input
                    id="RegisterImageInput"
                    name="image"
                    className="registerInput"
                    type="file"
                    onChange={handleImageInputChange}
                    accept="image/*"
                />
                <button 
                    id="RegisterBtn" 
                    type="submit" 
                    className="btn btn-primary">
                    Registrarme
                </button>
                <div id= "alertReg" className="alert alert-danger" role="alert">
                    {error}
                </div>
            </form>
        </>
    )
}

export default RegisterUser