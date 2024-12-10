import { Container, Row, Col } from "reactstrap";
import './index.css'; 


const HomePage = () => {
	return (
        
		<Container className="homepage-container">
			<Row className="text-center">
				<Col>
					{/* <img 
						src="/images/atm-icon.png" 
						alt="ATM Icon" 
						className="homepage-logo"
					/> */}
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