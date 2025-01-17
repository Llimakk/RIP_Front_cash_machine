import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/store";
import { fetchMyOperats } from "src/slices/formdSlice";
import "./myoperats.css"
import CardOperat from "../../components/FormdCard/FormdCard";

const MyOperatsPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { operats, loading, error } = useSelector((state: RootState) => state.myOperat);
  const isAuth = useSelector((state: RootState) => state.user.isAuth);

  useEffect(() => {
    // Запрашиваем операции при загрузке страницы
    if (isAuth) {
      dispatch(fetchMyOperats());
    }
  }, [dispatch, isAuth]);

  if (!isAuth) {
    return (
      <div className="operats-page">
        <h1>Мои операции</h1>
        <p className="auth-warning">Вы не авторизованы, пожалуйста, войдите в систему, чтобы увидеть ваши операции</p>
      </div>
    );
  }

  return (
    <div className="operats-page">
      <h1>Мои операции</h1>

      {loading && <p>Загрузка операций...</p>}
      {/* {error && <p className="error-message">Ошибка: {error}</p>} */}

      <div className="operats-list">
        {operats.length > 0 ? (
          operats.map((operat) => (
            <CardOperat
              key={operat.id}
              id={operat.id}
              status={operat.status}
              dateFormation={operat.date_formation}
            />
          ))
        ) : (
          !loading && <p>Операции не найдены</p>
        )}
      </div>
    </div>
  );
};

export default MyOperatsPage;
