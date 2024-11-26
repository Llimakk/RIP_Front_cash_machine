import * as React from 'react';
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import { T_Bill } from '../../modules/types';
import {Col, Container, Row} from "reactstrap";
import { BillMocks } from '../../modules/mocks';
import mockImage from "../../assets/mock.png";
import './index.css'

type BillPageProps = {
    selectedBill: T_Bill | null,
    setSelectedBill: React.Dispatch<React.SetStateAction<T_Bill | null>>,
    isMock: boolean,
    setIsMock: React.Dispatch<React.SetStateAction<boolean>>
}

const BillPage = ({selectedBill, setSelectedBill, isMock, setIsMock}: BillPageProps) => {
    const { id } = useParams<{id: string}>();

    const fetchData = async () => {
        try {
            const response = await fetch(`/api/bills/${id}`,{ signal: AbortSignal.timeout(1000) })
            const data = await response.json()
            setSelectedBill(data)
        } catch {
            createMock()
        }
    }

    const createMock = () => {
        setIsMock(true)
        setSelectedBill(BillMocks.find(Bill => Bill?.bill_id == parseInt(id as string)) as T_Bill)
    }

    useEffect(() => {
        if (!isMock) {
            fetchData()
        } else {
            createMock()
        }

        return () => setSelectedBill(null)
    }, []);

    if (!selectedBill) {
        return (
            <div>

            </div>
        )
    }

    return (
        <Container>
            <Row>
                <Col md="6">
                    <img
                        alt=""
                        src={isMock ? mockImage as string : selectedBill.image}
                        className="w-100"
                    />
                </Col>
                <Col md="6">
                    <h1 className="mb-3">{selectedBill.name}</h1>
                    <p className="fs-5">Описание:</p>
                    {selectedBill.description.split("t").map((desc, index) => (
                    <li key={index} className="fs-5">{desc}</li>
                    ))}
                    <p className="fs-5">Дата ввода в обращение: {selectedBill.year}.</p>
                </Col>
            </Row>
        </Container>
    );
};

export default BillPage