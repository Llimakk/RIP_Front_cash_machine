import {Container, Row,Col} from "reactstrap";
import './HomePage.css'; 

const HomePage = () => {
	return (
		<Container className="homepage-container">
			<Row className="text-center">
				<Col>
					<h1 className="homepage-title">Сбер-банк</h1>
					<p className="homepage-description">
						Добро пожаловать! Здесь вы можете снять наличные и узнать подробную информацию о купюрах.
					</p>
				</Col>
			</Row>
		</Container>
	)
}

export default HomePage