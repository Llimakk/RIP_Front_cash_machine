import * as React from 'react';
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {CardImg, Col, Container, Row} from "reactstrap";
import mockImage from "assets/mock.png";
import {T_Bill} from "modules/types.ts";
import {BillMocks} from "modules/mocks.ts";

type Props = {
    selectedBill: T_Bill | null,
    setSelectedBill: React.Dispatch<React.SetStateAction<T_Bill | null>>,
    isMock: boolean,
    setIsMock: React.Dispatch<React.SetStateAction<boolean>>
}

const BillPage = ({selectedBill, setSelectedBill, isMock, setIsMock}: Props) => {
    const { id } = useParams<{id: string}>();

    const fetchData = async () => {
        try {
            const env = await import.meta.env;
            const response = await fetch(`${env.VITE_API_URL}/api/bills/${id}`)
            const data = await response.json()
            setSelectedBill(data)
        } catch {
            createMock()
        }
    }

    const createMock = () => {
        setIsMock(true)
        setSelectedBill(BillMocks.find(bill => bill?.id == parseInt(id as string)) as T_Bill)
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
                    <CardImg src={isMock ? mockImage as string : selectedBill.image} className="mb-3" />
                </Col>
                <Col md="6">
                    <h1 className="mb-3">{selectedBill.name}</h1>
                    <p className="fs-5">Описание: {selectedBill.description}</p>
                    <p className="fs-5">Год выпуска: {selectedBill.year} г</p>
                </Col>
            </Row>
        </Container>
    );
};

export default BillPage