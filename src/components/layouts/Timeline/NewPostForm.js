import { useState, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ProfilePicture from '../../shared/ProfilePicture';
import UserContext from '../../../context/UserContext';

export default function NewPostForm({ image, token }) {
  const [url, setUrl] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const { updateListPosts, setUpdateListPosts } = useContext(UserContext);

  async function publishPost(e) {
    e.preventDefault();
    setLoading(true);

    const API_URL = process.env.REACT_APP_API_URL;
    const config = {
      headers: {
        Authorization: `Bearer ${token || ''}`,
      },
    };
    const body = content ? { url, content } : { url };

    try {
      await axios.post(`${API_URL}/posts`, body, config);

      setUrl('');
      setContent('');
      setUpdateListPosts(updateListPosts + 1);
      setLoading(false);
    } catch (error) {
      console.log(error);
      alert('Houve um erro ao publicar seu link!');
      setLoading(false);
    }
  }

  return (
    <NewPostContainer>
      <PostProfilePicture src={image} alt="profile" />
      <PostForm onSubmit={(e) => publishPost(e)}>
        <h1>What are you going to share today?</h1>
        <Input
          placeholder="https:// ..."
          type="text"
          name="url"
          required
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={loading}
        />
        <TallInput
          placeholder="Awesome article about #javascript"
          type="text"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={loading}
        />
        <Button disabled={loading}>
          {loading ? 'Publishing...' : 'Publish'}
        </Button>
      </PostForm>
    </NewPostContainer>
  );
}
const NewPostContainer = styled.div`
  width: 100%;
  height: 210px;
  padding: 18px 18px 18px 18px;
  background-color: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  display: flex;
  z-index: 0;

  @media (max-width: 900px) {
    border-radius: 0px;
    height: 190px;
  }
`;

const PostProfilePicture = styled(ProfilePicture)`
  @media (max-width: 900px) {
    display: none;
  }
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

  @media (max-width: 900px) {
    padding-left: 0px;
    padding-top: 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
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
  background: ${(props) => (props.disabled ? '#12A5FF' : '#1877F2')};
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

  @media (max-width: 900px) {
    height: 26px;
    margin-bottom: -8px;
  }
`;
