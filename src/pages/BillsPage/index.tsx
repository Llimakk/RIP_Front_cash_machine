import { Button, Col, Container, Form, Input, Row } from "reactstrap";
import { T_Bill } from "../../modules/types";
import BillCard from "../../components/BillCard";
import { BillMocks } from "../../modules/mocks";
import { FormEvent, useEffect,useState } from "react";
import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "src/store";
import { setBillName } from "src/slices/searchSlice";
import "./index.css";
// import { api } from "src/api";
import cashhand from "../../assets/cashhand.png"

type BillsPageProps = {
    bills: T_Bill[],
    setBills: React.Dispatch<React.SetStateAction<T_Bill[]>>
    isMock: boolean,
    setIsMock: React.Dispatch<React.SetStateAction<boolean>>
}

const BillsPage = ({ bills, setBills, isMock, setIsMock }: BillsPageProps) => {
    const billName = useSelector((state: RootState) => state.search.billName);
    const dispatch = useDispatch();
    const [counter, setCounter] = useState(0);

    const fetchData = async () => {
        try {
            const response = await fetch(`/api/bills/search/?bill_name=${billName.toLowerCase()}`, { signal: AbortSignal.timeout(1000) });
            const data = await response.json();
            setBills(data.bills);
            setIsMock(false);
        } catch {
            createMocks();
        }
    }
    
    const incrementCounter = () => {
        setCounter(prev => prev + 1);
      };

    const createMocks = () => {
        setIsMock(true);
        setBills(BillMocks.filter(bill => bill.name.toLowerCase().includes(billName.toLowerCase())));
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (isMock) {
            createMocks();
        } else {
            await fetchData();
        }
    }

    useEffect(() => {
        fetchData();
    }, []);
    
    return (
        <Container className="container-custom">
            <Row className="mb-5"> {/* Центрируем ряд */}
                <div className="contt">
                    {/* Форма поиска */}
                    <Form onSubmit={handleSubmit} className="search-form d-flex align-items-center justify-content-between flex-wrap">
                        <Input
                            value={billName}
                            onChange={(e) => dispatch(setBillName(e.target.value))}
                            placeholder="Поиск..."
                            className="me-2 search-input"
                        />
                        <Button color="primary" className="search-button">
                            Поиск
                        </Button>
                        <div className="basket-container position-relative">
                            <img src={cashhand} alt="Корзина" className="basket"/>
                            <span className="position-absolute basket-counter">{counter}</span>
                        </div>
                    </Form>

                    {/* Контейнер корзины с красным счётчиком */}
                    
                </div>
            </Row>
            <Row className="bill-grid gx-3 gy-4">
                {bills?.map((bill) => (
                    <Col key={bill.id} xs="12" sm="6" md="4" lg="3" className="bill-card">
                        <BillCard bill={bill} isMock={isMock} onAdd={incrementCounter} />
                    </Col>
                 ))}
            </Row>
        </Container>
    );   
};

export default BillsPage;