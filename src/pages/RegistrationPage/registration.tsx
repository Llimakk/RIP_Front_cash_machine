import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "src/slices/userSlice"; // Для обновления пользователя в Redux
import "./registration.css";

const RegistrationPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    first_name: "",
    last_name: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const errors: any = {};
    if (!formData.email) errors.email = "Email обязателен";
    if (!formData.username) errors.username = "Логин обязателен";
    if (!formData.first_name) errors.first_name = "Имя обязательно";
    if (!formData.last_name) errors.last_name = "Фамилия обязательна";
    if (!formData.password) errors.password = "Пароль обязателен";
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors({});
    setError(null);
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setLoading(true);
    try {
      // Функция для отправки данных регистрации
      const response = await fetch("/api/users/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include", // для сохранения сессионных данных
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || "Ошибка регистрации");
      }

      const userData = await response.json();
      dispatch(setUser(userData)); // Обновляем Redux с данными нового пользователя
      alert("Регистрация успешна!");
      navigate("/login"); // Перенаправляем на страницу логина
    } catch (err: any) {
      setError(err.message || "Ошибка при регистрации");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registration-page">
      <div className="registration-container">
        <h1 className="registration-title">Регистрация</h1>
        <form onSubmit={handleSubmit} className="registration-form">
          <div className="registration-input-group">
            <label htmlFor="email" className="registration-label">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={`registration-input ${formErrors.email ? "input-error" : ""}`}
              placeholder="Введите email"
            />
            {formErrors.email && <span className="error-text">{formErrors.email}</span>}
          </div>
          <div className="registration-input-group">
            <label htmlFor="username" className="registration-label">Логин:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className={`registration-input ${formErrors.username ? "input-error" : ""}`}
              placeholder="Введите логин"
            />
            {formErrors.username && <span className="error-text">{formErrors.username}</span>}
          </div>
          <div className="registration-input-group">
            <label htmlFor="first_name" className="registration-label">Имя:</label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
              className={`registration-input ${formErrors.first_name ? "input-error" : ""}`}
              placeholder="Введите имя"
            />
            {formErrors.first_name && <span className="error-text">{formErrors.first_name}</span>}
          </div>
          <div className="registration-input-group">
            <label htmlFor="last_name" className="registration-label">Фамилия:</label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
              className={`registration-input ${formErrors.last_name ? "input-error" : ""}`}
              placeholder="Введите фамилию"
            />
            {formErrors.last_name && <span className="error-text">{formErrors.last_name}</span>}
          </div>
          <div className="registration-input-group">
            <label htmlFor="password" className="registration-label">Пароль:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className={`registration-input ${formErrors.password ? "input-error" : ""}`}
              placeholder="Введите пароль"
            />
            {formErrors.password && <span className="error-text">{formErrors.password}</span>}
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
