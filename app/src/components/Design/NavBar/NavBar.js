import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "../Buttons/Button";
import "./NavBar.css";
import { AuthRoutes } from "../../../core/routing";

const NavBar = ({
    navItems = [],
    onLogout,
    onLogin,
    onRegister,
    loginLabel,
    logoutLabel,
    registerLabel,
}) => {
    return (
        <nav className="navbar bg-secondary navbar-dark navbar-expand-lg">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">
                    Immo Kyan
                </NavLink>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        {navItems.map((navItem) => (
                            <li className="nav-item" key={navItem.href}>
                                <NavLink
                                    className={`nav-link ${
                                        navItem.isActive ? "active" : ""
                                    }`}
                                    to={navItem.href}>
                                    {navItem.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
                {onLogout && (
                    <Button color="primary" onClick={onLogout}>
                        {logoutLabel}
                    </Button>
                )}
                {onLogin && (
                    <NavLink className="btn btn-primary" to={AuthRoutes.Login}>
                        {loginLabel}
                    </NavLink>
                )}
                {onRegister && (
                    <NavLink
                        className="btn btn-outline-primary"
                        to={AuthRoutes.Register}>
                        {registerLabel}
                    </NavLink>
                )}
            </div>
        </nav>
    );
};

NavBar.propTypes = {
    onLogout: PropTypes.func,
    onLogin: PropTypes.bool,
    onRegister: PropTypes.bool,
    loginLabel: PropTypes.string,
    registerLabel: PropTypes.string,
    logoutLabel: PropTypes.string,
    navItems: PropTypes.arrayOf(
        PropTypes.shape({
            to: PropTypes.string,
            label: PropTypes.string,
        })
    ).isRequired,
};

export default NavBar;
