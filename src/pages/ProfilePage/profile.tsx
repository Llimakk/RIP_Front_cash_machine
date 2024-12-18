import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store";
import { checkSession, updateUserData, logoutUser } from "slices/userSlice"; // Импортируем необходимые экшены
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from "reactstrap";
import { useNavigate } from "react-router-dom";

const ProfilePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // Получаем состояние пользователя из Redux
  const { login, isAuth, status, error, id_user } = useSelector(
    (state: RootState) => state.user
  );

  // Локальные состояния для формы
  const [newLogin, setNewLogin] = useState<string>(login);
  const [newPassword, setNewPassword] = useState<string>("");

  // Проверка авторизации при монтировании компонента
  // useEffect(() => {
  //   dispatch(checkSession());
  //   if (!isAuth) {
  //     navigate("/login"); 
  //   }
  // }, [dispatch, isAuth, navigate]);

  // Обработчик отправки формы
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id_user) {
      console.error("User ID is not available.");
      return;
    }

    const data: { login?: string; password?: string } = {};
    if (newLogin !== login) data.login = newLogin;
    if (newPassword) data.password = newPassword;

    await dispatch(updateUserData({ userId: id_user, data }));

    if (status === "succeeded") {
      alert("Данные успешно обновлены.");
    } else {
      alert("Ошибка обновления данных.");
    }
  };

  // Логаут пользователя
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login"); // После выхода редирект на страницу входа
  };

  if (status === "loading") {
    return <div>Загрузка...</div>; // Можно добавить какой-то индикатор загрузки
  }

  return (
    <div>
      <Container className="profile-container py-5">
        <Row className="profile-header mb-4">
          <Col>
            <h1 className="text-center">Личный кабинет</h1>
          </Col>
        </Row>

        {/* Блок приветствия */}
        <Row className="profile-welcome justify-content-center">
          <Col xs="12" sm="8" md="6">
            <div
              className="profile-card p-4 shadow"
              style={{
                backgroundColor: "#D0B175",
                borderRadius: "10px",
              }}
            >
              <h5 className="text-center mb-4">Добро пожаловать, {login}!</h5>
              <ul className="list-unstyled">
                <li>
                  <strong>Логин:</strong> {login}
                </li>
                <li>
                  <strong>Статус:</strong> {isAuth ? "Авторизован" : "Не авторизован"}
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Форма обновления данных */}
      <Container className="profile-update mt-5">
        <h2>Обновить данные</h2>
        {status === "failed" && <p className="text-danger">Ошибка: {error}</p>}
        <Form onSubmit={handleUpdate}>
          <FormGroup>
            <Label for="newLogin">Новый логин</Label>
            <Input
              type="text"
              id="newLogin"
              value={newLogin}
              onChange={(e) => setNewLogin(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="newPassword">Новый пароль</Label>
            <Input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </FormGroup>
          {/* <Button color="primary" type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Обновление..." : "Сохранить изменения"}
          </Button> */}
        </Form>
      </Container>
    </div>
  );
};

export default ProfilePage;
