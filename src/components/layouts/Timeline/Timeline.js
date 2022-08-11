import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../Navbar';
import NewPostForm from './NewPostForm';
import UserContext from '../../../context/UserContext';

export default function Timeline() {
  const navigate = useNavigate();
  // const { token } = useContext(UserContext);
  // const { image } = useContext(UserContext);

  const [activeMenu, setActiveMenu] = useState(false);
  const token = 1;
  const image = 'https://rollingstone.uol.com.br/media/uploads/killbill.jpg';

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
  height: 100vh;
  display: flex;
  justify-content: center;
`;

const Feed = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 80px;
  width: 48%;
`;

const FeedTitle = styled.h1`
  font-family: 'Oswald';
  font-size: 44px;
  font-weight: 700;
  color: white;
  margin-bottom: 44px;
`;
