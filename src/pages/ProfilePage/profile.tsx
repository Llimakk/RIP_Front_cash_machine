import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/store";
import { useNavigate } from "react-router-dom";
import "./profile.css"
import { updateUserProfile, fetchUserData, logoutUserAsync } from "src/slices/userSlice";
import { useState, useEffect } from "react";

const ProfilePage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error, isAuth } = useSelector((state: RootState) => state.user);
  const { id_user } = useSelector((state: RootState) => state.cookie);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    password: "",
  });

  const handleLogout = () => {
    dispatch(logoutUserAsync())
      .then(() => navigate("/")) // Переход на главную страницу при успешном выходе
      .catch((err) => console.error("Ошибка выхода:", err)); // Просто логируем, без alert
  };

  useEffect(() => {
    if (isAuth && id_user) {
      // Загружаем данные пользователя, если есть сессия и данные еще не загружены
      dispatch(fetchUserData());
    } else if (user) {
      // Обновляем локальное состояние при изменении данных пользователя
      setFormData({
        username: user.username || "",
        email: user.email || "",
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        password: "",
      });
    }
  }, [dispatch, isAuth, id_user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert("Пользователь не найден");
      return;
    }

    try {
      await dispatch(
        updateUserProfile({
          userId: user.id,
          data: formData,
        })
      ).unwrap();

      alert("Данные успешно обновлены!");
    } catch (err) {
      console.error("Ошибка обновления профиля:", err);
      alert("Не удалось обновить профиль");
    }
  };

  return (
    <div className="profile-container">
      <h1>Личный кабинет</h1>
  
      {loading && <p className="profile-loading">Загрузка...</p>}
      {error && <p className="profile-error-message">Ошибка: {error}</p>}
  
      {isAuth ? (
        <>
          {/* Секция текущих данных */}
          <div className="profile-current-info">
            <h2>Текущие данные</h2>
            <p>
              <strong>Имя пользователя:</strong> {user?.username}
            </p>
            <p>
              <strong>Электронная почта:</strong> {user?.email}
            </p>
            <p>
              <strong>Имя:</strong> {user?.first_name}
            </p>
            <p>
              <strong>Фамилия:</strong> {user?.last_name}
            </p>
          </div>
  
          {/* Форма редактирования */}
          <form onSubmit={handleSubmit} className="profile-edit-form">
            <h2>Редактирование профиля</h2>
            <div className="profile-form-group">
              <label>Имя пользователя</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Введите новое имя пользователя"
              />
            </div>
            <div className="profile-form-group">
              <label>Электронная почта</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Введите новую электронную почту"
              />
            </div>
            <div className="profile-form-group">
              <label>Имя</label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="Введите новое имя"
              />
            </div>
            <div className="profile-form-group">
              <label>Фамилия</label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Введите новую фамилию"
              />
            </div>
            <div className="profile-form-group">
              <label>Пароль</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Введите новый пароль"
              />
            </div>
            <button type="submit" className="profile-submit-button" disabled={loading}>
              Сохранить изменения
            </button>
            <button onClick={handleLogout} className="profile-logout-button">
              Выйти из аккаунта
            </button>
          </form>
        </>
      ) : (
        <p>Вы не авторизованы!</p>
      )}
    </div>
  );
};

export default ProfilePage;
