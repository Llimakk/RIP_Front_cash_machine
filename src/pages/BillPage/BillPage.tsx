import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {Col, Container, Row} from "reactstrap";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {fetchBill, removeSelectedBill} from "store/slices/billsSlice.ts";

const BillPage = () => {
    const { id } = useParams<{id: string}>();

    const dispatch = useAppDispatch()

    const {bill} = useAppSelector((state) => state.bills)

    useEffect(() => {
        dispatch(fetchBill(id))
        return () => dispatch(removeSelectedBill())
    }, []);

    if (!bill) {
        return (
            <div>

            </div>
        )
    }

    return (
        <Container style={{marginTop: '60px'}}>
            <Row>
                <Col md="6">
                    <img
                        alt=""
                        src={bill.image}
                        className="w-100"
                    />
                    <p className="fs-5" style={{marginTop:'25px', fontSize: '1.2rem',color: '#555',}}>Год выпуска: {bill.year} г</p>
                </Col>
                <Col md="6">
                    <h1 className="mb-3">{bill.name}</h1>
                    <p className="fs-5">Описание: {bill.description}</p>

                </Col>
            </Row>
        </Container>
    );
};

export default BillPage