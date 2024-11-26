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
        <Card className="card-custom">
            {/* Обертка для изображения */}
            <div className="card-img-wrapper">
                <CardImg 
                    src={isMock ? mockImage : bill.image} 
                    className="card-img-custom" 
                    alt={bill.name || "Купюра"} 
                />
            </div>
            {/* Тело карточки */}
            <CardBody className="d-flex flex-column justify-content-between">
                <CardTitle tag="h5" className="card-title-custom"> 
                    {bill.name} 
                </CardTitle>
                {/* Кнопка для перехода на страницу */}
                <Link to={`/bills/${bill.bill_id}`}>
                    <Button className="button-custom">
                        Подробнее
                    </Button>
                </Link>
            </CardBody>
        </Card>
    );
};

export default BillCard;
