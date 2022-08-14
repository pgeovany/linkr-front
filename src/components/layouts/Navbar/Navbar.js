import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BsChevronUp, BsChevronDown, BsSearch } from 'react-icons/bs';
import styled from 'styled-components';
import ProfilePicture from '../../shared/ProfilePicture';
import { deleteLocal } from '../../../utils/localStorageFunctions';
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

  function genUserMenu() {
    if (activeMenu) {
      return (
        <>
          <UpArrow />
          <DropdownUserMenu onClick={() => logout()}>
            <h1>Logout</h1>
          </DropdownUserMenu>
        </>
      );
    }
    return <DownArrow />;
  }

  function genSearchMenu() {
    if (renderUserList) {
      return (
        <DropdownSearchMenu>
          {userList.map((user, index) => (
            <SearchResult
              key={index}
              image={user.image}
              name={user.name}
              id={user.id}
              navigate={navigate}
            />
          ))}
        </DropdownSearchMenu>
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
        <Logo onClick={() => navigate('/timeline')}>linkr</Logo>
        <SearchBarContainer>
          <Input
            placeholder="Search for people"
            minLength={3}
            debounceTimeout={300}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            onClick={() => setRenderUserList(true)}
          />
          <SearchIcon />
          {genSearchMenu()}
        </SearchBarContainer>
        <UserMenu onClick={() => setActiveMenu(!activeMenu)}>
          {genUserMenu()}
          <ProfilePicture src={image ? image : ''} alt="profile" />
        </UserMenu>
      </Main>
      <MobileSearchBar>
        <Input
          placeholder="Search for people and friends"
          minLength={3}
          debounceTimeout={300}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          onClick={() => setRenderUserList(true)}
        />
        <SearchIcon />
        {genSearchMenu()}
      </MobileSearchBar>
    </>
  );
}

function SearchResult({ image, name, id, navigate }) {
  return (
    <SearchResultContainer
      onClick={() => navigate(`/user/${id}`, { state: { id, name, image } })}
    >
      <SmallProfilePicture src={image} alt="profile" />
      <h1>{name}</h1>
    </SearchResultContainer>
  );
}

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
  z-index: 3;
`;

const Logo = styled.div`
  font-family: 'Passion One';
  font-weight: bold;
  font-size: 50px;
  color: white;

  &&:hover {
    cursor: pointer;
  }
`;

const UserMenu = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const UpArrow = styled(BsChevronUp)`
  color: white;
  font-size: 36px;
  padding-right: 10px;

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

const DropdownUserMenu = styled.div`
  height: 50px;
  width: 130px;
  background-color: #151515;
  border-bottom-left-radius: 20px;

  position: absolute;
  top: 60px;
  left: -20px;

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

const SearchBarContainer = styled.div`
  display: flex;
  position: relative;
  align-items: center;

  @media (max-width: 900px) {
    display: none;
  }
`;

const MobileSearchBar = styled(SearchBarContainer)`
  width: 90%;
  margin-right: 5%;
  margin-left: 5%;
  margin-top: 92px;
  margin-bottom: -50px;
  z-index: 2;

  @media (min-width: 900px) {
    display: none;
  }
  @media (max-width: 900px) {
    display: inherit;
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
  z-index: 2;

  &&:focus {
    outline: none;
  }

  ::placeholder {
    color: #c6c6c6;
  }

  @media (max-width: 900px) {
    width: 100%;
  }
`;

const DropdownSearchMenu = styled.div`
  width: 100%;
  height: auto;
  padding: 20px 18px 10px 18px;
  background-color: #e7e7e7;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;

  position: absolute;
  top: 28px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  @media (max-width: 900px) {
    z-index: -1;
  }
`;

const SearchResultContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

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

const SearchIcon = styled(BsSearch)`
  color: #c6c6c6;
  font-size: 20px;
  position: absolute;
  right: 2%;
  z-index: 2;

  :hover {
    cursor: pointer;
  }

  @media (max-width: 900px) {
    top: 20%;
    right: 4%;
  }
`;

const SmallProfilePicture = styled(ProfilePicture)`
  height: 38px;
  width: 38px;
`;
