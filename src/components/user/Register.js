import '../../styles/Register.css';
import '../../styles/index.css'
import React, { useState, useEffect} from "react";
import { registerUser } from "../../api/Requests"
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import Navbar from "../Navbar";
import genericprofile from '../../images/genericprofile.jpg';

const RegisterUser = () => {

    const navigate = useNavigate();

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        image: genericprofile
    });

    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("")

    const reader = new FileReader();

    const handleInputChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        });
    };

    const handleImageInputChange = (event) => {

        if(event.target.files.length > 0){
            if(event.target.files[0].size > 1000000){
                setError("Tamaño de imagen muy grande, debe ser menor a 1 megabyte")
                $('#alertReg').fadeTo(2000, 500).slideUp(500, () => {
                    $('#alertReg').slideUp(500)
                })
            } else {
                reader.readAsDataURL(event.target.files[0]);
                reader.onload = function () {
                    setData({
                        ...data,
                        image: reader.result
                    });
                };
                reader.onerror = function (error) {
                    console.log('Error: ', error);
                };
            }        
        }
        else{
            setData({
                ...data,
                image: genericprofile
            });
        }
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const showError = (message) => {
        setError(message)
        $('#alertReg').fadeTo(2000, 500).slideUp(500, () => {
            $('#alertReg').slideUp(500)
        })
    }

    useEffect(() => {
        $('#alertReg').hide()
    },[]);
    
    const handleSubmit = (event) => {
        event.preventDefault();
        if(data.password === confirmPassword){
            registerUser(data)
            .then(() => {
                navigate("/login")
            })
            .catch((error) => {
                if(error.response.data){
                    showError(error.response.data)
                }
                else {
                    showError("Falló la conexión con el servidor")
                }
            });
        } else {
            showError("Las contraseñas no coinciden")
        }
    };

    return(
        <>
            <header>
                <Navbar />
            </header>
            <form className="Register-main" onSubmit={handleSubmit}>
                <div data-testid="register-error" id= "alertReg" className="alert alert-danger" role="alert">
                    {error}
                </div>
                <h1 data-testid="register-title" id="RegisterTitle">
                    Registrarme
                </h1>
                <img data-testid="register-img" id="ProfilePicture" src={data.image} alt="user"/>
                <input 
                    data-testid="register-name"
                    id="RegisterNameInput" 
                    name = "name"
                    className="registerInput" 
                    type="text"
                    placeholder="Nombre de usuario"
                    value={data.name}
                    onChange={handleInputChange}
                />
                <input
                    data-testid="register-email" 
                    id="RegisterEmailInput" 
                    name = "email"
                    className="registerInput" 
                    placeholder="E-mail"
                    type="text"
                    value={data.email}
                    onChange={handleInputChange}
                /> 
                <input 
                    data-testid="register-password"
                    id="RegisterPassInput" 
                    name="password"
                    className="registerInput" 
                    type="password" 
                    placeholder="Contraseña"
                    value={data.password}
                    onChange={handleInputChange}    
                />
                <input 
                    id="RegisterConfirmPassInput" 
                    name="confirmPassword"
                    className="registerInput" 
                    type="password" 
                    placeholder="Repetir contraseña"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                />
                <label id="SelectLabel" htmlFor="image">Elegí tu foto de perfil</label>
                <input
                    data-testid="image-selector"
                    id="RegisterImageInput"
                    name="image"
                    className="registerInput"
                    type="file"
                    onChange={handleImageInputChange}
                    accept="image/*"
                />
                <button 
                    data-testid="register-button"
                    id="RegisterBtn" 
                    type="submit" 
                    className="btn btn-primary">
                    Registrarme
                </button>
            </form>
        </>
    )
}

export default RegisterUser