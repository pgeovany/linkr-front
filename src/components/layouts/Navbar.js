import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BsChevronUp, BsChevronDown, BsSearch } from 'react-icons/bs';
import styled from 'styled-components';
import ProfilePicture from '../shared/ProfilePicture';
import { deleteLocal } from '../../utils/localStorageFunctions';
import { DebounceInput } from 'react-debounce-input';
import { useState, useEffect } from 'react';

export default function Navbar({
  token,
  image,
  activeMenu,
  setActiveMenu,
  renderUserList,
  setRenderUserList,
}) {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [userList, setUserList] = useState([]);

  function logout() {
    if (!window.confirm('Você realmente deseja sair do aplicativo?')) return;
    deleteLocal('linkrUserdata');
    navigate('/');
  }

  function handleMenusRendering() {
    if (activeMenu) {
      setActiveMenu(false);
    }
    if (renderUserList) {
      setRenderUserList(false);
    }
  }

  function genLogoutMenu() {
    if (activeMenu) {
      return (
        <>
          <UpArrow />
          <DropDownMenu onClick={() => logout()}>
            <h1>Logout</h1>
          </DropDownMenu>
        </>
      );
    }
    return <DownArrow />;
  }

  function genSearchMenu() {
    if (renderUserList) {
      return (
        <DropDownUserList>
          {userList.map((user, index) => (
            <User
              key={index}
              image={user.foto}
              name={user.nome}
              id={user.id}
              navigate={navigate}
            />
          ))}
        </DropDownUserList>
      );
    }
    return null;
  }

  useEffect(() => {
    const API_URL = process.env.REACT_APP_API_URL;

    const name = search;

    const config = {
      headers: {
        Authorization: `Bearer ${token || ''}`,
      },
      params: {
        name,
      },
    };

    async function fetchData() {
      try {
        const { data } = await axios.get(`${API_URL}/users`, config);
        setUserList(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [search]); // eslint-disable-line

  return (
    <>
      <Main
        onClick={() => {
          handleMenusRendering();
        }}
      >
        <Logo>linkr</Logo>
        <InputContainer>
          <Input
            placeholder="Search for people"
            minLength={3}
            debounceTimeout={300}
            onChange={(e) => {
              setSearch(e.target.value);
              console.log(search);
            }}
            onClick={() => setRenderUserList(true)}
          />
          <SearchIcon />
        </InputContainer>
        <div onClick={() => setActiveMenu(!activeMenu)}>
          {genLogoutMenu()}
          <ProfilePicture src={image ? image : ''} alt="profile" />
        </div>
      </Main>
      {genSearchMenu()}
    </>
  );
}

function User({ image, name, id, navigate }) {
  return (
    <UserMenuContainer
      onClick={() => navigate(`/user/${id}`, { state: { id, name } })}
    >
      <SmallProfilePicture src={image} alt="profile" />
      <h1>{name}</h1>
    </UserMenuContainer>
  );
}

const DropDownUserList = styled.div`
  width: 550px;
  height: auto;
  padding: 14px 18px 14px 18px;
  background-color: #e7e7e7;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  position: fixed;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  top: 48px;
  right: 394px;
`;

const UserMenuContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  z-index: 1;
  h1 {
    font-family: 'Lato';
    font-size: 18px;
    color: #515151;
    padding-left: 12px;
  }

  &&:hover {
    cursor: pointer;
  }
`;

const SmallProfilePicture = styled(ProfilePicture)`
  height: 38px;
  width: 38px;
`;

const Main = styled.div`
  height: 72px;
  width: 100%;
  padding: 0 20px 0 20px;
  background-color: #151515;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1;

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

const InputContainer = styled.div`
  display: flex;
  position: relative;
`;

const SearchIcon = styled(BsSearch)`
  color: #c6c6c6;
  font-size: 20px;
  position: absolute;
  right: 2%;

  :hover {
    cursor: pointer;
  }
`;

const Input = styled(DebounceInput)`
  height: 35px;
  width: 550px;
  border-radius: 8px;
  border: none;
  padding-left: 10px;
  font-family: 'Lato';
  font-size: 18px;

  &&:focus {
    outline: none;
  }

  ::placeholder {
    color: #c6c6c6;
  }
`;
