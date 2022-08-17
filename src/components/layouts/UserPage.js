import { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ProfilePicture from '../shared/ProfilePicture';
import styled from 'styled-components';
import Navbar from './Navbar/Navbar';
import UserContext from '../../context/UserContext';
import Posts from './Timeline/posts/Posts';
import HashtagsBox from './Timeline/HashtagsBox';
import { deleteLocal } from '../../utils/localStorageFunctions';
import axios from 'axios';

export default function UserPage() {
  const navigate = useNavigate();
  const { state: userInfo } = useLocation();
  const { token } = useContext(UserContext);
  const { image } = useContext(UserContext);
  const { userId } = useContext(UserContext);
  const [activeMenu, setActiveMenu] = useState(false);
  const [renderUserList, setRenderUserList] = useState(false);
  const [loading, setLoading] = useState(false);
  const [follows, setFollows] = useState(userInfo.isFollower);

  // useEffect(() => {
  //   if (!token) {
  //     deleteLocal('linkrUserdata');
  //     navigate('/');
  //   }
  // }, []); // eslint-disable-line

  useEffect(() => {
    setFollows(userInfo.isFollower);
  }, [userInfo.isFollower]);

  async function handleFollowRequest() {
    setLoading(true);

    const API_URL = process.env.REACT_APP_API_URL;
    const config = {
      headers: {
        Authorization: `Bearer ${token || ''} `,
      },
    };

    try {
      if (follows) {
        await axios.post(
          `${API_URL}/users/unfollow/${userInfo.id}`,
          null,
          config
        );
        setFollows(false);
      } else {
        await axios.post(
          `${API_URL}/users/follow/${userInfo.id}`,
          null,
          config
        );
        setFollows(true);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert('Erro!');
    }
  }

  function renderFollowButton() {
    if (userId === userInfo.id) {
      return null;
    }
    return (
      <FollowButton
        follower={follows}
        disabled={loading}
        onClick={handleFollowRequest}
      >
        {follows ? 'Unfollow' : 'Follow'}
      </FollowButton>
    );
  }

  return (
    <>
      <Navbar
        token={token}
        image={image}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        renderUserList={renderUserList}
        setRenderUserList={setRenderUserList}
        follows={follows}
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
        {renderFollowButton()}
      </TimelineContainer>
    </>
  );
}

const FollowButton = styled.button`
  width: 110px;
  height: 30px;
  font-family: 'Lato';
  font-size: 14px;
  font-weight: 700;
  border-radius: 5px;
  background-color: ${(props) => (props.follower ? 'white' : '#1877f2')};
  color: ${(props) => (props.follower ? '#1877f2' : 'white')};
  border: none;
  position: relative;
  top: 100px;
  right: 150px;

  &&:hover {
    cursor: pointer;
  }
`;

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
