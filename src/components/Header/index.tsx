
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png"; // Убедитесь, что путь к логотипу верный.
import './index.css';

const Header = () => {
    // return (
    //     <header className="header4">
    //         <div className="upper4">
    //             <div className="header-content4">
    //                 <Link to="/" className="header-logo-container4">
    //                     <img src={logo} alt="Сбер-банк" className="header-logo4" />
    //                 </Link>
    //                 <nav className="header-nav4">
    //                     <Link to="/bills" className="nav-link4">
    //                         Купюры
    //                     </Link>
    //                 </nav>
    //             </div>
    //         </div>
    //     </header>
    // );
    return (
        <header className="header-5">
            <div className="upper-5">
                <div className="header-content-5">
                    <Link to="/" className="header-logo-container-5">
                        <img src={logo} alt="Сбер-банк" className="header-logo-5" />
                    </Link>
                    <nav className="header-nav-5">
                        <Link to="/bills" className="nav-link-5">
                            Купюры
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
