import { useState, useEffect } from "react";
import "./login.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, resetLoginState } from "src/slices/loginSlice";
import { RootState } from "src/store";

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { loginUser, resetLoginState } from "../slices/loginSlice";
// import { RootState } from "../store";
// import { useNavigate } from "react-router-dom";
// import "./login.css";

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch<any>();
  const { loading, error, success, userData } = useSelector(
    (state: RootState) => state.login
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (success && userData) {
      alert("Вход выполнен успешно!");
      console.log("Данные пользователя:", userData);
      navigate("/"); // Переход на главную страницу
      dispatch(resetLoginState());
    }
  }, [success, userData, navigate, dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };


  return (
    <div className="login-page-container">
      <div className="login-form-wrapper">
        <h1 className="login-header">Вход</h1>
        <form onSubmit={handleSubmit}>
          <div className="login-input-group">
            <label htmlFor="username" className="login-label">
              Логин:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="login-input"
              placeholder="Введите логин"
              required
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
              value={formData.password}
              onChange={handleChange}
              className="login-input"
              placeholder="Введите пароль"
              required
            />
          </div>
          {error && <div className="login-error-message">{error}</div>}
          <button
            type="submit"
            className="login-submit-button"
            disabled={loading}
          >
            {loading ? "Загрузка..." : "Войти"}
          </button>
        </form>
        <div className="login-register-wrapper">
          <p>Нет аккаунта?</p>
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