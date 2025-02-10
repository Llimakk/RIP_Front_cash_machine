import {Button, Card, Col, Row} from "reactstrap";
import {E_OperationStatus, T_Operation} from "modules/types.ts";
import {formatDate} from "utils/utils.ts";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {acceptOperation, fetchOperations, rejectOperation} from "store/slices/operationsSlice.ts";
import qricon from "../../assets/qricon.png";
import disabledicon from "../../assets/disabledicon.png";
import './OperationCard.css'

type Props = {
    operation: T_Operation
    index: number
}

const OperationCard = ({operation, index}:Props) => {

    const {is_superuser} = useAppSelector((state) => state.user)

    const dispatch = useAppDispatch()

    const handleAcceptOperation = async (operation_id) => {
        await dispatch(acceptOperation(operation_id))
        await dispatch(fetchOperations())
    }

    const handleRejectOperation = async (operation_id) => {
        await dispatch(rejectOperation(operation_id))
        await dispatch(fetchOperations())
    }

    const navigate = useNavigate()

    const openOperationPage = () => {
        navigate(`/operations/${operation.id}`)
    }

    const STATUSES = {
        1: "Введен",
        2: "В работе",
        3: "Завершен",
        4: "Отменён",
        5: "Удалён"
    }

    return (
        <Card style={{padding: "10px"}}>
            <Row>
                <Col md={1}>
                    {index + 1}
                </Col>
                <Col md={1}>
                    {STATUSES[operation.status]}
                </Col>
                <Col md={1}>
                    {operation.success ? "Успех" : operation.success == false ? "Неудача" : ""}
                </Col>
                <Col>
                    {formatDate(operation.date_created)}
                </Col>
                <Col>
                    {formatDate(operation.date_formation)}
                </Col>
                <Col>
                    {formatDate(operation.date_complete)}
                </Col>
                <Col>
                    <div className="operat-icon">
                        {operation.status === 3 ? (
                        <div className="qr-hover-wrapper">
                            <img className="status-icon" src={qricon} alt="QR Icon" />
                            <div className="qr-hover">
                            {operation.qr && <img className="qr-code" src={`data:image/png;base64,${operation.qr}`} alt="QR Code" />}
                            <p>Адрес: {operation.address}</p>
                            </div>
                        </div>
                        ) : (
                        <img className="status-icon disabled-icon" src={disabledicon} alt="Disabled Icon" />
                        )}
                    </div>
                </Col>
                {!is_superuser &&
                    <Col>
                        <Button color="primary" onClick={openOperationPage}>Открыть</Button>
                    </Col>
                }
                {is_superuser &&
                    <>
                        <Col>
                            {operation.owner}
                        </Col>
                        <Col>
                            {operation.status == E_OperationStatus.InWork && <Button color="primary" onClick={() => handleAcceptOperation(operation.id)}>Принять</Button>}
                        </Col>
                        <Col>
                            {operation.status == E_OperationStatus.InWork && <Button color="danger" onClick={() => handleRejectOperation(operation.id)}>Отклонить</Button>}
                        </Col>
                    </>
                }
            </Row>
        </Card>
    )
}

export default OperationCard