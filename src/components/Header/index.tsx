
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png"; // Убедитесь, что путь к логотипу верный.
import './index.css';
import profile from "../../assets/profile.png"
import { useSelector } from "react-redux";
import { RootState } from "../../store"; 


const Header = () => {
  const { isAuth } = useSelector((state: RootState) => state.user);
  
    return (
      <header className="header">
        <div className="upper">
          <div className="header-content">
            {/* Логотип */}
            <Link to="/" className="header-logo-container">
              <img src={logo} alt="Сбер-банк" className="header-logo" />
            </Link>
  
            {/* Навигация */}
            <nav className="header-nav">
              <Link to="/bills" className="nav-link">
                Купюры
              </Link>
            </nav>
  
            {/* Условная кнопка */}
            <div className="user-container">
              {isAuth ? (
                <Link to="/profile" className="profile-link">
                  {/* Здесь будет ваша иконка вместо текста */}
                  <img
                    src={profile}
                    alt="Личный кабинет"
                    className="profile-icon"
                  />
                </Link>
              ) : (
                <Link to="/login" className="auth-link">
                  Вход / Регистрация
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>
    );
};

export default Header;
