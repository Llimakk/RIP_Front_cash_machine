import Header from "components/Header/Header.tsx";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs.tsx";
import BillPage from "pages/BillPage/BillPage.tsx";
import BillsListPage from "pages/BillsListPage/BillsListPage.tsx";
import {Route, Routes} from "react-router-dom";
import {Container, Row} from "reactstrap";
import HomePage from "pages/HomePage/HomePage.tsx";
import {useState} from "react";
import {T_Bill} from "modules/types.ts";

function App() {

    const [bills, setBills] = useState<T_Bill[]>([])

    const [selectedBill, setSelectedBill] = useState<T_Bill | null>(null)

    const [isMock, setIsMock] = useState(false);

    return (
        <>
            <Header/>
            <Container className="pt-4">
                {/* <Row className="mb-3">
                    <Breadcrumbs selectedBill={selectedBill}/>
                </Row> */}
                <Row>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/bills/" element={<BillsListPage bills={bills} setBills={setBills} isMock={isMock} setIsMock={setIsMock} />} />
                        <Route path="/bills/:id" element={<BillPage selectedBill={selectedBill} setSelectedBill={setSelectedBill} isMock={isMock} setIsMock={setIsMock} />} />
                    </Routes>
                </Row>
            </Container>
        </>
    )
}

export default App
