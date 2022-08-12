import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../Navbar';
import NewPostForm from './NewPostForm';
import UserContext from '../../../context/UserContext';
import Posts from './posts/Posts';

export default function Timeline() {
  const navigate = useNavigate();
  const { token } = useContext(UserContext);
  const { image } = useContext(UserContext);
  const [activeMenu, setActiveMenu] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, []); // eslint-disable-line

  return (
    <>
      <Navbar
        image={image}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />
      <TimelineContainer
        onClick={() => {
          if (activeMenu) {
            setActiveMenu(false);
          }
        }}
      >
        <Feed>
          <FeedTitle>timeline</FeedTitle>
          <NewPostForm image={image} token={token} />
          <Posts token={token} />
        </Feed>
      </TimelineContainer>
    </>
  );
}

const TimelineContainer = styled.div`
  margin-top: 72px;
  width: 100%;
  background-color: #333333;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

const Feed = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 80px;
  width: 48%;
  @media (max-width: 900px) {
    width: 100%;
    margin-top: 34px;
  }
`;

const FeedTitle = styled.h1`
  font-family: 'Oswald';
  font-size: 44px;
  font-weight: 700;
  color: white;
  margin-bottom: 44px;

  @media (max-width: 900px) {
    margin-left: 20px;
    margin-bottom: 30px;
    font-size: 32px;
  }
`;
