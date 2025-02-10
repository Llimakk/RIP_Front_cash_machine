
import mockImage from "../../assets/mock.png";
import { Link } from "react-router-dom";
import { T_Bill } from "../../modules/types";
import "./BillCard.css"

interface BillCardProps {
    bill: T_Bill;
    isMock: boolean;
}

const BillCard = ({ bill, isMock }: BillCardProps) => {
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
        {/* Название купюры */}
        <p className="bill-name-2">{bill.name}</p>
    </div>
  );
};

export default BillCard;