import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { BsChevronUp, BsChevronDown } from 'react-icons/bs';
import styled from 'styled-components';
import ProfilePicture from '../shared/ProfilePicture';
import { deleteLocal } from '../../utils/localStorageFunctions';
import UserContext from '../../context/UserContext';

export default function Navbar() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState(false);
  const { image } = useContext(UserContext);

  function logout() {
    if (!window.confirm('Você realmente deseja sair do aplicativo?')) return;
    deleteLocal('user');
    navigate('/');
  }

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
        {image !== null ? (
          <ProfilePicture src={image} alt="profile" />
        ) : (
          <ProfilePicture src="" alt="profile" />
        )}
      </div>
    </Main>
  );
}

const Main = styled.div`
  height: 72px;
  width: 100%;
  padding: 0 20px 0 20px;
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
  }
`;

const Logo = styled.div`
  font-family: 'Passion One';
  font-weight: bold;
  font-size: 50px;
  color: white;
`;

const UpArrow = styled(BsChevronUp)`
  color: white;
  font-size: 36px;
  padding-right: 10px;
  position: absolute;
  right: 50px;

  &&:hover {
    cursor: pointer;
  }
`;

const DownArrow = styled(BsChevronDown)`
  color: white;
  font-size: 36px;
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
