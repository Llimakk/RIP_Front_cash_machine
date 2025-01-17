import React from "react";
import { Link } from "react-router-dom";
import "./formdcard.css"

interface CardOperatProps {
  id: number;
  status: number;
  dateFormation: string | null;
}

const statusText: { [key: number]: string } = {
  1: "Введён",
  2: "В работе",
  3: "Завершён",
  4: "Отклонён",
  5: "Удалён",
};

const CardOperat: React.FC<CardOperatProps> = ({ id, status, dateFormation }) => {
  return (
    <div className="card-operat">
      <h3>
        <Link to={`/operats/${id}`} className="card-operat-link">
            Операция #{id}
            </Link>
      </h3>
      <p>
        <strong>Статус:</strong> {statusText[status] || "Неизвестный статус"}
      </p>
      <p>
        <strong>Дата формирования:</strong>{" "}
        {dateFormation ? new Date(dateFormation).toLocaleString() : "Не указана"}
      </p>
    </div>
  );
};

export default CardOperat;
