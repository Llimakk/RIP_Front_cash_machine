import * as React from 'react';
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import { T_Bill } from '../../modules/types';
import {Container} from "reactstrap";
import { BillMocks } from '../../modules/mocks';
import mockImage from "../../assets/mock.png";
import './index.css';

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
        setSelectedBill(BillMocks.find(Bill => Bill?.id == parseInt(id as string)) as T_Bill)
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
            <div className="bill-container">
                {/* Левая сторона: Изображение и дата */}
                <div className="bill-image-container">
                    <img
                        alt=""
                        src={isMock ? mockImage as string : selectedBill.image}
                        className="bill-image"
                    />
                    <p className="bill-date">Дата ввода в обращение: {selectedBill.year}.</p>
                </div>

                {/* Правая сторона: Заголовок и описание */}
                <div className="bill-details">
                    <h1>{selectedBill.name}</h1>
                    <p><strong>Описание:</strong></p>
                    <ul>
                        {selectedBill.description.split("t").map((desc, index) => (
                            <li key={index}>{desc}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </Container>
    );
    
};

export default BillPage