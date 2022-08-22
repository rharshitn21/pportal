import React from "react";
import Image from "../image.png";


export default function Navbar() {
    return (
        <header className="p-3 mb-3">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-center">
                    <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                        <img src={Image}alt="Manipal"></img>
                    </a>
                </div>
            </div>
        </header>
    );
}