import React, { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaSignOutAlt, FaSignInAlt, FaUser, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import "../css/MobileNav.css";

const MobileNav = ({ navLinks, userLinks, isOpen, setOpen }) => {
    const location = useLocation();
    const pathname = location.pathname;
    const { user, logout } = useContext(AuthContext);
    const [isSubmenuOpen, setSubmenuOpen] = useState(false);

    const handleMenuToggle = () => {
        setOpen((prev) => !prev);
    };

    const handleSubmenuToggle = () => {
        setSubmenuOpen((prev) => !prev);
    };

    return (
        <>
            <div className={`hamburger-menu ${isOpen ? "open" : ""}`}>
                <div className="hamburger-links">
                    {navLinks.map((navlink, index) => (
                        <div
                            key={index}
                            className={
                                pathname === navlink.address
                                    ? "hamburger-link-active"
                                    : "hamburger-link"
                            }
                            onClick={handleMenuToggle}
                        >
                            <Link to={navlink.address}>
                                {navlink.icon}
                                {navlink.name}
                            </Link>
                        </div>
                    ))}
                    {user ? (
                        <>
                            <div className="hamburger-link" onClick={handleSubmenuToggle}>
                                <span>
                                    <FaUser />
                                    Dashboard
                                    {isSubmenuOpen ? <FaChevronUp /> : <FaChevronDown />}
                                </span>
                            </div>
                            {isSubmenuOpen && (
                                <div className="submenu">
                                    {userLinks.map((userlink, index) => (
                                        <div
                                            key={index}
                                            className={
                                                pathname === userlink.address
                                                    ? "hamburger-link-active"
                                                    : "hamburger-link"
                                            }
                                        >
                                            <Link to={userlink.address}>
                                                {userlink.icon}
                                                {userlink.name}
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div className="hamburger-link" onClick={logout}>
                                <span>
                                    <FaSignOutAlt />
                                    Logout
                                </span>
                            </div>
                        </>
                    ) : (
                        <div
                            className={
                                pathname === "/login" ? "hamburger-link-active" : "hamburger-link"
                            }
                            onClick={handleMenuToggle}
                        >
                            <Link to="/login">
                                <FaSignInAlt />
                                Login
                            </Link>
                        </div>
                    )}
                </div>
            </div>
            {isOpen && (
                <div className={`overlay ${isOpen ? "open" : ""}`} onClick={handleMenuToggle}></div>
            )}
        </>
    );
};

export default MobileNav;
