import {Route, Routes} from "react-router-dom";
import {Container, Row} from "reactstrap";
import "./styles.css"
import HomePage from "pages/HomePage/HomePage.tsx";
import LoginPage from "pages/LoginPage/LoginPage.tsx";
import RegisterPage from "pages/RegisterPage/RegisterPage.tsx";
import BillsListPage from "pages/BillsListPage/BillsListPage.tsx";
import BillPage from "pages/BillPage/BillPage.tsx";
import OperationsPage from "pages/OperationsPage/OperationsPage.tsx";
import OperationPage from "pages/OperationPage/OperationPage.tsx";
import ProfilePage from "pages/ProfilePage/ProfilePage.tsx";
import AccessDeniedPage from "pages/AccessDeniedPage/AccessDeniedPage.tsx";
import NotFoundPage from "pages/NotFoundPage/NotFoundPage.tsx";
import Header from "components/Header/Header.tsx";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs.tsx";
import BillsTablePage from "pages/BillsTablePage/BillsTablePage.tsx";
import BillEditPage from "pages/BillEditPage/BillEditPage.tsx";
import BillAddPage from "pages/BillAddPage/BillAddPage.tsx";

function App() {
    return (
        <div>
            <Header />
            <Container className="pt-4">
                {/* <Row className="mb-3">
                    <Breadcrumbs />
                </Row> */}
                <Row>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login/" element={<LoginPage />} />
                        <Route path="/register/" element={<RegisterPage />} />
                        <Route path="/bills/" element={<BillsListPage />} />
                        <Route path="/bills-table/" element={<BillsTablePage />} />
                        <Route path="/bills/:id/" element={<BillPage />} />
                        <Route path="/bills/:id/edit" element={<BillEditPage />} />
                        <Route path="/bills/add" element={<BillAddPage />} />
                        <Route path="/operations/" element={<OperationsPage />} />
                        <Route path="/operations/:id/" element={<OperationPage />} />
                        <Route path="/profile/" element={<ProfilePage />} />
                        <Route path="/403/" element={<AccessDeniedPage />} />
                        <Route path="/404/" element={<NotFoundPage />} />
                        <Route path='*' element={<NotFoundPage />} />
                    </Routes>
                </Row>
            </Container>
        </div>
    )
}

export default App
