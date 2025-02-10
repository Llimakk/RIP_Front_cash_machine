import {Button, Col, Container, Form, Input, Row} from "reactstrap";
import {ChangeEvent, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {fetchBills, updateBillName} from "store/slices/billsSlice.ts";
import BillCard from "components/BillCard/BillCard.tsx";
import Bin from "components/Bin/Bin.tsx";

const BillsListPage = () => {

    const dispatch = useAppDispatch()

    const {bills, bill_name} = useAppSelector((state) => state.bills)

    const {is_authenticated, is_superuser} = useAppSelector((state) => state.user)

    const {draft_operation_id, bills_count} = useAppSelector((state) => state.operations)

    const hasDraft = draft_operation_id != null

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

    return (
        <Container>
            <Row>
                <Col md="6">
                    <Form onSubmit={handleSubmit}>
                        <Row style={{marginLeft:'350px'}}>
                            <Col xs="8" className="search-str">
                                <Input value={bill_name} onChange={handleChange} placeholder="Поиск..."></Input>
                            </Col>
                            <Col>
                                <Button color="primary" className="w-100 search-btn">Поиск</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
                {is_authenticated && !is_superuser &&
                    <Col className="d-flex flex-row justify-content-end" md="6">
                        <Bin isActive={hasDraft} draft_operation_id={draft_operation_id} bills_count={bills_count} />
                    </Col>
                }
            </Row>
            <Row className="mt-5 d-flex">
                {bills?.map(bill => (
                    <Col key={bill.id} className="mb-5 d-flex justify-content-center" sm="12" md="6" lg="4">
                        <BillCard bill={bill} showAddBtn={is_authenticated} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default BillsListPage