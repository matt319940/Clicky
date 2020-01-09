import React from 'react';

const NavBar = props => {
    return(
        <div>
            <nav className="navbar navbar-dark bg-primary" {...props}>
                <span className="navbar-brand mb-0 h1">Clicky</span>
            </nav>
        </div>
    )
}
export default NavBar;