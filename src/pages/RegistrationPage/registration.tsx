import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, resetRegistrationState } from "../../slices/registrationSlice";
import { RootState } from "store";
import { useNavigate } from "react-router-dom";
import "./registration.css";

const RegistrationPage: React.FC = () => {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    username: "",
  });

  const dispatch = useDispatch<any>();
  const { loading, error, success } = useSelector((state: RootState) => state.registration);
  const navigate = useNavigate();

  useEffect(() => {
    if (success) {
      alert("Регистрация успешна!");
      navigate("/login");
      dispatch(resetRegistrationState());
    }
  }, [success, navigate, dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(registerUser(formData));
  };

  return (
    <div className="registration-page">
      <div className="registration-container">
        <h1 className="registration-title">Регистрация</h1>
        <form onSubmit={handleSubmit} className="registration-form">
          <div className="registration-input-group">
            <label htmlFor="email" className="registration-label">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="registration-input"
              placeholder="Введите email"
            />
          </div>
          <div className="registration-input-group">
            <label htmlFor="username" className="registration-label">
              Логин:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="registration-input"
              placeholder="Введите логин"
            />
          </div>
          <div className="registration-input-group">
            <label htmlFor="first_name" className="registration-label">
              Имя:
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
              className="registration-input"
              placeholder="Введите имя"
            />
          </div>
          <div className="registration-input-group">
            <label htmlFor="last_name" className="registration-label">
              Фамилия:
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
              className="registration-input"
              placeholder="Введите фамилию"
            />
          </div>
          <div className="registration-input-group">
            <label htmlFor="password" className="registration-label">
              Пароль:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="registration-input"
              placeholder="Введите пароль"
            />
          </div>
          {error && <div className="registration-error">{error}</div>}
          <button
            type="submit"
            className="registration-submit-button"
            disabled={loading}
          >
            {loading ? "Загрузка..." : "Зарегистрироваться"}
          </button>
        </form>
        <div className="registration-footer">
          <button
            className="registration-login-button"
            onClick={() => navigate("/login")}
          >
            Уже есть аккаунт? Войти
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
