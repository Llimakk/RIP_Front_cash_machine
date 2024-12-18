import { useState } from "react";
import Header from "./components/Header";
// import Breadcrumbs from "./components/Breadcrumbs";
import BillPage from "./pages/BillPage";
import BillsPage from "./pages/BillsPage";
import { Route, Routes } from "react-router-dom";
import { T_Bill } from "./modules/types";
import { Container, Row } from "reactstrap";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage/login";
import RegistrationPage from "./pages/RegistrationPage/registration";
import ProfilePage from "./pages/ProfilePage/profile";
import "./App.css"; 

function App() {
    const [bills, setBills] = useState<T_Bill[]>([]);
    const [currentBill, setSelectedBill] = useState<T_Bill | null>(null);
    const [isMock, setIsMock] = useState(false);

    return (
        <div className="wrapper">
            <Header />
            <Container className="pt-1 pe-2 pb-0">
                {/* <Row className="mb-3">
                    <Breadcrumbs currentBill={currentBill} />
                </Row> */}
                <Row>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/bills/" element={<BillsPage bills={bills} setBills={setBills} isMock={isMock} setIsMock={setIsMock}/>} />
                        <Route path="/bills/:id" element={<BillPage selectedBill={currentBill} setSelectedBill={setSelectedBill} isMock={isMock} setIsMock={setIsMock}/>} />
                        <Route path="/register" element={<RegistrationPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        {/* <Route path="/operats" element={<OperatsPage />} /> */}
                        {/* 
                        
                        <Route path="/users/:userId/update/" element={<EditUserPage />} />
                        
                        <Route path="/user_operats" element={<OperatsPage />} />
                         */}
                    </Routes>
                </Row>
            </Container>
        </div>
    );
}

export default App;