import {Button, Col, Container, Form, Input, Row} from "reactstrap";
import BillCard from "components/BillCard/BillCard.tsx";
import {ChangeEvent, FormEvent, useEffect} from "react";
import * as React from "react";
import {RootState, useAppSelector} from "src/store/store.ts";
import {updateBillName} from "src/store/slices/billsSlice.ts";
import {T_Bill} from "modules/types.ts";
import {BillMocks} from "modules/mocks.ts";
import {useDispatch} from "react-redux";
import "./styles.css"

type Props = {
    bills: T_Bill[],
    setBills: React.Dispatch<React.SetStateAction<T_Bill[]>>
    isMock: boolean,
    setIsMock: React.Dispatch<React.SetStateAction<boolean>>
}

const BillsListPage = ({bills, setBills, isMock, setIsMock}:Props) => {

    const dispatch = useDispatch()

    const {bill_name} = useAppSelector((state:RootState) => state.bills)

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        dispatch(updateBillName(e.target.value))
    }

    const createMocks = () => {
        setIsMock(true)
        setBills(BillMocks.filter(bill => bill.name.toLowerCase().includes(bill_name.toLowerCase())))
    }

    const handleSubmit = async (e:FormEvent) => {
        e.preventDefault()
        await fetchBills()
    }

    const fetchBills = async () => {
        try {
            const env = await import.meta.env;
            const response = await fetch(`${env.VITE_API_URL}/api/bills/?bill_name=${bill_name.toLowerCase()}`)
            const data = await response.json()
            setBills(data.bills)
            setIsMock(false)
        } catch {
            createMocks()
        }
    }

    useEffect(() => {
        fetchBills()
    }, []);

    return (
        <Container>
            <Row className="mb-5">
                <Col md="6">
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col xs="8">
                                <Input value={bill_name} onChange={handleChange} placeholder="Поиск..."></Input>
                            </Col>
                            <Col>
                                <Button color="primary" className="w-100 search-btn">Поиск</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
            <Row>
                {bills?.map(bill => (
                    <Col key={bill.id} sm="12" md="6" lg="4">
                        <BillCard bill={bill} isMock={isMock} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default BillsListPage