import { FC, useEffect, useState } from "react";
import "./login.css";
import { api } from "src/api";
import { useDispatch } from "react-redux";
import { setSessionId } from "../../slices/userSlice";
import { setCookie } from "src/slices/cookieSlice";
import { useNavigate } from "react-router-dom";

export const LoginPage: FC = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // Проверяем наличие session_id при загрузке
  useEffect(() => {
    const sessionCookie = document.cookie
      .split(";")
      .find((row) => row.trim().startsWith("session_id="));
    if (sessionCookie) {
      navigate("/profile"); // Переход на страницу профиля, если сессия есть
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    api.users
      .usersLoginCreate(formData)
      .then((data) => {
        if (data.status === 200) {
          console.log("Login successful");
  
          // Извлекаем session_id из cookie
          const sessionIdCookie = document.cookie
            .split("; ")
            .find((row) => row.startsWith("session_id="));
  
          if (sessionIdCookie) {
            const sessionId = sessionIdCookie.split("=")[1];
            dispatch(setSessionId(sessionId)); // Обновляем Redux-состояние
            navigate("/");
          } else {
            console.error("Session ID not found in cookies");
          }
        } else {
          console.log("Login failed");
          setError(true);
        }
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      });
  };

  return (
    <div className="login-page-container">
      <div className="login-form-wrapper">
        <h1 className="login-header">Войти</h1>
        <form onSubmit={handleSubmit}>
          <div className="login-input-group">
            <label htmlFor="username" className="login-label">
              Логин:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              value={formData.username}
              onChange={handleChange}
              className="login-input"
              placeholder="Введите логин"
            />
          </div>
          <div className="login-input-group">
            <label htmlFor="password" className="login-label">
              Пароль:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="login-input"
              placeholder="Введите пароль"
            />
          </div>
          {error && (
            <div className="login-error-message">Ошибка входа. Проверьте данные.</div>
          )}
          <button type="submit" className="login-submit-button">
            Войти
          </button>
        </form>
        <div className="login-register-wrapper">
          <button
            className="login-register-button"
            onClick={() => navigate("/register")}
          >
            Зарегистрироваться
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
