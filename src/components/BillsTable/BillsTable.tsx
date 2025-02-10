import {useNavigate} from "react-router-dom";
import {useMemo} from "react";
import {Button} from "reactstrap";
import {T_Bill} from "modules/types.ts";
import CustomTable from "components/CustomTable/CustomTable.tsx";
import {deleteBill, restoreBill} from "store/slices/billsSlice.ts";
import {RootState, useAppDispatch} from "store/store.ts";
import { useSelector } from "react-redux";

type Props = {
    bills:T_Bill[]
    isDeletedTable?: boolean;
}

const BillsTable = ({bills, isDeletedTable = false}:Props) => {

    const navigate = useNavigate()

    const dispatch = useAppDispatch()

    const deletedBills = useSelector((state: RootState) => state.bills.deleted_bills);

    const handleClick = (bill_id) => {
        navigate(`/bills/${bill_id}`)
    }

    const openBillEditPage = (bill_id) => {
        navigate(`/bills/${bill_id}/edit`)
    }

    const handleDeleteBill = async (bill_id) => {
        dispatch(deleteBill(bill_id))
    }

    const handleRestoreBill = (bill_id) => {
        dispatch(restoreBill(bill_id));
    };

    const columns = useMemo(() => {
        const baseColumns = [
            {
                Header: "№",
                accessor: "id",
            },
            {
                Header: "Фото",
                accessor: "image",
                Cell: ({ value }) => <img src={value} width={100} />,
            },
            {
                Header: "Название",
                accessor: "name",
            },
            {
                Header: "Статус",
                accessor: "status",
            },
            {
                Header: "Год выпуска",
                accessor: "year",
            },
        ];

        if (isDeletedTable) {
            // Если таблица для удаленных купюр, то показываем кнопку "Восстановить"
            return [
                ...baseColumns,
                {
                    Header: "Восстановить",
                    accessor: "restore_button",
                    Cell: ({ cell }) => (
                        <Button color="success" onClick={() => handleRestoreBill(cell.row.values.id)}>
                            Восстановить
                        </Button>
                    ),
                },
            ];
        } else {
            // Для активных купюр — стандартные кнопки
            return [
                ...baseColumns,
                {
                    Header: "Действие",
                    accessor: "edit_button",
                    Cell: ({ cell }) => (
                        <Button color="primary" onClick={() => openBillEditPage(cell.row.values.id)}>
                            Редактировать
                        </Button>
                    ),
                },
                {
                    Header: "Удалить",
                    accessor: "delete_button",
                    Cell: ({ cell }) => (
                        <Button color="danger" onClick={() => handleDeleteBill(cell.row.values.id)}>
                            Удалить
                        </Button>
                    ),
                },
            ];
        }
    }, [isDeletedTable]);

    if (!bills.length) {
        return (
            <></>
        )
    }

    return (
        <CustomTable columns={columns} data={bills} onClick={handleClick} />
    )
};

export default BillsTable