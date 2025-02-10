import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Button, Col, Container, Row} from "reactstrap";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {
    deleteBill,
    fetchBill,
    removeSelectedBill,
    updateBill,
    updateBillImage
} from "store/slices/billsSlice.ts";
import UploadButton from "components/UploadButton/UploadButton.tsx";
import CustomInput from "components/CustomInput/CustomInput.tsx";
import CustomTextarea from "components/CustomTextarea/CustomTextarea.tsx";

const BillEditPage = () => {
    const { id } = useParams<{id: string}>();

    const dispatch = useAppDispatch()

    const {bill} = useAppSelector((state) => state.bills)

    const {is_superuser} = useAppSelector((state) => state.user)

    const [name, setName] = useState<string>(bill?.name)

    const [description, setDescription] = useState<string>(bill?.description)

    const [year, setYear] = useState<number>(bill?.year)

    useEffect(() => {
        if (!is_superuser) {
            navigate("/403/")
        }
    }, [is_superuser]);

    const navigate = useNavigate()

    const [imgFile, setImgFile] = useState<File>()
    const [imgURL, setImgURL] = useState<string>(bill?.image)

    const handleFileChange = (e) => {
        if (e.target.files) {
            const file = e.target?.files[0]
            setImgFile(file)
            setImgURL(URL.createObjectURL(file))
        }
    }

    const saveBill = async() => {
        if (imgFile) {
            const form_data = new FormData()
            form_data.append('image', imgFile, imgFile.name)
            await dispatch(updateBillImage({
                bill_id: bill.id,
                data: form_data
            }))
        }

        const data = {
            name,
            description,
            year
        }

        await dispatch(updateBill({
            bill_id: bill.id,
            data
        }))

        navigate("/bills-table/")
    }

    useEffect(() => {
        dispatch(fetchBill(id))
        return () => dispatch(removeSelectedBill())
    }, []);

    useEffect(() => {
        setName(bill?.name)
        setDescription(bill?.description)
        setYear(bill?.year)
        setImgURL(bill?.image)
    }, [bill]);

    const handleDeleteBill = async () => {
        await dispatch(deleteBill(id))
        navigate("/bills-table/")
    }

    if (!bill) {
        return (
            <div>

            </div>
        )
    }

    return (
        <Container style={{marginTop:"5%"}}>
            <Row>
                <Col md={6}>
                    <img src={imgURL} alt="" className="w-100"/>
                    <Container className="mt-3 d-flex justify-content-center">
                        <UploadButton handleFileChange={handleFileChange} />
                    </Container>
                </Col>
                <Col md={6}>
                    <CustomInput label="Название" placeholder="Введите название" value={name} setValue={setName}/>
                    <CustomInput type="number" label="Год выпуска" placeholder="Введите год выпуска" value={year} setValue={setYear}/>
                    <CustomTextarea label="Описание" placeholder="Введите описание" value={description} setValue={setDescription}/>
                    <Col className="d-flex justify-content-center gap-5 mt-5">
                        <Button color="success" className="fs-4" onClick={saveBill}>Сохранить</Button>
                        {/* <Button color="danger" className="fs-4" onClick={handleDeleteBill}>Удалить</Button> */}
                    </Col>
                </Col>
            </Row>
        </Container>
    );
};

export default BillEditPage