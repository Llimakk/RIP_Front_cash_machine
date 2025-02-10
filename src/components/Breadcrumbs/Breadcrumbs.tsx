import {Breadcrumb, BreadcrumbItem} from "reactstrap";
import {Link, useLocation} from "react-router-dom";
import {T_Bill} from "modules/types.ts";
import "./styles.css"

type Props = {
    selectedBill: T_Bill | null
}

const Breadcrumbs = ({selectedBill}:Props) => {

    const location = useLocation()

    return (
        <Breadcrumb className="fs-5">
			{location.pathname == "/" &&
				<BreadcrumbItem>
					<Link to="/">
						Главная
					</Link>
				</BreadcrumbItem>
			}
			{location.pathname.includes("/bills") &&
                <BreadcrumbItem active>
                    <Link to="/bills">
						Купюры
                    </Link>
                </BreadcrumbItem>
			}
            {selectedBill &&
                <BreadcrumbItem active>
                    <Link to={location.pathname}>
                        { selectedBill.name }
                    </Link>
                </BreadcrumbItem>
            }
			<BreadcrumbItem />
        </Breadcrumb>
    );
};

export default Breadcrumbs