import { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ProfilePicture from '../shared/ProfilePicture';
import styled from 'styled-components';
import Navbar from './Navbar/Navbar';
import UserContext from '../../context/UserContext';
import Posts from './Timeline/posts/Posts';
import HashtagsBox from './Timeline/HashtagsBox';

export default function UserPage() {
  const navigate = useNavigate();
  const { state: userInfo } = useLocation();
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
          <Header>
            <ProfilePicture src={userInfo ? userInfo.image : ''} alt="" />
            <FeedTitle>{`${userInfo.name}'s posts`}</FeedTitle>
          </Header>
          <Posts token={token} idUser={userInfo.id} userId={userId} />
        </Feed>
        <HashtagsBox />
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

const Header = styled.div`
  display: flex;
  margin-left: 10px;
`;

const FeedTitle = styled.h1`
  font-family: 'Oswald';
  font-size: 44px;
  font-weight: 700;
  color: white;
  margin-bottom: 44px;
  padding-left: 20px;

  @media (max-width: 900px) {
    margin-top: 10px;
    margin-bottom: 30px;
    font-size: 32px;
  }
`;
