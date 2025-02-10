import {Button, Col, Container, Form, Input, Row} from "reactstrap";
import {ChangeEvent, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {fetchBills, updateBillName} from "store/slices/billsSlice.ts";
import {Link, useNavigate} from "react-router-dom";
import BillsTable from "components/BillsTable/BillsTable.tsx";

const BillsTablePage = () => {

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const {is_authenticated, is_superuser} = useAppSelector((state) => state.user)

    const {bills, deleted_bills, bill_name} = useAppSelector((state) => state.bills)

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        dispatch(updateBillName(e.target.value))
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(fetchBills())
    }

    useEffect(() => {
        dispatch(fetchBills())
    }, [])

    useEffect(() => {
        if (!is_superuser) {
            navigate("/403/")
        }
    }, [is_authenticated, is_superuser]);

    return (
        <Container>
            <Row className="mb-5">
                <Col md="6">
                    <Form onSubmit={handleSubmit}>
                        <Row style={{marginLeft:'350px'}}>
                            <Col xs="8">
                                <Input value={bill_name} onChange={handleChange} placeholder="Поиск..."></Input>
                            </Col>
                            <Col>
                                <Button color="primary" className="w-100 search-btn">Поиск</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
                <Col className="d-flex flex-row justify-content-end" md="6">
                    <Link to="/bills/add">
                        <Button color="primary">Создать купюру</Button>
                    </Link>
                </Col>
            </Row>
            <Row className="mt-5 d-flex">
                {bills.length > 0 ? <BillsTable bills={bills} fetchBills={fetchBills}/> : <h3 className="text-center mt-5">Купюры не найдены</h3>}
            </Row>
            {/* Таблица удаленных купюр */}
            <Row className="mt-5 d-flex">
                <h3 className="text-center">Удаленные купюры</h3>
                {deleted_bills.length > 0 ? (
                    <BillsTable bills={deleted_bills} isDeletedTable={true} />
                ) : (
                    <h3 className="text-center mt-5">Удаленные купюры не найдены</h3>
                )}
            </Row>
        </Container>
    );
};

export default BillsTablePage