import { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
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
import OperatsPage from "./pages/OperatsPage/operats"
import MyOperatsPage from "./pages/MyOperats/myoperats"
import "./App.css"; 
import { setSessionId } from "./slices/userSlice";



function App() {
    
    const [bills, setBills] = useState<T_Bill[]>([]);
    const [currentBill, setSelectedBill] = useState<T_Bill | null>(null);
    const [isMock, setIsMock] = useState(false);

    const dispatch = useDispatch();

    // Проверяем наличие session_id при загрузке приложения
    useEffect(() => {
        const sessionIdCookie = document.cookie
            .split("; ")
            .find((row) => row.startsWith("session_id="));

        if (sessionIdCookie) {
            const sessionId = sessionIdCookie.split("=")[1];
            dispatch(setSessionId(sessionId)); // Обновляем Redux-состояние
        } else {
            dispatch(setSessionId(null)); // Если session_id нет, сбрасываем состояние
        }
    }, [dispatch]);


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
                        <Route path="/operats/:id" element={<OperatsPage />} />
                        <Route path="/my_operats" element={<MyOperatsPage />} />
                    </Routes>
                </Row>
            </Container>
        </div>
    );
}

export default App;