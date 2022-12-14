import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../Navbar/Navbar';
import NewPostForm from './NewPostForm';
import HashtagsBox from './HashtagsBox';
import UserContext from '../../../context/UserContext';
import Posts from './posts/Posts';

export default function Timeline() {
  const navigate = useNavigate();
  const { token } = useContext(UserContext);
  const { image } = useContext(UserContext);
  const { userId } = useContext(UserContext);
  const [activeMenu, setActiveMenu] = useState(false);
  const [renderUserList, setRenderUserList] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, []); // eslint-disable-line

  return (
    <>
      <Navbar
        token={token}
        image={image}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        renderUserList={renderUserList}
        setRenderUserList={setRenderUserList}
      />
      <TimelineContainer
        onClick={() => {
          if (activeMenu) {
            setActiveMenu(false);
          }
          if (renderUserList) {
            setRenderUserList(false);
          }
        }}
      >
        <Feed>
          <FeedTitle>timeline</FeedTitle>
          <NewPostForm image={image} token={token} />
          <Posts token={token} userId={userId} />
        </Feed>
        <HashtagsBox />
      </TimelineContainer>
    </>
  );
}

const TimelineContainer = styled.div`
  margin-top: 72px;
  width: 100%;
  min-width: 1000px;
  background-color: #333333;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  @media (max-width: 900px) {
    width: 81.5%;
    border-radius: 0px;
}
`;

const Feed = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
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
  margin-bottom: 24px;

  @media (max-width: 900px) {
    margin-left: 20px;
    margin-bottom: 30px;
    font-size: 32px;
  }
`;
