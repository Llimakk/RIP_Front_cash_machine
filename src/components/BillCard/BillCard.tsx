import {Button, Card, CardBody, CardText, CardTitle, Col, Row} from "reactstrap";
import {Link, useLocation} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {T_Bill} from "modules/types.ts";
import {
    removeBillFromDraftOperation,
    updateBillValue
} from "store/slices/operationsSlice.ts";
import pick from "../../assets/pick.png";
import './BillCard.css'
import {useEffect, useState} from "react";
import CustomInput from "components/CustomInput/CustomInput.tsx";
import {addBillToOperation, fetchBills} from "store/slices/billsSlice.ts";

type Props = {
    bill: T_Bill,
    showAddBtn?: boolean,
    showRemoveBtn?: boolean,
    editMM?: boolean
}

const BillCard = ({bill, showAddBtn=false, showRemoveBtn=false, editMM=false}:Props) => {

    const dispatch = useAppDispatch()

    const {is_superuser} = useAppSelector((state) => state.user)

    const {save_mm} = useAppSelector(state => state.operations)

    const [local_count, setLocal_count] = useState(bill.count)

    const location = useLocation()

    const isOperationPage = location.pathname.includes("operations")

    const handeAddToDraftOperation = async () => {
        await dispatch(addBillToOperation(bill.id))
        await dispatch(fetchBills())
    }

    const handleRemoveFromDraftOperation = async () => {
        await dispatch(removeBillFromDraftOperation(bill.id))
    }

    useEffect(() => {
        save_mm && updateValue()
    }, [save_mm]);

    const updateValue = async () => {
        dispatch(updateBillValue({
            bill_id: bill.id,
            count: local_count
        }))
    }

    if (isOperationPage) {
        return (
            <div className="bill-wrapper">
                <Card key={bill.id} className="bill-card">
                    <div className="bill-content">
                        <img alt="" src={bill.image} className="bill-image" />
                        <span className="bill-name">{bill.name}</span> 
                        <CustomInput 
                            label="Количество" 
                            type="number" 
                            value={local_count} 
                            setValue={setLocal_count} 
                            disabled={!editMM || is_superuser} 
                            className="bill-input"
                            min={1}
                        />
                    </div>
                </Card>

                {/* Кнопка удаления справа от карточки */}
                {showRemoveBtn && (
                    <Button 
                        color="danger" 
                        onClick={handleRemoveFromDraftOperation} 
                        className="bill-remove-btn"
                    >
                        Удалить
                    </Button>
                )}
            </div>
        );
    }

    return (
        <Card key={bill.id}>
            <Link to={`/bills/${bill.id}`} style={{ marginTop: '5px' }}>
                <img
                    alt={bill.name || "Купюра"}
                    src={bill.image}
                    className="image-bills-2"
                />
            </Link>
            <CardBody className="card-di">
                <CardTitle className="bill-name-2">
                    {bill.name}
                </CardTitle>
                <Col className="d-flex justify-content-between">
                    {/* <Link to={`/bills/${bill.id}`}>
                        <Button color="primary" type="button">
                            Открыть
                        </Button>
                    </Link> */}
                    {!is_superuser && showAddBtn &&
                        <Button color={"ffff"} className="add" onClick={handeAddToDraftOperation} style={{ marginLeft: '30px' }}>
                            <img src={pick} alt="Добавить" className="add-pick" />
                        </Button>
                    }
                </Col>
            </CardBody>
        </Card>
    );
};

export default BillCard