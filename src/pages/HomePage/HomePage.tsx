import {Container, Row} from "reactstrap";
import './HomePage.css'

const HomePage = () => {
	return (
		<Container className="homepage-container">
			<Row className="text-center">
				<h1 className="mb-3">Сбер-банк</h1>
				<p className="fs-5">Добро пожаловать! Здесь вы можете снять наличные и узнать подробную информацию о купюрах.</p>
			</Row>
		</Container>
	)
}

export default HomePage