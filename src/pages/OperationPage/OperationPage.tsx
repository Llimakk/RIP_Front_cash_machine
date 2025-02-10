import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {
    deleteDraftOperation,
    fetchOperation,
    removeOperation, sendDraftOperation,
    triggerUpdateMM, updateOperation
} from "store/slices/operationsSlice.ts";
import {Button, Col, Form, Row} from "reactstrap";
import {E_OperationStatus, T_Bill} from "modules/types.ts";
import BillCard from "components/BillCard/BillCard.tsx";
import CustomInput from "components/CustomInput/CustomInput.tsx";
import './OperationPage.css'
import CustomTextarea from "components/CustomTextarea/CustomTextarea.tsx";

const OperationPage = () => {
    const { id } = useParams<{id: string}>();

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const {is_authenticated, is_superuser} = useAppSelector((state) => state.user)

    const operation = useAppSelector((state) => state.operations.operation)

    const [address, setAddress] = useState<string>(operation?.address)

    const [success, setSuccess] = useState<string>(operation?.success)

    useEffect(() => {
        if (!is_authenticated) {
            navigate("/403/")
        }
    }, [is_authenticated]);

    useEffect(() => {
        is_authenticated && dispatch(fetchOperation(id))
        return () => dispatch(removeOperation())
    }, []);

    useEffect(() => {
        setAddress(operation?.address)
        setSuccess(operation?.success)
    }, [operation]);

    const sendOperation = async (e) => {
        e.preventDefault()

        await saveOperation()

        await dispatch(sendDraftOperation())

        navigate("/operations/")
    }

    const saveOperation = async (e?) => {
        e?.preventDefault()

        const data = {
            address
        }

        await dispatch(updateOperation(data))
        await dispatch(triggerUpdateMM())
        await dispatch(triggerUpdateMM())
    }

    const deleteOperation = async () => {
        await dispatch(deleteDraftOperation())
        navigate("/bills/")
    }

    if (!operation) {
        return (
            <></>
        )
    }

    const isDraft = operation.status == E_OperationStatus.Draft
    const isCompleted = operation.status == E_OperationStatus.Completed

    return (
        <Form onSubmit={sendOperation} className="pb-5">
            <h2 className="mb-5">{isDraft ? "Черновая операция" : `Операция №${id}` }</h2>
            <Row className="mb-5 fs-5 w-25">
                <CustomTextarea label="Укажите адресс" placeholder="Введите адрес" value={address} setValue={setAddress} disabled={!isDraft || is_superuser}/>
                {isCompleted && <CustomInput label="Результат" value={success ? "Успех" : "Неудача"} disabled={true}/>}
            </Row>
            <Row>
                {operation.bills.length > 0 ? operation.bills.map((bill:T_Bill) => (
                    <Row key={bill.id} className="d-flex justify-content-center mb-5">
                        <BillCard bill={bill} showRemoveBtn={isDraft} editMM={isDraft}/>
                    </Row>
                )) :
                    <h3 className="text-center">Купюры не добавлены</h3>
                }
            </Row>
            {isDraft && !is_superuser &&
                <Row className="mt-5">
                    <Col className="d-flex gap-5 justify-content-center">
                        <Button color="success" className="fs-4" onClick={saveOperation}>Сохранить</Button>
                        <Button color="primary" className="fs-4" type="submit">Сформировать</Button>
                        <Button color="danger" className="fs-4" onClick={deleteOperation}>Удалить</Button>
                    </Col>
                </Row>
            }
        </Form>
    );
};

export default OperationPage