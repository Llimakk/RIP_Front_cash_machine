import { Container, Row, Col } from "reactstrap";
import './index.css'; 


const HomePage = () => {
    return (
        <Container className="homepage-container-2">
            <Row className="text-center">
                <Col>
                    <h1 className="homepage-title-2">Сбер-банк</h1>
                    <p className="homepage-description-2">
                        Добро пожаловать! Здесь вы можете снять наличные и узнать подробную информацию о купюрах.
                    </p>
                </Col>
            </Row>
        </Container>
    );
};

export default HomePage 