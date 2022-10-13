import React, { useState } from 'react';
import "../styles/Menu.css"
import { useNavigate } from "react-router-dom";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarToggler,
} from 'mdb-react-ui-kit';


function Menu(){
    {
        const [showAnimated, setShowAnimated] = useState(false);

        const logout = () => {
            localStorage.removeItem("token")
            navigate("/")
        }

        const navigate = useNavigate(); 

        return(
            <>
                <section className='mb-3'>
                    <MDBNavbar>
                    <MDBContainer fluid>
                        <MDBNavbarToggler
                        type='button'
                        className='first-button'
                        data-target='#navbarToggleExternalContent'
                        aria-controls='navbarToggleExternalContent'
                        aria-expanded='false'
                        aria-label='Toggle navigation'
                        onClick={() => setShowAnimated(!showAnimated)}
                        >
                        <div className={`animated-icon1 ${showAnimated && 'open'}`}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        </MDBNavbarToggler>
                    </MDBContainer>
                    </MDBNavbar>
                    <div className={`menuItems ${showAnimated ? 'active' : ''}`}/>
                    <div className={`itemButtons ${showAnimated ? 'active' : ''}`}>
                        <div id="ItemButton" type="button" className="itemButton">
                            Crear torneo
                        </div>
                        <div id="ItemButton" type="button" className="itemButton">
                            Mis torneos
                        </div>
                        <div id="ItemButton" type="button" className="itemButton" onClick={logout}>
                            Cerrar sesión
                        </div>
                    </div>
                </section>
            </>
        )
    }
}

export default Menu