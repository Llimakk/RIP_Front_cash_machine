import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png"; // Убедитесь, что путь к логотипу верный.
import './index.css';

const Header = () => {
    return (
        <header className="header">
            <div className="upper">
                <div className="header-content">
                    {/* Логотип */}
                    <Link to="/" className="header-logo-container">
                        <img src={logo} alt="Сбер-банк" className="header-logo" />
                    </Link>
                    {/* Название страницы */}
                    <nav className="header-nav">
                        <Link to="/bills" className="nav-link">
                            Купюры
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
