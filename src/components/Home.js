import React from "react";
import "../styles/Home.css"
import Navbar from "./Navbar";

const Home = () => {

    return (
        <>  
            <header>
                <Navbar/>
            </header>
            <div className="Home">
                Home
            </div>
        </>
    )

}

export default Home;