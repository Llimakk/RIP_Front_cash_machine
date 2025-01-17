import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchOperation, updateBillCount, deleteBill, formOperation, deleteOperation } from "../../slices/operatSlice";
import { AppDispatch, RootState } from "../../store";
import OperatCard from "../../components/OperatCard/opercard";
import { useNavigate } from "react-router-dom";
import "./operats.css";
import moment from "moment";

const OperatsPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch: AppDispatch = useDispatch();
  const { operation, loading, error } = useSelector((state: RootState) => state.operat);
  const today = moment().format("DD.MM.YYYY");
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(fetchOperation(id));
    }
  }, [id, dispatch]);

  const isEditable = operation?.status === 1;

  const handleUpdateCount = (billId: number, newCount: number) => {
    if (id) {
      dispatch(updateBillCount({ id, billId, count: newCount }));
    }
  };

  const handleDeleteOperation = async () => {
    if (id) {
      await dispatch(deleteOperation(id));
      navigate("/bills"); // Перенаправление на страницу профиля
    }
  };

  

  const handleDeleteBill = (billId: number) => {
    if (id) {
      dispatch(deleteBill({ id, billId }));
    }
  };

  const handleFormOperation = () => {
    if (id) {
      dispatch(formOperation({ id })).then((action) => {
        if (formOperation.fulfilled.match(action)) {
          navigate("/my_operats"); // Перенаправляем на страницу профиля
        } else {
          console.error("Ошибка при формировании операции:", action.payload);
        }
      });
    }
  };


  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;
  if (!operation) return <p>Операция не найдена</p>;

  return (
    <div className="operats-page">
      <h1 className="operats-title">Операция снятия наличных №{operation.id}</h1>
      <button onClick={handleFormOperation} className="form-operation-button" disabled={!isEditable}>
        Сформировать операцию
      </button>
      <p className="operats-date">Дата: {today}</p>
      <p className="operats-address">Адрес: {operation.address}</p>

      <div className="operats-bills-list">
        {operation.bills && operation.bills.length > 0 ? (
          operation.bills.map((bill) => (
            <div className="operats-bill-container" key={bill.id}>
              <OperatCard
                image={bill.image}
                name={bill.name}
                count={bill.count}
                // operatId={operation.id}
                billId={bill.id}
                onUpdateCount={handleUpdateCount}
                isEditable={isEditable} 
              />
              <button
                className="delete-bill-button"
                onClick={() =>
                  isEditable &&
                  dispatch(deleteBill({ id: operation.id, billId: bill.id }))
                }
                disabled={!isEditable} // Делаем кнопку неактивной
              >
                Удалить
              </button>
            </div>
          ))
        ) : (
          <p>Купюры не найдены.</p>
        )}
      </div>
      <button onClick={handleDeleteOperation} className="delete-operation-button" disabled={!isEditable}>
        Удалить операцию
      </button>
    </div>
  );
};

export default OperatsPage;
