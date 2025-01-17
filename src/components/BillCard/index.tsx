import mockImage from "../../assets/mock.png";
import { Link, useNavigate } from "react-router-dom";
import { T_Bill } from "../../modules/types";
import pick from "../../assets/pick.png";
import { useSelector } from "react-redux";
import { RootState } from "src/store";
import './index.css';

interface BillCardProps {
  bill: T_Bill;
  isMock: boolean;
  onAdd: () => void;
}

const BillCard = ({ bill, isMock, onAdd }: BillCardProps) => {
  const { isAuth } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  const handleAddToOperat = async () => {
    if (!isAuth) {
      navigate("/login"); // Перенаправляем на логин
      return;
    }

    try {
      const response = await fetch(`/api/bills/${bill.id}/add_to_operat/`, {
        method: "POST",
        credentials: "include", // Если сессия хранится в cookie
      });

      if (!response.ok) {
        throw new Error("Не удалось добавить купюру в операцию");
      }

      onAdd(); // Увеличиваем счётчик
    } catch (error) {
      console.error(error);
      alert("Ошибка при добавлении купюры в операцию");
    }
  };

  return (
    <div className="bills-2">
      {/* Ссылка с изображением */}
      <Link to={`/bills/${bill.id}`}>
        <img
          src={isMock ? (mockImage as string) : bill.image}
          className="image-bills-2"
          alt={bill.name || "Купюра"}
        />
      </Link>
      <div className="card-di">
        <p className="bill-name-2">{bill.name}</p>
        <div
          className="add"
          onClick={handleAddToOperat}
          style={{ cursor: "pointer" }}
        >
          <img src={pick} alt="Добавить" className="add-pick" />
        </div>
      </div>
    </div>
  );
};

export default BillCard;
