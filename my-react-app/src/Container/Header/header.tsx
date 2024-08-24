import React from 'react';
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <nav className="navbar bg-body-tertiary">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand" href="#">Home</Link>
            </div>
        </nav>
    );
};

export default Header;