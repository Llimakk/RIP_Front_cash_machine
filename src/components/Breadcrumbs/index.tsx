
import {Breadcrumb, BreadcrumbItem} from "reactstrap";
import {Link, useLocation} from "react-router-dom";
import { T_Bill } from "../../modules/types";
import { isHomePage, isBillPage } from "../../utils/utils";

interface BreadcrumbsProps {
    currentBill: T_Bill | null
}

const Breadcrumbs = ({ currentBill }: BreadcrumbsProps) => {

    const location = useLocation()

    return (
        <Breadcrumb className="fs-5">
			{isHomePage(location.pathname) &&
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
            {isBillPage(location.pathname) &&
                <BreadcrumbItem active>
                    <Link to={location.pathname}>
                        { currentBill?.name }
                    </Link>
                </BreadcrumbItem>
            }
			<BreadcrumbItem />
        </Breadcrumb>
    );
};

export default Breadcrumbs