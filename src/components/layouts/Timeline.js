import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from './Navbar';
import UserContext from '../../context/UserContext';
import ProfilePicture from '../shared/ProfilePicture';

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

  function newPost(e) {
    e.preventDefault();
    alert('Oi');
  }

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
          <NewPostContainer>
            <ProfilePicture src={image} alt="profile" />
            <PostForm onSubmit={(e) => newPost(e)}>
              <h1>What are you going to share today?</h1>
              <Input placeholder="https:// ..." />
              <TallInput placeholder="Awesome article about #javascript" />
              <Button>Publish</Button>
            </PostForm>
          </NewPostContainer>
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

const NewPostContainer = styled.div`
  width: 100%;
  height: 210px;
  padding: 18px 18px 18px 18px;
  background-color: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  display: flex;
`;

const PostForm = styled.form`
  padding-left: 20px;
  padding-top: 8px;
  width: 100%;
  height: 100%;
  position: relative;

  h1 {
    font-family: 'Lato';
    color: #707070;
    font-size: 20px;
    font-weight: 300;
    margin-bottom: 10px;
  }
`;

const Input = styled.input`
  background-color: #efefef;
  color: #949494;
  border-radius: 5px;
  height: 30px;
  width: 100%;
  border: none;
  padding-left: 12px;
  font-size: 14px;
  color: black;
  margin-bottom: 8px;

  ::placeholder {
    font-size: 14px;
    color: #949494;
  }
`;

const TallInput = styled(Input)`
  height: 60px;
  text-align: top;
  padding-bottom: 30px;
`;

const Button = styled.button`
  font-family: 'Lato';
  height: 30px;
  width: 112px;
  background: #1877f2;
  border-radius: 5px;
  border: none;

  position: absolute;
  right: 0;
  bottom: 0;

  font-weight: 700;
  font-size: 14px;
  color: #ffffff;

  &&:hover {
    cursor: pointer;
  }
`;
