import {Collapse, Container, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from "reactstrap";
import {NavLink as RRNavLink} from "react-router-dom";
import {useState} from "react";
import "./styles.css"
import logo from "../../assets/logo.png";

const Header = () => {

	const [collapsed, setCollapsed] = useState(true);

	const toggleNavbar = () => setCollapsed(!collapsed);

	const hideMenu = () => setCollapsed(true)

    return (
		<header>
			<Navbar collapseOnSelect className="p-0" expand="lg">
				<Container className="p-0">
					<Navbar collapseOnSelect expand="lg" dark>
						<NavLink tag={RRNavLink} to="/" className="header-logo-container">
                            <img src={logo} alt="Сбер-банк" className="header-logo" />
                        </NavLink>
						<NavbarToggler aria-controls="responsive-navbar-nav" onClick={toggleNavbar} />
						<Collapse id="responsive-navbar-nav" navbar isOpen={!collapsed}>
							<Nav className="mr-auto fs-5 d-flex flex-grow-1 justify-content-end align-items-center" navbar>
								<NavItem>
									<NavLink tag={RRNavLink} onClick={hideMenu} to="/bills">
										Купюры
									</NavLink>
								</NavItem>
							</Nav>
						</Collapse>
					</Navbar>
				</Container>
			</Navbar>
		</header>
    );
};

export default Header