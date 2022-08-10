import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { BsChevronUp, BsChevronDown } from 'react-icons/bs';
import styled from 'styled-components';
import ProfilePicture from '../shared/ProfilePicture';
import { deleteLocal } from '../../utils/localStorageFunctions';

export default function Navbar() {
  const location = useLocation().pathname;
  const navigate = useNavigate();

  const render =
    location !== '/signin' && location !== '/signup' ? true : false;
  const [activeMenu, setActiveMenu] = useState(false);

  function logout() {
    if (!window.confirm('Você realmente deseja sair do aplicativo?')) return;
    deleteLocal('user');
    navigate('/signin');
  }

  function genNavbar() {
    if (render) {
      return (
        <Main>
          <Logo>linkr</Logo>
          <div onClick={() => setActiveMenu(!activeMenu)}>
            {activeMenu ? (
              <>
                <UpArrow />
                <DropDownMenu onClick={() => logout()}>
                  <h1>Logout</h1>
                </DropDownMenu>
              </>
            ) : (
              <DownArrow />
            )}
            <ProfilePicture
              src="https://rollingstone.uol.com.br/media/uploads/killbill.jpg"
              alt="user"
            />
          </div>
        </Main>
      );
    }
    return null;
  }
  return <>{genNavbar()}</>;
}

const Main = styled.div`
  height: 72px;
  width: 100%;
  /* padding: 0 20px 0 20px; */
  background-color: #151515;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    display: flex;
    align-items: center;
    position: relative;
    padding-right: 20px;
  }
`;

const Logo = styled.div`
  font-size: 50px;
  color: white;
  padding-left: 20px;
`;

const UpArrow = styled(BsChevronUp)`
  color: white;
  font-size: 30px;
  padding-right: 10px;
  position: absolute;
  right: 70px;

  &&:hover {
    cursor: pointer;
  }
`;

const DownArrow = styled(BsChevronDown)`
  color: white;
  font-size: 30px;
  padding-right: 10px;

  &&:hover {
    cursor: pointer;
  }
`;

const DropDownMenu = styled.div`
  height: 50px;
  width: 120px;
  background-color: #151515;
  position: absolute;
  top: 60px;
  left: 70px;
  border-bottom-left-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  h1 {
    color: white;
    font-weight: bold;
    font-size: 18px;

    :hover {
      cursor: pointer;
    }
  }
`;
