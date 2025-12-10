import { Link } from "react-router-dom";
import Logo from "../../assets/LogoImg.png";
import styled from "styled-components";
import { useUserStore } from "../../store/userStore";

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
  display: flex;
  align-items: center;
  gap: 15px;
`;

const UserInfo = styled.span`
  font-size: 16px;
  color: #333;
  font-weight: 500;
  a {
    font-size: 16px;
    color: #333;
    font-weight: 500;
  }
`;

const LogoutButton = styled.button`
  font-size: 16px;
  color: #333;
  font-weight: 500;
  border: none;
  cursor: pointer;

  /* padding: 8px 16px;
  background: #667eea;
  color: white;
  border-radius: 6px;
  font-size: 14px;
  transition: background 0.3s;

  &:hover {
    background: #5568d3;
  } */
`;

const Header = () => {
  const { isLoggedIn, user, logout } = useUserStore();

  return (
    <HeaderContainer className="Header">
      <div className="Logo">
        <Link to="/">
          <LogoImg src={Logo} alt="Logo" />
        </Link>
      </div>
      <NavContainer>
        <ul>
          {/* <li>
            <Link to="/">Home</Link>
          </li> */}
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/reviews">Reviews</Link>
          </li>
        </ul>
        <LoginContainer>
          {isLoggedIn ? (
            <>
              <UserInfo>
                <span style={{ fontWeight: "bold" }}>{user?.nickname}</span>님
              </UserInfo>
              <UserInfo>
                <Link to={`/user/${user?.id}`}>My page</Link>
              </UserInfo>
              <LogoutButton onClick={logout}>로그아웃</LogoutButton>
            </>
          ) : (
            <Link to="/login">로그인</Link>
          )}
        </LoginContainer>
      </NavContainer>
    </HeaderContainer>
  );
};

export default Header;
