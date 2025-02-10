import {useAppSelector} from "store/store.ts";
import {Card, Col, Row} from "reactstrap";
import OperationCard from "components/OperationCard/OperationCard.tsx";
import {T_Operation} from "modules/types.ts";
import "./OperationTable.css"

type Props = {
    operations:T_Operation[]
}

const OperationsTable = ({operations}:Props) => {

    const {is_superuser} = useAppSelector((state) => state.user)

    return (
        <div className="mb-5">
            <div className="mb-2" style={{fontWeight: "bold"}}>
                <Card style={{padding: "10px"}}>
                    <Row>
                        <Col md={1}>
                            №
                        </Col>
                        <Col md={1}>
                            Статус
                        </Col>
                        <Col md={1}>
                            Результат
                        </Col>
                        <Col>
                            Дата создания
                        </Col>
                        <Col>
                            Дата формирования
                        </Col>
                        <Col>
                            Дата завершения
                        </Col>
                        <Col>
                            QR-код
                        </Col>
                        {!is_superuser &&
                            <Col>
                                Действие
                            </Col>
                        }
                        {is_superuser &&
                            <>
                                <Col>
                                    Пользователь
                                </Col>
                                <Col>
                                    Действие
                                </Col>
                                <Col>
                                    Действие
                                </Col>
                            </>
                        }
                    </Row>
                </Card>
            </div>
            <div className="d-flex flex-column gap-2">
                {operations.map((operation, index) => (
                    <OperationCard operation={operation} index={index} key={index}/>
                ))}
            </div>
        </div>
    )
};

export default OperationsTable