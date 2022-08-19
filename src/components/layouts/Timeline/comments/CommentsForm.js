import { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import styled from 'styled-components';
import UserContext from '../../../../context/UserContext';

import { HiRefresh } from 'react-icons/hi';
import { IoPaperPlaneOutline } from 'react-icons/io5';

export default function CommentsForm({ image, idPost }) {
  const { token, setUpdateListPosts, updateListPosts } =
    useContext(UserContext);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  function publishComment(e) {
    e.preventDefault();
    setLoading(true);
    const API_URL = process.env.REACT_APP_API_URL;

    const body = {
      content: comment,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${token || ''}`,
      },
    };
    const promise = axios.post(`${API_URL}/comments/${idPost}`, body, config);
    promise.then((res) => {
      setComment('');
      setLoading(false);
      setUpdateListPosts(updateListPosts + 1);
    });
    promise.catch((err) => {
      setComment('');
      setLoading(false);
    });
  }

  return (
    <FormContainer>
      <UserImage image={image}></UserImage>
      <Form onSubmit={(e) => publishComment(e)}>
        <input
          type="text"
          placeholder="Write a comment..."
          required
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          disabled={loading}
        />
        <Icon disabled={loading}>
          <IoPaperPlaneOutline size={20} />
        </Icon>
      </Form>
    </FormContainer>
  );
}

const FormContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 20px 15px;
  font-family: 'Lato';
  position: relative;
`;

const UserImage = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const Form = styled.form`
  width: 100%;
  padding-left: 20px;

  input {
    width: 100%;
    height: 40px;
    border: none;
    border-radius: 8px;
    background-color: #252525;
    color: #acacac;
    text-indent: 10px;
  }

  input::placeholder {
    color: #575757;
    font-size: 14px;
    font-weight: 400;
    font-style: italic;
    padding-left: 20px;
  }

  button svg::hover {
    scale: 1.1;
  }
`;

const Icon = styled.button`
  position: absolute;
  right: 25px;
  top: 30px;
  color: #f3f3f3;
  cursor: pointer;
  background: none;
  border: none;
`;
