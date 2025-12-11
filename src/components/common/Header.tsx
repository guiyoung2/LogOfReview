import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/LogoImg.png";
import styled from "styled-components";
import { useUserStore } from "../../store/userStore";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  position: relative;
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

  @media (max-width: 768px) {
    padding-left: 0;
  }

  ul {
    display: flex;
    gap: 20px;

    @media (max-width: 768px) {
      display: none;
    }
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

  @media (max-width: 768px) {
    display: none;
  }
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
  background: none;

  a {
    font-size: 16px;
    color: #333;
    font-weight: 500;
  }
`;

// 햄버거 메뉴 버튼 (모바일)
const HamburgerButton = styled.button<{ $isOpen: boolean }>`
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  width: 30px;
  height: 30px;

  @media (max-width: 768px) {
    display: flex;
  }

  span {
    width: 25px;
    height: 3px;
    background: #333;
    border-radius: 3px;
    transition: all 0.3s ease;
    position: relative;
  }

  /* X 모양 애니메이션 */
  ${(props) =>
    props.$isOpen
      ? `
    span:nth-child(1) {
      transform: rotate(45deg) translate(6px, 6px);
    }
    span:nth-child(2) {
      opacity: 0;
    }
    span:nth-child(3) {
      transform: rotate(-45deg) translate(6px, -6px);
    }
  `
      : ""}
`;

// 모바일 메뉴 (햄버거 메뉴)
const MobileMenu = styled.div<{ $isOpen: boolean }>`
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 20px;
  z-index: 1000;
  transform: ${(props) =>
    props.$isOpen ? "translateY(0)" : "translateY(-100%)"};
  opacity: ${(props) => (props.$isOpen ? 1 : 0)};
  visibility: ${(props) => (props.$isOpen ? "visible" : "hidden")};
  transition: all 0.3s ease;
  min-height: 200px;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 768px) {
    display: flex;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  li {
    a,
    button {
      display: block;
      width: 100%;
      padding: 12px;
      font-size: 18px;
      color: #333;
      text-decoration: none;
      border-radius: 8px;
      transition: background 0.2s;
      text-align: left;
      border: none;
      background: none;
      cursor: pointer;
      font-family: inherit;

      &:hover {
        background: #f0f0f0;
      }
    }
  }
`;

// 모바일 메뉴 하단 사용자 정보
const MobileMenuFooter = styled.div`
  margin-top: auto;
  padding-top: 20px;
  border-top: 1px solid #e0e0e0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const MobileUserNickname = styled.div`
  font-size: 14px;
  color: #666;
  font-weight: 500;
`;

const Header = () => {
  const { isLoggedIn, user, logout } = useUserStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <HeaderContainer className="Header">
      <div className="Logo">
        <Link to="/" onClick={closeMobileMenu}>
          <LogoImg src={Logo} alt="Logo" />
        </Link>
      </div>
      <NavContainer>
        {/* 데스크톱 메뉴 */}
        <ul>
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

      {/* 햄버거 메뉴 버튼 (모바일) */}
      <HamburgerButton
        onClick={toggleMobileMenu}
        aria-label="메뉴"
        $isOpen={isMobileMenuOpen}
      >
        <span></span>
        <span></span>
        <span></span>
      </HamburgerButton>

      {/* 모바일 메뉴 */}
      <MobileMenu $isOpen={isMobileMenuOpen}>
        <ul>
          <li>
            <Link to="/about" onClick={closeMobileMenu}>
              About
            </Link>
          </li>
          <li>
            <Link to="/reviews" onClick={closeMobileMenu}>
              Reviews
            </Link>
          </li>
          {isLoggedIn ? (
            <>
              <li>
                <Link to={`/user/${user?.id}`} onClick={closeMobileMenu}>
                  My page
                </Link>
              </li>
              <li>
                <LogoutButton
                  onClick={() => {
                    logout();
                    closeMobileMenu();
                  }}
                >
                  로그아웃
                </LogoutButton>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login" onClick={closeMobileMenu}>
                로그인
              </Link>
            </li>
          )}
        </ul>
        {isLoggedIn && user && (
          <MobileMenuFooter>
            <MobileUserNickname>
              <span style={{ fontWeight: "bold" }}>{user.nickname}</span>님
            </MobileUserNickname>
          </MobileMenuFooter>
        )}
      </MobileMenu>
    </HeaderContainer>
  );
};

export default Header;
