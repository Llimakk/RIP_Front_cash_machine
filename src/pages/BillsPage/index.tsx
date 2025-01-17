import React, { FormEvent, useEffect, useState } from "react";
import { Button, Col, Container, Form, Input, Row } from "reactstrap";
import { T_Bill } from "../../modules/types";
import BillCard from "../../components/BillCard";
import { BillMocks } from "../../modules/mocks";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "src/store";
import { setBillName } from "src/slices/searchSlice";
import { useNavigate } from "react-router-dom";
import cashhand from "../../assets/cashhand.png";
import "./index.css";

type BillsPageProps = {
  bills: T_Bill[];
  setBills: React.Dispatch<React.SetStateAction<T_Bill[]>>;
  isMock: boolean;
  setIsMock: React.Dispatch<React.SetStateAction<boolean>>;
};

const BillsPage = ({ bills, setBills, isMock, setIsMock }: BillsPageProps) => {
  const billName = useSelector((state: RootState) => state.search.billName);
  const dispatch = useDispatch();
  const [counter, setCounter] = useState(0);
  const [currentOperatId, setCurrentOperatId] = useState<number | null>(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await fetch(
        `/api/bills/search/?bill_name=${billName.toLowerCase()}`,
        { signal: AbortSignal.timeout(1000) }
      );
      const data = await response.json();
      setBills(data.bills);
      setCounter(data.bills_count || 0); // Устанавливаем начальный счетчик
      setCurrentOperatId(data.draft_operat_id || null); // Устанавливаем текущую операцию
      setIsMock(false);
    } catch {
      createMocks();
    }
  };

  const createMocks = () => {
    setIsMock(true);
    setBills(
      BillMocks.filter((bill) =>
        bill.name.toLowerCase().includes(billName.toLowerCase())
      )
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isMock) {
      createMocks();
    } else {
      await fetchData();
    }
  };

  const handleAddToOperat = async (billId: number) => {
    try {
      const response = await fetch("/api/operats/add/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bill_id: billId }),
      });
  
      if (!response.ok) {
        throw new Error(`Ошибка сервера: ${response.status}`);
      }
  
      // Парсим ответ метода добавления
      const addData = await response.json();
      if (addData.operat_id) {
        // Обновляем сразу счетчик и ID операции
        setCurrentOperatId(addData.operat_id);
        setCounter((prev) => prev + 1);
      }
  
      // Дополнительно обновляем данные через `fetchData`
      await fetchData();
    } catch (error) {
      console.error("Ошибка при добавлении купюры в операцию:", error);
    }
  };

  const handleNavigateToOperat = () => {
    if (currentOperatId) {
      navigate(`/operats/${currentOperatId}`);
    } else {
      alert("Операция не создана! Добавьте хотя бы одну купюру.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container className="container-custom">
      <Row className="mb-5">
        <div className="contt">
          <Form
            onSubmit={handleSubmit}
            className="search-form d-flex align-items-center justify-content-between flex-wrap"
          >
            <Input
              value={billName}
              onChange={(e) => dispatch(setBillName(e.target.value))}
              placeholder="Поиск..."
              className="me-2 search-input"
            />
            <Button color="primary" className="search-button">
              Поиск
            </Button>
            <div
              className="basket-container position-relative"
              onClick={handleNavigateToOperat}
              style={{ cursor: "pointer" }}
            >
              <img src={cashhand} alt="Корзина" className="basket" />
              <span className="position-absolute basket-counter">
                {counter}
              </span>
            </div>
          </Form>
        </div>
      </Row>
      <Row className="bill-grid gx-3 gy-4">
        {bills?.map((bill) => (
          <Col
            key={bill.id}
            xs="12"
            sm="6"
            md="4"
            lg="3"
            className="bill-card"
          >
            <BillCard
              bill={bill}
              isMock={isMock}
              onAdd={() => handleAddToOperat(bill.id)}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default BillsPage;
