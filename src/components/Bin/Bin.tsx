import {Link} from "react-router-dom";
import {Badge, Button} from "reactstrap";
import cashhand from "../../assets/cashhand.png";

type Props = {
    isActive: boolean,
    draft_operation_id: string,
    bills_count: number
}

const Bin = ({isActive, draft_operation_id, bills_count}:Props) => {

    if (!isActive) {
        return <Button color={"secondary"} className="bin-wrapper" disabled>Корзина</Button>
    }

    return (
        <Link to={`/operations/${draft_operation_id}/`} className="bin-wrapper">
            <Button color={"ffff"} >
                <img src={cashhand} alt="Корзина" className="basket" />
                <span style={{borderRadius:'50%', backgroundColor:"red", width:"18px", height:"18px",textAlign:"center",lineHeight:"18px"}} className="position-absolute basket-counter">
                    {bills_count}
                </span>
            </Button>
        </Link>
    )
}

export default Bin