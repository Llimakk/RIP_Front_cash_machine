import { Button, Card, CardBody, CardImg, CardTitle } from "reactstrap";
import mockImage from "../../assets/mock.png";
import { Link } from "react-router-dom";
import { T_Bill } from "../../modules/types";
import './index.css';

interface BillCardProps {
    bill: T_Bill;
    isMock: boolean;
}

const BillCard = ({ bill, isMock }: BillCardProps) => {
    return (
        <div className="bills">
            {/* Ссылка с изображением */}
            <Link to={`/bills/${bill.id}`}>
                <img
                    src={isMock ? mockImage as string : bill.image}
                    className="image-bills"
                    alt={bill.name || "Купюра"}
                />
            </Link>
            {/* Название купюры */}
            <p className="bill-name">{bill.name}</p>
        </div>
    );
};

export default BillCard;
