import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { BsChevronUp, BsChevronDown } from 'react-icons/bs';
import ProfilePicture from '../shared/ProfilePicture';
import { useState } from 'react';

export default function Navbar() {
  const location = useLocation().pathname;
  const render =
    location !== '/signin' && location !== '/signup' ? true : false;
  const [activeMenu, setActiveMenu] = useState(true);

  function logout() {
    alert('To-do');
    return;
  }

  function genNavbar() {
    if (render) {
      return (
        <Main>
          <Logo>linkr</Logo>
          <div>
            {activeMenu ? (
              <>
                <UpArrow onClick={() => setActiveMenu(!activeMenu)} />
                <DropDownMenu onClick={() => logout()}>Logout</DropDownMenu>
              </>
            ) : (
              <DownArrow onClick={() => setActiveMenu(!activeMenu)} />
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
  font-size: 50px;
  color: white;
`;

const UpArrow = styled(BsChevronUp)`
  color: white;
  font-size: 30px;
  padding-right: 10px;

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
  height: 30px;
  width: 60px;
  background-color: white;
`;
