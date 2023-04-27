import React from "react";

function Footer() {
    let currentYear = new Date().getFullYear();
    return (
        <div className="footer">
            <p>Copyright © {currentYear} NRJ </p>
        </div>
    );
}

export default Footer;