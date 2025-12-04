import { Link } from "react-router-dom";
import Logo from "../../assets/LogoImg.png";
import styled from "styled-components";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  /* background-color: #f0f0f0; */
  a {
    padding: 5px;
  }
`;

const LogoImg = styled.img`
  width: 180px;
  background-size: contain;
`;

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  padding-left: 30px;
  white-space: nowrap;
  ul {
    display: flex;
    gap: 20px;
  }
  a {
    font-size: 20px;
  }
`;

const LoginContainer = styled.div`
  padding: 5px;
`;

const Header = () => {
  return (
    <HeaderContainer className="Header">
      <div className="Logo">
        <Link to="/">
          <LogoImg src={Logo} alt="Logo" />
        </Link>
      </div>
      <NavContainer>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/reviews">Reviews</Link>
          </li>
        </ul>
        <LoginContainer>
          <Link to="/login">Login</Link>
        </LoginContainer>
      </NavContainer>
    </HeaderContainer>
  );
};

export default Header;
