import {Col, Collapse, Container, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from "reactstrap";
import {Link, NavLink as RRNavLink, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {useState} from "react";
import {handleLogout} from "store/slices/userSlice.ts";
import logo from "../../assets/logo.png";
import profile from "../../assets/profile.png"

const Header = () => {

    const dispatch = useAppDispatch()

    const {is_authenticated, is_superuser} = useAppSelector((state) => state.user)

    const username = useAppSelector((state) => state.user.username)

    const navigate = useNavigate()

    const logout = async (e) => {
        e.preventDefault()
        await dispatch(handleLogout())
        navigate("/")
    }


    const [collapsed, setCollapsed] = useState(true);

    const toggleNavbar = () => setCollapsed(!collapsed);

    const hideMenu = () => setCollapsed(true)

    return (
        <header>
            <Navbar className="p-3" expand="lg">
                <Container className="upper">
                    <Navbar collapseOnSelect expand="lg" dark>
                        <Col className="d-flex align-items-center">
                            <NavbarBrand>
                                <NavLink tag={RRNavLink} to="/" className="header-logo-container">
                                    <img src={logo} alt="Сбер-банк" className="header-logo" />
                                </NavLink>
                            </NavbarBrand>
                        </Col>
                        <NavbarToggler aria-controls="responsive-navbar-nav" onClick={toggleNavbar} />
                        <Collapse id="responsive-navbar-nav" navbar isOpen={!collapsed}>
                            <Nav className="mr-auto fs-5 d-flex flex-grow-1 justify-content-end align-items-center" onClick={hideMenu} navbar>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to={"/bills/"}>
                                        Купюры
                                    </NavLink>
                                </NavItem>
                                {is_superuser &&
                                    <NavItem>
                                        <NavLink tag={RRNavLink} to={"/bills-table/"}>
                                            Редактирование купюр
                                        </NavLink>
                                    </NavItem>
                                }
                                {is_authenticated ?
                                    <>
                                        <NavItem>
                                            <NavLink tag={RRNavLink} to="/operations/">
                                                Мои операции
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink tag={RRNavLink} to="/profile/" className="profile-link">
                                                {username}
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink style={{cursor: "pointer"}} onClick={logout}>
                                                Выйти
                                            </NavLink>
                                        </NavItem>
                                    </>
                                    :
                                    <>
                                        <Link to="/login" className="auth-link">
                                            Вход / Регистрация
                                        </Link>
                                    </>
                                }
                            </Nav>
                        </Collapse>
                    </Navbar>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header