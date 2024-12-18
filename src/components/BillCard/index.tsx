import mockImage from "../../assets/mock.png";
import { Link } from "react-router-dom";
import { T_Bill } from "../../modules/types";
import pick from "../../assets/pick.png";
import './index.css';

interface BillCardProps {
    bill: T_Bill;
    isMock: boolean;
    onAdd: () => void;
}

const BillCard = ({ bill, isMock, onAdd }: BillCardProps) => {
  return (
    <div className="bills-2">
        {/* Ссылка с изображением */}
        <Link to={`/bills/${bill.id}`}>
            <img
                src={isMock ? mockImage as string : bill.image}
                className="image-bills-2"
                alt={bill.name || "Купюра"}
            />
        </Link>
        <div className="card-di">
            <p className="bill-name-2">{bill.name}</p>
            <div className="add" onClick={onAdd} style={{ cursor: 'pointer' }}>
                <img src={pick} alt="Добавить" className="add-pick" />
            </div>
        </div>
    </div>
  );
};

export default BillCard;